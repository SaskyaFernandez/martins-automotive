"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "Général",
    question: "Quels sont vos horaires d'ouverture ?",
    answer:
      "Nous sommes ouverts du lundi au vendredi de 8h00 à 18h00 et le samedi de 9h00 à 13h00. Nous sommes fermés le dimanche.",
  },
  {
    category: "Général",
    question: "Où êtes-vous situé ?",
    answer:
      "Nous sommes situés à Huizingen, Belgique. Un parking gratuit est disponible pour nos clients.",
  },
  {
    category: "Général",
    question: "Acceptez-vous les paiements par carte ?",
    answer:
      "Oui, nous acceptons les paiements en espèces, par carte bancaire (Visa, Mastercard) et par Bancontact.",
  },
  {
    category: "Rendez-vous",
    question: "Comment prendre rendez-vous ?",
    answer:
      "Vous pouvez prendre rendez-vous directement en ligne via notre site web, par téléphone au 0473 64 79 47, ou en nous envoyant un email via notre formulaire de contact.",
  },
  {
    category: "Rendez-vous",
    question: "Puis-je modifier ou annuler mon rendez-vous ?",
    answer:
      "Oui, vous pouvez modifier ou annuler votre rendez-vous en nous contactant par téléphone au moins 24 heures à l'avance. Cela nous permet de mieux organiser notre planning.",
  },
  {
    category: "Rendez-vous",
    question: "Combien de temps à l'avance dois-je prendre rendez-vous ?",
    answer:
      "Nous recommandons de prendre rendez-vous au moins 3-5 jours à l'avance pour garantir votre créneau préféré. Pour les urgences, contactez-nous directement.",
  },
  {
    category: "Services",
    question: "Quels types de véhicules réparez-vous ?",
    answer:
      "Nous intervenons sur tous types de véhicules : voitures essence et diesel, véhicules hybrides, petits utilitaires. Toutes marques confondues.",
  },
  {
    category: "Services",
    question: "Proposez-vous un service de véhicule de remplacement ?",
    answer:
      "Oui, selon disponibilité et pour certaines interventions longues, nous pouvons proposer un véhicule de remplacement. Veuillez nous en informer lors de la prise de rendez-vous.",
  },
  {
    category: "Services",
    question: "Combien coûte un entretien complet ?",
    answer:
      "Le coût d'un entretien varie selon le modèle de votre véhicule et le type d'entretien nécessaire. Contactez-nous avec votre numéro de châssis pour un devis personnalisé gratuit.",
  },
  {
    category: "Services",
    question: "Utilisez-vous des pièces d'origine ?",
    answer:
      "Nous utilisons des pièces d'origine ou des pièces de qualité équivalente certifiées. Vous avez toujours le choix et nous vous conseillons sur la meilleure option.",
  },
  {
    category: "Garantie",
    question: "Vos réparations sont-elles garanties ?",
    answer:
      "Oui, toutes nos réparations sont garanties. La durée de garantie dépend du type d'intervention et des pièces utilisées. Nous vous informons systématiquement.",
  },
  {
    category: "Garantie",
    question: "Que couvre la garantie ?",
    answer:
      "Notre garantie couvre la main d'œuvre et les pièces installées contre tout défaut de fabrication ou de montage. Les conditions exactes vous sont communiquées lors de l'intervention.",
  },
  {
    category: "Contrôle Technique",
    question: "Proposez-vous la préparation au contrôle technique ?",
    answer:
      "Oui, nous effectuons une révision complète de votre véhicule avant le contrôle technique pour maximiser vos chances de réussite du premier coup.",
  },
  {
    category: "Contrôle Technique",
    question: "Que faire si mon véhicule est refusé au contrôle ?",
    answer:
      "Apportez-nous le rapport de contrôle. Nous effectuerons les réparations nécessaires rapidement pour que vous puissiez repasser le contrôle dans les délais.",
  },
  {
    category: "Urgences",
    question: "Que faire en cas de panne ?",
    answer:
      "Contactez-nous immédiatement au 0473 64 79 47. Nous vous conseillerons sur la marche à suivre et organiserons le dépannage ou la prise en charge de votre véhicule si nécessaire.",
  },
  {
    category: "Urgences",
    question: "Proposez-vous un service de dépannage ?",
    answer:
      "Nous ne proposons pas de service de dépannage routier, mais nous pouvons vous orienter vers des partenaires de confiance et prendre en charge votre véhicule dès son arrivée à l'atelier.",
  },
];

export default function FAQPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");

  const categories = ["Tous", ...Array.from(new Set(faqs.map((faq) => faq.category)))];

  const filteredFaqs =
    selectedCategory === "Tous"
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white inset-x-0 top-0 px-4 sm:px-6 py-4 md:px-20">
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 text-white text-sm lg:text-base items-center">
            <Link
              href="/#about"
              className="hover:underline hover:text-yellow-400 transition"
            >
              À propos
            </Link>
            <Link
              href="/#services"
              className="hover:underline hover:text-yellow-400 transition"
            >
              Nos Services
            </Link>
            <Link
              href="/contact"
              className="hover:underline hover:text-yellow-400 transition"
            >
              Contact
            </Link>
            <Link
              href="/faq"
              className="hover:underline text-yellow-400 font-semibold"
            >
              FAQ
            </Link>
            <Link
              href="/rendez-vous"
              className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition font-medium"
            >
              Prendre Rendez-vous
            </Link>
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  mobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-3 text-white">
            <Link
              href="/#about"
              className="hover:text-yellow-400 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              À propos
            </Link>
            <Link
              href="/#services"
              className="hover:text-yellow-400 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Nos Services
            </Link>
            <Link
              href="/contact"
              className="hover:text-yellow-400 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/faq"
              className="text-yellow-400 font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/rendez-vous"
              className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition font-medium text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Prendre Rendez-vous
            </Link>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-20 py-12 sm:py-16">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Questions Fréquentes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vous avez des questions ? Retrouvez ici les réponses aux questions
            les plus fréquemment posées.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === category
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100 transition"
              >
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full mb-2">
                    {faq.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-500 transition-transform flex-shrink-0 ml-4 ${
                    openItems.includes(index) ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openItems.includes(index) && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Vous ne trouvez pas votre réponse ?
          </h2>
          <p className="text-gray-700 mb-6">
            N'hésitez pas à nous contacter directement, nous serons ravis de vous
            aider.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition font-semibold"
            >
              Nous contacter
            </Link>
            <a
              href="tel:+32473647947"
              className="px-8 py-3 bg-black text-white rounded hover:bg-gray-800 transition font-semibold"
            >
              Appeler: 0473 64 79 47
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Martins Automotive</h3>
              <p className="text-gray-400">
                Votre garage de confiance à Huizingen
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">Téléphone: 0473 64 79 47</p>
              <p className="text-gray-400">Huizingen, Belgique</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Horaires</h3>
              <p className="text-gray-400">Lun-Ven: 8h00 - 18h00</p>
              <p className="text-gray-400">Sam: 9h00 - 13h00</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Martins Automotive. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
