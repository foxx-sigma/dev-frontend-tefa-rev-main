"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Layanan", href: "#layanan" },
  { label: "Portofolio", href: "#portofolio" },
  { label: "Tentang", href: "#tentang" },
  { label: "Kontak", href: "#kontak" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-[#E8E6E1]"
          : "bg-white/70 backdrop-blur-md"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Image
            src="/Logo-SMK Telkom.svg"
            alt="Logo SMK Telkom"
            width={36}
            height={36}
            className="h-9 w-auto object-contain"
          />
          <span className="font-bold text-[0.95rem] text-[#1C1C2E]">
            TEFA{" "}
            <span className="text-[#C0272D]">SMK Telkom Malang</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 text-sm font-medium text-[#3B3B58] hover:text-[#C0272D] rounded-lg hover:bg-[#FBF7F7] transition-colors duration-200 no-underline"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link href="/sign-in" className="hidden md:block">
            <Button
              variant="default"
              className="bg-[#C0272D] hover:bg-[#991B1F] text-white px-5 py-2 h-9 text-sm font-semibold cursor-pointer"
            >
              Masuk
            </Button>
          </Link>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-none"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-[#1C1C2E] transition-transform duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#1C1C2E] transition-opacity duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#1C1C2E] transition-transform duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-80 border-t border-[#E8E6E1]" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-1 bg-white">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-sm font-medium text-[#3B3B58] hover:text-[#C0272D] hover:bg-[#FBF7F7] rounded-lg transition-colors no-underline"
            >
              {link.label}
            </a>
          ))}
          <Link href="/sign-in" className="mt-2" onClick={() => setMobileOpen(false)}>
            <Button
              variant="default"
              className="w-full bg-[#C0272D] hover:bg-[#991B1F] text-white font-semibold cursor-pointer"
            >
              Masuk
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
