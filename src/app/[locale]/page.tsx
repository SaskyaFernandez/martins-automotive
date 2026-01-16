import Header from "@/components/Header";
import InfoStrip from "@/components/InfoStrip";
import About from "@/components/About";
import ServicesGrid from "@/components/ServicesGrid";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col bg-[#F3F3F3]">
      <Header />
      <InfoStrip />
      <About />
      <ServicesGrid />
      <ContactForm />
      <Footer />
    </main>
  );
}
