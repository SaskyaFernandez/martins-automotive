export default function About() {
  return (
    <section id="about" className="py-50 px-6 md:px-20 grid md:grid-cols-2 gap-8 items-center">
      <div className="bg-gray-200 h-64 flex items-center justify-center">
        <span>PHOTO GARAGE</span>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">À propos</h2>
        <p>
          Chez Martins Automotive, chaque véhicule mérite une attention rigoureuse.
          Notre équipe qualifiée s’engage à vous offrir un service fiable, rapide
          et professionnel.
        </p>
      </div>
    </section>
  );
}
