'use client';

import { useState } from 'react';
import Calendar from '@/components/Calendar';
import Gallery from '@/components/Gallery';
import AdminDashboard from '@/components/AdminDashboard';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Hours from "@/components/Hours";
import Location from "@/components/Location";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="min-h-screen">
      <Header
        loggedIn={loggedIn}
        onLogin={() => { setLoggedIn(true); setShowAdmin(true); }}
        onOpenDashboard={() => setShowAdmin(true)}
      />
      <main>
        <Hero />
        <About />
        <Calendar />
        <Gallery />
        <Hours />
        <Location />
        <Contact />
      </main>
      <Footer />

      {showAdmin && loggedIn && (
        <AdminDashboard
          onClose={() => setShowAdmin(false)}
          onLogout={() => { setLoggedIn(false); setShowAdmin(false); }}
        />
      )}
    </div>
  );
}
