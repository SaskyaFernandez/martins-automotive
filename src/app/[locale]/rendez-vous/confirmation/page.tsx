"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getServiceKey, isKnownService } from "@/utils/serviceTranslation";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations();
  const locale = useLocale();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  const status = searchParams.get("status");
  const serviceParam = searchParams.get("service");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const appointmentNumber = searchParams.get("appointmentNumber");
  const errorMessage = searchParams.get("error");

  const isSuccess = status === "success";

  // Get translated service name
  const getTranslatedServiceName = (serviceName: string | null): string => {
    if (!serviceName) return "";

    if (isKnownService(serviceName)) {
      const serviceKey = getServiceKey(serviceName);
      return t(`services.${serviceKey}`);
    }

    return serviceName;
  };

  const service = getTranslatedServiceName(serviceParam);

  // Format date for display
  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    const localeCode = locale === "nl" ? "nl-BE" : "fr-BE";
    return dateObj.toLocaleDateString(localeCode, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

          <div className="hidden md:flex gap-6 items-center text-white text-sm lg:text-base">
            <a
              href="/#about"
              className="hover:underline hover:text-yellow-400 transition"
            >
              {t('nav.about')}
            </a>
            <a
              href="/#services"
              className="hover:underline hover:text-yellow-400 transition"
            >
              {t('nav.services')}
            </a>
            <a
              href="/#contact"
              className="hover:underline hover:text-yellow-400 transition"
            >
              {t('nav.contact')}
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 md:px-20 py-12 sm:py-16">
        <div className="text-center">
          {isSuccess ? (
            <>
              {/* Success Icon */}
              <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Success Message */}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {t('appointment.confirmation.success')}
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                {t('appointment.confirmation.successMessage')}
              </p>

              {/* Appointment Details Card */}
              <div className="bg-gray-50 rounded-lg p-6 sm:p-8 text-left mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {t('appointment.confirmation.details')}
                </h2>

                {appointmentNumber && (
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">
                      {t('appointment.confirmation.bookingNumber')}
                    </p>
                    <p className="text-lg font-mono font-semibold text-gray-900">
                      {appointmentNumber}
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  {service && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{t('appointment.confirmation.service')}</p>
                      <p className="text-base font-medium text-gray-900">
                        {service}
                      </p>
                    </div>
                  )}

                  {date && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{t('appointment.confirmation.date')}</p>
                      <p className="text-base font-medium text-gray-900">
                        {formatDate(date)}
                      </p>
                    </div>
                  )}

                  {time && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{t('appointment.confirmation.time')}</p>
                      <p className="text-base font-medium text-gray-900">
                        {time}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                <p className="text-sm text-gray-700 mb-3">
                  {t('appointment.confirmation.contactInfo')}
                </p>
                <p className="text-sm text-gray-600">
                  {t('appointment.confirmation.phoneContact')}{" "}
                  <a
                    href="tel:+32473647947"
                    className="font-semibold text-gray-900 hover:text-yellow-600 transition"
                  >
                    0473 64 79 47
                  </a>
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Error Icon */}
              <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>

              {/* Error Message */}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {t('appointment.confirmation.error')}
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                {errorMessage ||
                  t('appointment.confirmation.errorMessage')}
              </p>

              {/* Error Details */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                <p className="text-sm text-gray-700 mb-3">
                  {t('appointment.confirmation.retryMessage')}
                </p>
                <p className="text-sm text-gray-600">
                  {t('contact.phone')}:{" "}
                  <a
                    href="tel:+32473647947"
                    className="font-semibold text-gray-900 hover:text-red-600 transition"
                  >
                    0473 64 79 47
                  </a>
                </p>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-black text-white rounded hover:bg-gray-800 transition font-medium"
            >
              {t('appointment.confirmation.backHome')}
            </Link>
            {!isSuccess && (
              <Link
                href="/rendez-vous"
                className="px-8 py-3 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition font-medium"
              >
                {t('appointment.confirmation.retry')}
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
