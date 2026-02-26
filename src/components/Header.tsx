'use client';

import { useState } from "react";
import Image from "next/image";
import AdminLogin from "./AdminLogin";

interface HeaderProps {
  loggedIn: boolean;
  onLogin: () => void;
  onOpenDashboard: () => void;
}

export default function Header({ loggedIn, onLogin, onOpenDashboard }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#calendar", label: "Calendar" },
    { href: "#hours", label: "Hours" },
    { href: "#location", label: "Location" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#027373] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center gap-3">
              <Image
                src="/images/logo.jpg"
                alt="Cayman Islands Agricultural Society Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-white font-bold text-lg hidden sm:inline">
                CI Agricultural Society
              </span>
            </a>
          </div>

          <nav className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white hover:text-[#04BFBF] transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
            {loggedIn ? (
              <button
                onClick={onOpenDashboard}
                className="bg-[#7EA629] hover:bg-[#6b8f22] text-white px-5 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200"
              >
                Dashboard
              </button>
            ) : (
              <AdminLogin onLogin={onLogin} />
            )}
          </nav>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-2 text-white hover:text-[#04BFBF] transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              {loggedIn ? (
                <button
                  onClick={() => { onOpenDashboard(); setIsMenuOpen(false); }}
                  className="bg-[#7EA629] hover:bg-[#6b8f22] text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors w-full"
                >
                  Dashboard
                </button>
              ) : (
                <AdminLogin onLogin={() => { onLogin(); setIsMenuOpen(false); }} />
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
