"use client";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

const SERVICE_KEYS = [
  "mon_entretien",
  "liquide_frein",
  "liquide_refroidissement",
  "adblue",
  "freinage",
  "eclairage_ampoules",
  "demarrage_batterie",
  "echappement",
  "amortisseur_suspension",
  "transmission_embrayage",
  "diagnostic_eco_controle",
  "check_up_controle_technique",
  "mon_entretien_eco_controle",
  "diagnostic_freinage",
  "diagnostic_demarrage_charge",
  "diagnostic_train_roulant",
  "diagnostics_electroniques",
  "check_up_pret_partir",
  "check_up_hiver",
  "check_up_printemps_ete",
  "vitrage",
  "entretien_reparation_2_roues",
];

const EXTS = [".png", ".webp", ".jpg", ".jpeg", ".svg"];

function ServiceCard({
  serviceKey,
  name,
}: {
  serviceKey: string;
  name: string;
}) {
  const base = `/images/services/${serviceKey}`;
  const [idx, setIdx] = useState(0);

  const src =
    idx < EXTS.length ? `${base}${EXTS[idx]}` : "/images/services/default.png";

  return (
    <div className="flex flex-col items-center bg-white shadow-sm hover:shadow-md transition rounded-sm overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-56 overflow-hidden group">
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setIdx((i) => i + 1)}
        />
      </div>

      {/* Titre */}
      <div className="w-full bg-white py-4 text-center">
        <h3 className="uppercase font-semibold tracking-wide text-sm text-gray-800">
          {name}
        </h3>
      </div>
    </div>
  );
}

export default function ServicesGrid() {
  const t = useTranslations();
  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll ? SERVICE_KEYS : SERVICE_KEYS.slice(0, 6);

  return (
    <section
      id="services"
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-20"
    >
      {/* Titre section */}
      <div className=" mb-6 sm:mb-7 md:mb-7">
        <div className="">
          <div className="flex gap-1.5 mb-2">
                    <Image
                      src="/separator-carsblue.svg"
                      alt="Localisation"
                      className="h-2 sm:h-2 md:h-3 w-auto"
                      width={500}
                      height={500}
                    />
                    <p className="uppercase font-semibold tracking-widest text-xs sm:text-xs">
                      {t("home.servicesSubtitle")}
                    </p>
                  </div>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-gray-900">
          {t("home.servicesTitle")}
        </h2>
      </div>

      {/* Grille */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        {visibleServices.map((serviceKey) => (
          <ServiceCard
            key={serviceKey}
            serviceKey={serviceKey}
            name={t(`services.${serviceKey}`)}
          />
        ))}
      </div>

      {/* Bouton "voir plus" */}
      {!showAll && (
        <div className="text-center mt-8 sm:mt-10">
          <button
            onClick={() => setShowAll(true)}
            className="uppercase text-xs sm:text-sm font-semibold tracking-wide underline hover:text-yellow-600 transition"
          >
            {t("home.showAllServices")}
          </button>
        </div>
      )}
    </section>
  );
}
