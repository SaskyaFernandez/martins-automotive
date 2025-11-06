"use client";
import Image from "next/image";
import { useState } from "react";

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

const EXTS = [".webp", ".jpg", ".jpeg", ".png", ".svg"];
const toSlug = (s: string) => s.toLowerCase().replace(/\s+/g, "_");

function ServiceCard({ name }: { name: string }) {
  const base = `/images/services/${toSlug(name)}`;
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
  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll ? SERVICES : SERVICES.slice(0, 6);

  return (
    <section id="services" className=" py-50 px-6 md:px-20">
      {/* Titre section */}
      <div className="text-center mb-12">
        <p className="text-gray-500 uppercase tracking-widest text-sm">
          Que faisons-nous ?
        </p>
        <h2 className="text-3xl font-extrabold tracking-wide text-gray-900">
          Nos services
        </h2>
      </div>

      {/* Grille */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {visibleServices.map((s) => (
          <ServiceCard key={s} name={s} />
        ))}
      </div>

      {/* Bouton "voir plus" */}
      {!showAll && (
        <div className="text-center mt-10">
          <button
            onClick={() => setShowAll(true)}
            className="uppercase text-sm font-semibold tracking-wide underline hover:text-yellow-600 transition"
          >
            Afficher tous les services
          </button>
        </div>
      )}
    </section>
  );
}
