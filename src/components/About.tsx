export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
      <div className="bg-gray-200 h-48 sm:h-56 md:h-64 flex items-center justify-center rounded-lg">
        <span className="text-sm sm:text-base text-gray-600">PHOTO GARAGE</span>
      </div>
      <div className="px-2 sm:px-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">À propos</h2>
        <p className="text-sm sm:text-base leading-relaxed text-gray-700">
          Chez Martins Automotive, chaque véhicule mérite une attention rigoureuse.
          Notre équipe qualifiée s&apos;engage à vous offrir un service fiable, rapide
          et professionnel.
        </p>
      </div>
    </section>
  );
}
