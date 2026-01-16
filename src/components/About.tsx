"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function About() {
  const t = useTranslations();

  return (
    <section
      id="about"
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
    >
      <div className="bg-gray-200 h-48 sm:h-56 md:h-64 flex items-center justify-center rounded-lg">
        <span className="text-sm sm:text-base text-gray-600">PHOTO GARAGE</span>
      </div>
      <div className="flex flex-col gap-1.5 pt-3">
        <div className="flex gap-1.5 mb-2">
          <Image
            src="/separator-carsblue.svg"
            alt="Localisation"
            className="h-2 sm:h-2 md:h-3 w-auto"
            width={500}
            height={500}
          />
          <p className="uppercase font-semibold tracking-widest text-xs sm:text-xs">
            {t("home.about.subtitle")}
          </p>
        </div>
        <h2 className="text-xl uppercase sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
          {t("home.about.title")}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-gray-700">
          {t("home.about.text")}
        </p>
      </div>
    </section>
  );
}
