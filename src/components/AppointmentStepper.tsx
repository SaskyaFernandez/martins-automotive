"use client";

import { useTranslations } from "next-intl";

interface AppointmentStepperProps {
  currentStep: number;
}

export default function AppointmentStepper({ currentStep }: AppointmentStepperProps) {
  const t = useTranslations();

  const STEPS = [
    { number: 1, titleKey: "appointment.steps.service", descriptionKey: "appointment.selectService" },
    { number: 2, titleKey: "appointment.steps.date", descriptionKey: "appointment.selectDate" },
    { number: 3, titleKey: "appointment.steps.time", descriptionKey: "appointment.selectTime" },
    { number: 4, titleKey: "appointment.steps.info", descriptionKey: "appointment.customerInfo.title" },
  ];
  return (
    <div className="flex items-center justify-center overflow-x-auto px-2">
      <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-8">
        {STEPS.map((step, index) => (
          <div key={step.number} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm transition
                  ${step.number <= currentStep
                    ? 'bg-yellow-500 text-black'
                    : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {step.number < currentStep ? (
                  <span>✓</span>
                ) : (
                  <span>{step.number}</span>
                )}
              </div>

              {/* Step Title */}
              <div className="mt-1 sm:mt-2 text-center">
                <div
                  className={`
                    text-xs sm:text-sm font-medium whitespace-nowrap
                    ${step.number <= currentStep ? 'text-black' : 'text-gray-500'}
                  `}
                >
                  {t(step.titleKey)}
                </div>
                <div
                  className={`
                    text-xs hidden md:block
                    ${step.number <= currentStep ? 'text-gray-600' : 'text-gray-400'}
                  `}
                >
                  {t(step.descriptionKey)}
                </div>
              </div>
            </div>

            {/* Connector Line */}
            {index < STEPS.length - 1 && (
              <div
                className={`
                  w-6 sm:w-12 md:w-20 h-0.5 mx-2 sm:mx-4 transition
                  ${step.number < currentStep ? 'bg-yellow-500' : 'bg-gray-200'}
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}