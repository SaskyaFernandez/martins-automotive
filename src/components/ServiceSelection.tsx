"use client";

const SERVICES = [
  "Entretien",
  "Diagnostic",
  "Contrôle technique",
  "Pneus",
  "Moteur",
  "Carrosserie",
  "Freins",
  "Suspension",
  "Climatisation",
];

interface ServiceSelectionProps {
  selectedService: string;
  onServiceSelect: (service: string) => void;
}

export default function ServiceSelection({ selectedService, onServiceSelect }: ServiceSelectionProps) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">Choisissez votre service</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {SERVICES.map((service, i) => (
          <button
            key={i}
            onClick={() => onServiceSelect(service)}
            className={`
              bg-gray-100 p-4 sm:p-5 md:p-6 rounded-lg shadow hover:shadow-lg transition text-sm sm:text-base
              ${selectedService === service ? 'bg-yellow-500 text-black font-semibold' : 'hover:bg-gray-200'}
              text-left
            `}
          >
            {service}
          </button>
        ))}
      </div>
    </div>
  );
}