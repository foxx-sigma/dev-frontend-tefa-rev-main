"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useScrollReveal } from "@/lib/useScrollReveal";

const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Software Development",
    desc: "Web & mobile app berstandar industri menggunakan stack modern seperti Next.js, Laravel, dan Flutter.",
    dept: "RPL",
    deptBg: "#C0272D",
    iconBg: "rgba(192,39,45,0.1)",
    iconColor: "#C0272D",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="8" height="8" rx="1" /><rect x="14" y="2" width="8" height="8" rx="1" />
        <rect x="2" y="14" width="8" height="8" rx="1" /><rect x="14" y="14" width="8" height="8" rx="1" />
      </svg>
    ),
    title: "Network & Infrastructure",
    desc: "Instalasi, konfigurasi, dan monitoring jaringan untuk bisnis dan organisasi.",
    dept: "TKJ",
    deptBg: "#1E56A0",
    iconBg: "rgba(30,86,160,0.1)",
    iconColor: "#1E56A0",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    title: "Multimedia & Production",
    desc: "Foto produk, video company profile, konten media sosial, dan desain grafis profesional.",
    dept: "PG",
    deptBg: "#6D28D9",
    iconBg: "rgba(109,40,217,0.1)",
    iconColor: "#6D28D9",
  },
];

export default function Services() {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal(0.1);

  return (
    <section id="layanan" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={headerRef} className="mb-12 opacity-0 translate-y-6 transition-all duration-700 ease-out">
          <Badge
            variant="secondary"
            className="mb-4 bg-[#FBF7F7] text-[#C0272D] border border-[#C0272D]/20 px-3.5 py-1.5 h-auto text-xs font-semibold tracking-wide uppercase"
          >
            Layanan
          </Badge>
          <h2 className="text-2xl md:text-[2rem] font-bold tracking-[-0.02em] text-[#1C1C2E] mb-3">
            Apa yang kami kerjakan
          </h2>
          <p className="text-[#3B3B58] max-w-lg leading-relaxed">
            Tiga jurusan TEFA berkolaborasi memberikan layanan end-to-end untuk
            kebutuhan digital Anda.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 opacity-0 translate-y-6 transition-all duration-700 ease-out delay-200">
          {services.map((s) => (
            <Card
              key={s.title}
              className="group bg-white border border-[#E8E6E1] rounded-xl ring-0 hover:-translate-y-1 hover:shadow-lg hover:border-[#C0272D]/20 transition-all duration-300 cursor-default"
            >
              <CardHeader className="pb-0">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: s.iconBg, color: s.iconColor }}
                >
                  {s.icon}
                </div>
                <CardTitle className="text-base font-bold text-[#1C1C2E]">
                  {s.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <CardDescription className="text-[#3B3B58] text-sm leading-relaxed mb-4">
                  {s.desc}
                </CardDescription>
                <Badge
                  className="text-xs font-semibold text-white"
                  style={{ backgroundColor: s.deptBg }}
                >
                  {s.dept}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
