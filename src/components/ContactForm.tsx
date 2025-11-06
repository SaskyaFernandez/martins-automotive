export default function ContactForm() {
  return (
    <section
      id="contact"
      className="relative py-50 px-6 md:px-20 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/car-bg.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 max-w-md text-white">
      <h2 className="text-xl uppercase font-bold mb-6 text-white">Vous avez un problème ? On est là pour le régler.</h2>
        <form className="space-y-4  bg-white p-8 text-black rounded-lg">
          <h3 className="text-3xl uppercase font-bold mb-6 text-center text-black">Contactez-nous</h3>
          <input type="text" placeholder="Nom" className="w-full p-3 rounded-lg text-black" />
          <input type="email" placeholder="Email" className="w-full p-3 rounded-lg text-black" />
          <textarea placeholder="Message" rows={4} className="w-full p-3 rounded-lg text-black"></textarea>
          <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition w-full">
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
}
