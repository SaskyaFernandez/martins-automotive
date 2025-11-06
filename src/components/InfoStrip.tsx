import Image from "next/image";
import Link from "next/link";

export default function InfoStrip() {
  return (
    <section className="text-yellow-500 bg-black py-4 flex flex-col md:flex-row justify-around items-center gap-4">
      {/* APPEL */}
      <a
        href="tel:+32473647947"
        className="font-bold group flex text-center gap-2 flex-col items-center"
      >
        <div className="flex justify-center mb-2">
          <Image
            src="/call.svg"
            alt="Martins Auto"
            className="h-5 w-auto"
            width={500}
            height={500}
          />
        </div>
        <h3 className="text-white underline group-hover:text-amber-300 transition-colors text-sm">
          APPELEZ-NOUS AU 0473 64 79 47
        </h3>
        <p className="text-gray-400 text-xs">
          N&apos;hésitez pas à nous contacter
        </p>
      </a>

      {/* RENDEZ-VOUS */}
      <Link
        href="/rendez-vous"
        className="font-bold group flex text-center gap-2 flex-col items-center"
      >
        <div className="flex justify-center mb-2">
          <Image
            src="/calendar.svg"
            alt="Rendez-vous"
            className="h-5 w-auto"
            width={500}
            height={500}
          />
        </div>
        <h3 className="text-white underline group-hover:text-amber-300 transition-colors text-sm">
          OBTENIR UN RENDEZ-VOUS
        </h3>
        <p className="text-gray-400 text-xs">
          Un entretien? Une réparation? Un témoin allumé?
        </p>
      </Link>

      {/* GOOGLE MAPS */}
      <a
        href="https://www.google.com/maps?q=Albert+Vaucampslaan+26,+1654+Huizingen"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold group flex text-center gap-2 flex-col items-center"
      >
        <div className="flex justify-center mb-2">
          <Image
            src="/maps.svg"
            alt="Localisation"
            className="h-5 w-auto"
            width={500}
            height={500}
          />
        </div>
        <h3 className="text-white underline group-hover:text-amber-300 transition-colors text-sm">
          TROUVEZ-NOUS SUR LA CARTE
        </h3>
        <p className="text-gray-400 text-xs">
          Albert Vaucampslaan 28, 1654 Huizingen
        </p>
      </a>
    </section>
  );
}
