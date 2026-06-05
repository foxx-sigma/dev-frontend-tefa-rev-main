"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function CtaBanner() {
  const ref = useScrollReveal();

  return (
    <section className="py-20 bg-[#F5F4F2]">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className="bg-[#1a1a2e] rounded-2xl px-8 md:px-12 py-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden opacity-0 translate-y-6 transition-all duration-700 ease-out"
        >
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[#C0272D]/10 pointer-events-none" />
          <div className="absolute -bottom-8 left-[40%] w-28 h-28 rounded-full bg-[#C0272D]/5 pointer-events-none" />

          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-white font-bold text-lg md:text-xl mb-2">
              Punya pertanyaan tentang layanan kami?
            </h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              Hubungi langsung kepala program keahlian di setiap jurusan untuk
              konsultasi proyek.
            </p>
          </div>

          <Link href="/contact-supervisor" className="relative z-10 shrink-0">
            <Button className="bg-[#C0272D] hover:bg-[#991B1F] text-white font-bold px-7 py-3 h-auto text-sm cursor-pointer gap-2">
              Hubungi Pembimbing
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
