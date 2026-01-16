"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="relative h-screen bg-black text-white bg-cover bg-bottom"
      style={{ backgroundImage: "url('/images/header.png')" }}
    >
      {/* NAV */}
      <nav className="absolute inset-x-0 top-4 px-4 sm:px-6 md:px-20 z-50">
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
          <div className="hidden md:flex gap-6 items-center text-sm lg:text-base">
            <a
              href="#about"
              className="hover:underline hover:text-yellow-400 transition"
            >
              {t('nav.about')}
            </a>
            <a
              href="#services"
              className="hover:underline hover:text-yellow-400 transition"
            >
              {t('nav.services')}
            </a>
            <a
              href="#contact"
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

            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="mb-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
                  Langue / Taal
                </p>
                <LanguageSwitcher />
              </div>
              <a
                href="tel:+32473647947"
                className="block text-sm text-gray-300 hover:text-yellow-400 transition"
              >
                ☎️ 0473 64 79 47
              </a>
              <a
                href="/rendez-vous"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 inline-flex items-center justify-center rounded-full border border-yellow-400 px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:bg-yellow-400 hover:text-black transition"
              >
                {t('nav.appointment')}
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-full flex flex-col justify-center px-4 sm:px-6 md:px-20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 max-w-xl uppercase leading-tight">
          {t('home.hero.title')}
        </h1>
        <Link
          href="/rendez-vous"
          className="btn-primary w-fit text-sm sm:text-base"
        >
          {t('home.hero.cta')}
        </Link>
      </div>
    </header>
  );
}
