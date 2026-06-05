"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function ContactForm() {
  const ref = useScrollReveal();

  return (
    <section id="kontak" className="py-20 bg-white">
      <div className="max-w-xl mx-auto px-6">
        <div ref={ref} className="text-center opacity-0 translate-y-6 transition-all duration-700 ease-out">
          <Badge
            variant="secondary"
            className="mb-4 bg-[#FBF7F7] text-[#C0272D] border border-[#C0272D]/20 px-3.5 py-1.5 h-auto text-xs font-semibold tracking-wide uppercase mx-auto"
          >
            Hubungi Kami
          </Badge>
          <h2 className="text-2xl md:text-[2rem] font-bold tracking-[-0.02em] text-[#1C1C2E] mb-3">
            Mulai Proyek Bersama Kami
          </h2>
          <p className="text-[#3B3B58] mb-10 leading-relaxed">
            Ceritakan kebutuhan proyek Anda. Tim kami akan menghubungi Anda dalam 2×24 jam.
          </p>

          <div className="flex flex-col gap-4 text-left">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-semibold text-[#1C1C2E] mb-1.5">
                  Nama
                </label>
                <Input
                  id="contact-name"
                  placeholder="Nama lengkap"
                  className="border-[#E8E6E1] bg-white focus-visible:ring-[#C0272D]/30 focus-visible:border-[#C0272D] h-11"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-semibold text-[#1C1C2E] mb-1.5">
                  Email
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="email@contoh.com"
                  className="border-[#E8E6E1] bg-white focus-visible:ring-[#C0272D]/30 focus-visible:border-[#C0272D] h-11"
                />
              </div>
            </div>

            {/* Service Select */}
            <div>
              <label htmlFor="contact-service" className="block text-sm font-semibold text-[#1C1C2E] mb-1.5">
                Jenis Layanan
              </label>
              <select
                id="contact-service"
                className="w-full border border-[#E8E6E1] rounded-lg px-4 py-2.5 text-sm bg-white text-[#3B3B58] focus:outline-none focus:ring-2 focus:ring-[#C0272D]/30 focus:border-[#C0272D] transition-colors appearance-auto"
              >
                <option value="">Pilih layanan...</option>
                <option>Software Development</option>
                <option>UI/UX Design</option>
                <option>Network & Infrastructure</option>
                <option>Server & Cloud</option>
                <option>Multimedia & Photography</option>
                <option>Video Production</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="contact-desc" className="block text-sm font-semibold text-[#1C1C2E] mb-1.5">
                Deskripsi Proyek
              </label>
              <Textarea
                id="contact-desc"
                rows={4}
                placeholder="Ceritakan proyek Anda..."
                className="border-[#E8E6E1] bg-white focus-visible:ring-[#C0272D]/30 focus-visible:border-[#C0272D] resize-y"
              />
            </div>

            {/* Submit */}
            <Button
              id="contact-submit"
              className="w-full bg-[#C0272D] hover:bg-[#991B1F] text-white font-bold py-3 h-12 text-sm cursor-pointer gap-2"
            >
              Kirim Pesan
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
