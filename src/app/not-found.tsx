import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Motif de grille en arrière-plan */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Formes décoratives */}
      <div className="absolute top-20 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 sm:w-64 sm:h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>

      {/* Header avec logo */}
      <header className="relative z-10 px-4 sm:px-6 md:px-20 py-6">
        <Link href="/" className="inline-block">
          <Image
            src="/customcolor_logo_transparent_background.png"
            alt="Martins Auto"
            className="h-14 sm:h-16 w-auto"
            width={500}
            height={500}
          />
        </Link>
      </header>

      {/* Contenu principal */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 md:px-20 py-12 sm:py-20">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8 sm:mb-12">
            {/* Icône de voiture cassée stylisée */}
            <div className="mb-6 sm:mb-8 flex justify-center">
              <div className="relative">
                <svg
                  className="w-20 h-20 sm:w-28 sm:h-28 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
                <div className="absolute -top-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold">!</div>
              </div>
            </div>

            {/* Gros titre 404 avec effet */}
            <h1 className="text-7xl sm:text-9xl md:text-[12rem] font-black mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                404
              </span>
            </h1>

            {/* Message */}
            <div className="mb-8 sm:mb-12 space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Route perdue
              </h2>
              <p className="text-base sm:text-lg text-gray-300 max-w-md mx-auto">
                Cette page semble avoir pris la mauvaise sortie. Retournons sur la bonne route.
              </p>
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-yellow-500 text-black font-bold rounded-lg overflow-hidden transition-all hover:bg-yellow-400 hover:scale-105 w-full sm:w-auto"
              >
                <span className="relative z-10 text-sm sm:text-base">← Retour à l&apos;accueil</span>
              </Link>
              <Link
                href="/rendez-vous"
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-yellow-500 text-yellow-500 font-bold rounded-lg hover:bg-yellow-500 hover:text-black transition-all hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
              >
                Prendre rendez-vous
              </Link>
            </div>
          </div>

          {/* Navigation rapide */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-700/50">
          <p className="sm:text-center text-xs sm:text-sm text-gray-400 mb-4">Liens rapides :</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <Link
                href="/#about"
                className="group p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:border-yellow-500/50 transition-all hover:bg-white/10"
              >
                <div className="text-yellow-500 mb-2 text-xl sm:text-2xl">👥</div>
                <h3 className="font-semibold mb-1 text-sm sm:text-base">À propos</h3>
                <p className="text-xs sm:text-sm text-gray-400">Découvrez notre équipe</p>
              </Link>

              <Link
                href="/#services"
                className="group p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:border-yellow-500/50 transition-all hover:bg-white/10"
              >
                <div className="text-yellow-500 mb-2 text-xl sm:text-2xl">🔧</div>
                <h3 className="font-semibold mb-1 text-sm sm:text-base">Nos services</h3>
                <p className="text-xs sm:text-sm text-gray-400">Tous nos services auto</p>
              </Link>

              <Link
                href="/#contact"
                className="group p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:border-yellow-500/50 transition-all hover:bg-white/10"
              >
                <div className="text-yellow-500 mb-2 text-xl sm:text-2xl">📞</div>
                <h3 className="font-semibold mb-1 text-sm sm:text-base">Contact</h3>
                <p className="text-xs sm:text-sm text-gray-400">Contactez-nous</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
