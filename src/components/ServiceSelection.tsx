"use client";
import { useState } from "react";
import { getServiceDuration, formatDuration } from "@/utils/serviceDurations";
import { useTranslations, useLocale } from "next-intl";

const SERVICE_CATEGORIES = {
  maintenance: [
    "mon_entretien",
    "mon_entretien_eco_controle",
    "liquide_frein",
    "liquide_refroidissement",
    "adblue",
  ],
  repairs: [
    "freinage",
    "eclairage_ampoules",
    "demarrage_batterie",
    "echappement",
    "amortisseur_suspension",
    "transmission_embrayage",
  ],
  diagnostics: [
    "diagnostic_eco_controle",
    "diagnostic_freinage",
    "diagnostic_demarrage_charge",
    "diagnostic_train_roulant",
    "diagnostics_electroniques",
  ],
  checkups: [
    "check_up_controle_technique",
    "check_up_hiver",
    "check_up_printemps_ete",
    "check_up_pret_partir",
  ],
  specialized: [
    "vitrage",
    "entretien_reparation_2_roues",
  ],
};

interface ServiceSelectionProps {
  selectedService: string;
  onServiceSelect: (service: string) => void;
}

export default function ServiceSelection({ selectedService, onServiceSelect }: ServiceSelectionProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Get all services to display based on active filter
  const getDisplayedServices = () => {
    if (!activeFilter) {
      // Show all services
      return Object.entries(SERVICE_CATEGORIES).flatMap(([categoryKey, serviceKeys]) =>
        serviceKeys.map(key => ({ key, category: categoryKey }))
      );
    }
    // Show only services from active category
    return SERVICE_CATEGORIES[activeFilter as keyof typeof SERVICE_CATEGORIES].map(key => ({
      key,
      category: activeFilter
    }));
  };

  const displayedServices = getDisplayedServices();

  return (
    <div>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">
        {t('appointment.selectService')}
      </h2>

      {/* Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setActiveFilter(null)}
          className={`
            px-4 py-2 rounded-full font-medium text-sm transition-all
            ${!activeFilter
              ? 'bg-yellow-500 text-black shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          {t('home.showAllServices')}
        </button>
        {Object.keys(SERVICE_CATEGORIES).map((categoryKey) => (
          <button
            key={categoryKey}
            onClick={() => setActiveFilter(categoryKey)}
            className={`
              px-4 py-2 rounded-full font-medium text-sm transition-all
              ${activeFilter === categoryKey
                ? 'bg-yellow-500 text-black shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {t(`appointment.serviceCategories.${categoryKey}`)}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {displayedServices.map(({ key: serviceKey }) => {
          const serviceName = t(`services.${serviceKey}`);
          const duration = getServiceDuration(serviceName);
          return (
            <button
              key={serviceKey}
              onClick={() => onServiceSelect(serviceName)}
              className={`
                p-4 rounded-lg border-2 font-medium text-left flex flex-col gap-2 transition-all
                ${selectedService === serviceName
                  ? 'bg-yellow-500 border-yellow-500 text-black shadow-md'
                  : 'bg-white border-gray-200 hover:border-yellow-500 hover:bg-yellow-50'
                }
              `}
            >
              <span className="font-semibold text-sm sm:text-base">{serviceName}</span>
              <span className="text-xs text-gray-600">
                {t('appointment.duration')} : {formatDuration(duration, locale)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}