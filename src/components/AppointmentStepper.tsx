"use client";

interface AppointmentStepperProps {
  currentStep: number;
}

const STEPS = [
  { number: 1, title: "Service", description: "Choisir le service" },
  { number: 2, title: "Date", description: "Sélectionner la date" },
  { number: 3, title: "Heure", description: "Choisir l'horaire" },
  { number: 4, title: "Informations", description: "Vos coordonnées" },
];

export default function AppointmentStepper({ currentStep }: AppointmentStepperProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center space-x-4 md:space-x-8">
        {STEPS.map((step, index) => (
          <div key={step.number} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition
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
              <div className="mt-2 text-center">
                <div
                  className={`
                    text-sm font-medium
                    ${step.number <= currentStep ? 'text-black' : 'text-gray-500'}
                  `}
                >
                  {step.title}
                </div>
                <div
                  className={`
                    text-xs hidden md:block
                    ${step.number <= currentStep ? 'text-gray-600' : 'text-gray-400'}
                  `}
                >
                  {step.description}
                </div>
              </div>
            </div>

            {/* Connector Line */}
            {index < STEPS.length - 1 && (
              <div
                className={`
                  w-12 md:w-20 h-0.5 mx-4 transition
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