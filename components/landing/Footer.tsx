import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-[#0d1117] py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + Tagline */}
          <div className="flex items-center gap-3">
            <Image
              src="/Logo-SMK Telkom.svg"
              alt="Logo SMK Telkom"
              width={36}
              height={36}
              className="h-9 w-auto object-contain"
            />
            <div>
              <span className="font-bold text-white text-[0.95rem]">
                TEFA <span className="text-[#C0272D]">SMK Telkom Malang</span>
              </span>
              <p className="text-[#6B7280] text-xs mt-0.5">
                Teaching Factory — Bridging Education & Industry
              </p>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-[#6B7280] text-xs">
            © {new Date().getFullYear()} TEFA SMK Telkom Malang. All rights reserved.
          </p>
        </div>

        <Separator className="my-6 bg-white/10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <div className="flex gap-6">
            <a href="#beranda" className="hover:text-white transition-colors no-underline">Beranda</a>
            <a href="#layanan" className="hover:text-white transition-colors no-underline">Layanan</a>
            <a href="#portofolio" className="hover:text-white transition-colors no-underline">Portofolio</a>
            <a href="#tentang" className="hover:text-white transition-colors no-underline">Tentang</a>
            <a href="#kontak" className="hover:text-white transition-colors no-underline">Kontak</a>
          </div>
          <p>SMK Telkom Malang, Jl. Danau Ranau, Sawojajar, Malang</p>
        </div>
      </div>
    </footer>
  );
}
