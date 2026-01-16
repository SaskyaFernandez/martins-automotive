"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import AppointmentStepper from "@/components/AppointmentStepper";
import ServiceSelection from "@/components/ServiceSelection";
import CalendarPicker from "@/components/CalendarPicker";
import TimeSlotPicker from "@/components/TimeSlotPicker";
import CustomerForm from "@/components/CustomerForm";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface AppointmentData {
  service: string;
  date: string;
  time: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    chassisNumber: string;
    description: string;
  };
}

export default function RendezVousPage() {
  const router = useRouter();
  const t = useTranslations();
  const locale = useLocale();
  const [currentStep, setCurrentStep] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    service: "",
    date: "",
    time: "",
    customerInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      chassisNumber: "",
      description: "",
    },
  });

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleServiceSelect = (service: string) => {
    setAppointmentData({ ...appointmentData, service });
    handleNextStep();
  };

  const handleDateSelect = (date: string) => {
    setAppointmentData({ ...appointmentData, date });
    handleNextStep();
  };

  const handleDateChange = (date: string) => {
    setAppointmentData({ ...appointmentData, date, time: "" }); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setAppointmentData({ ...appointmentData, time });
    handleNextStep();
  };

  const handleCustomerInfoSubmit = async (
    customerInfo: AppointmentData["customerInfo"]
  ) => {
    setAppointmentData({ ...appointmentData, customerInfo });

    try {
      // Import the API functions dynamically
      const { createAppointment, convertToApiFormat, validateAppointmentData } = await import("@/utils/appointmentApi");

      // Convert the appointment data to API format
      const apiData = convertToApiFormat({
        service: appointmentData.service,
        date: appointmentData.date,
        time: appointmentData.time,
        customerInfo,
        locale, // Add the locale to the API data
      });

      // Validate appointment data
      const validationErrors = validateAppointmentData(apiData);

      if (validationErrors.length > 0) {
        // Redirect to confirmation page with validation error
        const params = new URLSearchParams({
          status: "error",
          error: validationErrors.join(". "),
        });

        router.push(`/rendez-vous/confirmation?${params.toString()}`);
        return;
      }

      // Send to backend
      const response = await createAppointment(apiData);

      // Redirect to confirmation page with success status
      const params = new URLSearchParams({
        status: "success",
        service: appointmentData.service,
        date: appointmentData.date,
        time: appointmentData.time,
        appointmentNumber: response.appointmentNumber || "",
      });

      router.push(`/rendez-vous/confirmation?${params.toString()}`);
    } catch (error) {
      console.error("Error creating appointment:", error);

      // Redirect to confirmation page with error status
      const params = new URLSearchParams({
        status: "error",
        error: error instanceof Error ? error.message : "Une erreur est survenue. Veuillez réessayer.",
      });

      router.push(`/rendez-vous/confirmation?${params.toString()}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white inset-x-0 top-0 px-4 sm:px-6 py-4 md:px-20">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src="/customcolor_logo_transparent_background.png"
              alt="Martins Auto"
              className="h-16 sm:h-20 w-auto"
              width={500}
              height={500}
            />
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex gap-6 items-center text-white text-sm lg:text-base">
            <a
              href="./#about"
              className="hover:underline hover:text-yellow-400 transition"
            >
              {t('nav.about')}
            </a>
            <a
              href="./#services"
              className="hover:underline hover:text-yellow-400 transition"
            >
              {t('nav.services')}
            </a>
            <a
              href="./#contact"
              className="hover:underline hover:text-yellow-400 transition"
            >
              {t('nav.contact')}
            </a>
            <LanguageSwitcher />
          </div>

          {/* Bouton Hamburger Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 z-50"
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-transform ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-opacity ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-transform ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Menu Mobile */}
        {/* Menu Mobile */}
        <div
          className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
            mobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Overlay qui fade in / out */}
          <button
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Fermer le menu"
          />

          {/* Drawer qui slide depuis la droite */}
          <div
            className={`absolute right-0 top-0 h-full w-3/4 max-w-xs bg-black/95 border-l border-yellow-400 px-6 py-10 flex flex-col gap-6 transform transition-transform duration-300 ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
              Navigation
            </p>

            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold uppercase tracking-wide hover:text-yellow-400 transition"
            >
              {t('nav.about')}
            </a>

            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold uppercase tracking-wide hover:text-yellow-400 transition"
            >
              {t('nav.services')}
            </a>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold uppercase tracking-wide hover:text-yellow-400 transition"
            >
              {t('nav.contact')}
            </a>

            <div className="mt-4 flex justify-center">
              <LanguageSwitcher />
            </div>

            <div className="mt-4 pt-6 border-t border-gray-700">
              <a
                href="tel:+32473647947"
                className="block text-sm text-gray-300 hover:text-yellow-400 transition"
              >
                ☎️ 0473 64 79 47
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-1 py-8 sm:py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center">
          {t('appointment.title')}
        </h1>

        <AppointmentStepper currentStep={currentStep} />

        <div className="mt-8 sm:mt-12">
          {currentStep === 1 && (
            <ServiceSelection
              selectedService={appointmentData.service}
              onServiceSelect={handleServiceSelect}
            />
          )}

          {currentStep === 2 && (
            <CalendarPicker
              selectedDate={appointmentData.date}
              selectedService={appointmentData.service}
              onDateSelect={handleDateSelect}
              onBack={handlePreviousStep}
            />
          )}

          {currentStep === 3 && (
            <TimeSlotPicker
              selectedTime={appointmentData.time}
              selectedDate={appointmentData.date}
              selectedService={appointmentData.service}
              onTimeSelect={handleTimeSelect}
              onDateChange={handleDateChange}
              onBack={handlePreviousStep}
            />
          )}

          {currentStep === 4 && (
            <CustomerForm
              customerInfo={appointmentData.customerInfo}
              onSubmit={handleCustomerInfoSubmit}
              onBack={handlePreviousStep}
              appointmentSummary={{
                service: appointmentData.service,
                date: appointmentData.date,
                time: appointmentData.time,
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}
