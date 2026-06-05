import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Portfolio from "@/components/landing/Portfolio";
import About from "@/components/landing/About";
import CtaBanner from "@/components/landing/CtaBanner";
import ContactForm from "@/components/landing/ContactForm";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="bg-[#F5F4F2] text-[#3B3B58]">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <CtaBanner />
      <ContactForm />
      <Footer />
    </main>
  );
}