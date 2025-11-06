"use client";

import Image from "next/image";
import Link from "next/link";


export default function Header() {
  return (
    <header
      className="relative h-screen bg-black text-white bg-cover bg-bottom"
      style={{ backgroundImage: "url('/images/header.png')" }}
    >
      {/* NAV */}
      <nav className="absolute inset-x-0 top-4 px-6 md:px-20">
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
          <div className="flex gap-6">
            <a href="#about" className="hover:underline">À propos</a>
            <a href="#services" className="hover:underline">Nos Services</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </div>
        </div>
      </nav>

      <div className="h-full flex flex-col justify-center px-6 md:px-20">
        <h1 className="text-4xl font-bold mb-4 max-w-xl uppercase line-">
          Sur la route, on veille sur vous et votre voiture
        </h1>
        <Link href="/rendez-vous" className="btn-primary w-fit">
          Prendre rendez-vous
        </Link>      </div>
    </header>
  );
}