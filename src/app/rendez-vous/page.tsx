"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AppointmentStepper from "@/components/AppointmentStepper";
import ServiceSelection from "@/components/ServiceSelection";
import CalendarPicker from "@/components/CalendarPicker";
import TimeSlotPicker from "@/components/TimeSlotPicker";
import CustomerForm from "@/components/CustomerForm";

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
  const [currentStep, setCurrentStep] = useState(1);
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

  const handleTimeSelect = (time: string) => {
    setAppointmentData({ ...appointmentData, time });
    handleNextStep();
  };

  const handleCustomerInfoSubmit = (customerInfo: AppointmentData['customerInfo']) => {
    setAppointmentData({ ...appointmentData, customerInfo });
    // TODO: Send to backend when ready
    console.log("Appointment data:", { ...appointmentData, customerInfo });
    alert("Rendez-vous confirmé! Nous vous contacterons bientôt.");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white inset-x-0 top-4 px-6 py-4 md:px-20">
        <div className="flex items-center justify-between">
        <Link href="/">
            <Image
              src="/customcolor_logo_transparent_background.png"
              alt="Martins Auto"
              className="h-20 w-auto"
              width={500}
              height={500}
            />
          </Link>          
          <div className="flex gap-6 text-white">
            <a href="./#about" className="hover:underline">À propos</a>
            <a href="./#services" className="hover:underline">Nos Services</a>
            <a href="./#contact" className="hover:underline">Contact</a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 md:px-20 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Prendre rendez-vous</h1>
        
        <AppointmentStepper currentStep={currentStep} />

        <div className="mt-12">
          {currentStep === 1 && (
            <ServiceSelection
              selectedService={appointmentData.service}
              onServiceSelect={handleServiceSelect}
            />
          )}

          {currentStep === 2 && (
            <CalendarPicker
              selectedDate={appointmentData.date}
              onDateSelect={handleDateSelect}
              onBack={handlePreviousStep}
            />
          )}

          {currentStep === 3 && (
            <TimeSlotPicker
              selectedTime={appointmentData.time}
              onTimeSelect={handleTimeSelect}
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