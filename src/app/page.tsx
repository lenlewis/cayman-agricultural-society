import Calendar from '@/components/Calendar';
import AdminLogin from '@/components/AdminLogin';
import AdminDashboard from '@/components/AdminDashboard';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Hours from "@/components/Hours";
import Location from "@/components/Location";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Hours />
        <Location />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
