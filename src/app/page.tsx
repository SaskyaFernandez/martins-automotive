import Header from "@/components/Header";
import InfoStrip from "@/components/InfoStrip";
import About from "@/components/About";
import ServicesGrid from "@/components/ServicesGrid";
import ContactForm from "@/components/ContactForm";
import BookingDialog from "@/components/BookingDialog";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Header />
      <InfoStrip />
      <About />
      <ServicesGrid />
      <ContactForm />
      {/* BookingDialog est un modal, on l’activera via un bouton */}
      <BookingDialog />
      <Footer />
    </main>
  );
}
