import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header minimal */}
      <header className="px-4 sm:px-6 md:px-20 py-4">
        <Link href="/">
          <Image
            src="/customcolor_logo_transparent_background.png"
            alt="Martins Auto"
            className="h-16 sm:h-20 w-auto"
            width={500}
            height={500}
          />
        </Link>
      </header>

      {/* Contenu 404 */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-20 text-center">
        {/* Numéro 404 stylisé */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-extrabold text-yellow-500 leading-none">
            404
          </h1>
        </div>

        {/* Message d&apos;erreur */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 uppercase">
            Page introuvable
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-2">
            Oups ! On dirait que cette page a pris un mauvais virage.
          </p>
          <p className="text-sm sm:text-base text-gray-400">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
          <Link
            href="/"
            className="btn-primary text-center text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/rendez-vous"
            className="bg-transparent border-2 border-yellow-500 text-yellow-500 text-center text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-yellow-500 hover:text-black transition"
          >
            Prendre rendez-vous
          </Link>
        </div>

        {/* Illustration symbolique (optionnel) */}
        <div className="mt-12 sm:mt-16 text-gray-600">
          <svg
            className="w-32 h-32 sm:w-40 sm:h-40 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4m0 4h.01"
            />
          </svg>
        </div>

        {/* Liens rapides */}
        <div className="mt-12 sm:mt-16 border-t border-gray-700 pt-8 sm:pt-10">
          <p className="text-xs sm:text-sm text-gray-400 mb-4">Liens rapides :</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
            <Link href="/#about" className="hover:text-yellow-400 transition">
              À propos
            </Link>
            <Link href="/#services" className="hover:text-yellow-400 transition">
              Nos Services
            </Link>
            <Link href="/#contact" className="hover:text-yellow-400 transition">
              Contact
            </Link>
          </div>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="py-6 text-center text-xs sm:text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Martins Automotive. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
