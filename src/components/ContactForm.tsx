export default function ContactForm() {
  return (
    <section
      id="contact"
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-20 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/car-bg.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 w-full max-w-md mx-auto sm:mx-0">
        <h2 className="text-lg sm:text-xl md:text-2xl uppercase font-bold mb-4 sm:mb-6 text-white px-2 sm:px-0">
          Vous avez un problème ? On est là pour le régler.
        </h2>
        <form className="space-y-3 sm:space-y-4 bg-white p-6 sm:p-8 text-black rounded-lg shadow-xl">
          <h3 className="text-2xl sm:text-3xl uppercase font-bold mb-4 sm:mb-6 text-center text-black">
            Contactez-nous
          </h3>
          <input
            type="text"
            placeholder="Nom"
            className="w-full p-3 rounded-lg text-black text-sm sm:text-base"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg text-black text-sm sm:text-base"
          />
          <textarea
            placeholder="Message"
            rows={4}
            className="w-full p-3 rounded-lg text-black text-sm sm:text-base"
          ></textarea>
          <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition w-full text-sm sm:text-base">
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
}
