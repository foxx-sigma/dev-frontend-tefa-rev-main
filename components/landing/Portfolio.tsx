"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollReveal } from "@/lib/useScrollReveal";

const filters = ["Semua", "RPL", "TKJ", "PG"] as const;

const projects = [
  {
    title: "E-Commerce Platform",
    desc: "Platform belanja online untuk UMKM lokal dengan fitur pembayaran digital terintegrasi.",
    tags: ["Next.js", "Prisma", "Midtrans"],
    jurusan: "RPL",
    color: "#C0272D",
    bgColor: "#FBF7F7",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    title: "Network Monitoring Dashboard",
    desc: "Dashboard real-time untuk monitoring infrastruktur jaringan sekolah dan klien.",
    tags: ["Grafana", "Prometheus", "Linux"],
    jurusan: "TKJ",
    color: "#1E56A0",
    bgColor: "#F0F4FA",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Company Profile Video",
    desc: "Video company profile profesional untuk klien UMKM di Kota Malang dan sekitarnya.",
    tags: ["Premiere Pro", "After Effects"],
    jurusan: "PG",
    color: "#6D28D9",
    bgColor: "#F5F0FF",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
  },
  {
    title: "School Management App",
    desc: "Aplikasi manajemen sekolah terintegrasi untuk absensi, nilai, dan komunikasi orang tua.",
    tags: ["Laravel", "MySQL", "Flutter"],
    jurusan: "RPL",
    color: "#C0272D",
    bgColor: "#FBF7F7",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
  },
  {
    title: "Server Deployment & DevOps",
    desc: "Setup server cloud, CI/CD pipeline, dan monitoring untuk startup lokal.",
    tags: ["Docker", "AWS", "Nginx"],
    jurusan: "TKJ",
    color: "#1E56A0",
    bgColor: "#F0F4FA",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
        <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
  },
  {
    title: "Brand Identity Design",
    desc: "Desain identitas visual lengkap: logo, stationery, dan brand guideline.",
    tags: ["Illustrator", "Figma", "InDesign"],
    jurusan: "PG",
    color: "#6D28D9",
    bgColor: "#F5F0FF",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
        <circle cx="13.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="15.5" r="2.5" />
        <circle cx="8.5" cy="15.5" r="2.5" />
        <path d="M13.5 9a6.5 6.5 0 110 6" />
      </svg>
    ),
  },
];

export default function Portfolio() {
  const [active, setActive] = useState<(typeof filters)[number]>("Semua");
  const headerRef = useScrollReveal();

  const filtered =
    active === "Semua" ? projects : projects.filter((p) => p.jurusan === active);

  return (
    <section id="portofolio" className="py-20 bg-[#F5F4F2]">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={headerRef} className="mb-10 opacity-0 translate-y-6 transition-all duration-700 ease-out">
          <Badge
            variant="secondary"
            className="mb-4 bg-[#FBF7F7] text-[#C0272D] border border-[#C0272D]/20 px-3.5 py-1.5 h-auto text-xs font-semibold tracking-wide uppercase"
          >
            Portofolio
          </Badge>
          <h2 className="text-2xl md:text-[2rem] font-bold tracking-[-0.02em] text-[#1C1C2E] mb-3">
            Proyek Terbaru Kami
          </h2>
          <p className="text-[#3B3B58] max-w-lg leading-relaxed">
            Hasil kerja nyata dari kolaborasi siswa dan industri.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f}
              id={`filter-${f.toLowerCase()}`}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer border ${
                active === f
                  ? "bg-[#C0272D] text-white border-[#C0272D]"
                  : "bg-white text-[#3B3B58] border-[#E8E6E1] hover:border-[#C0272D]/30 hover:text-[#C0272D]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <Card
              key={p.title}
              className="group bg-white border border-[#E8E6E1] rounded-xl ring-0 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-default opacity-0 translate-y-4 animate-fade-in"
              style={{ animation: `fadeInUp 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s both` }}
            >
              <div
                className="h-44 flex items-center justify-center"
                style={{ backgroundColor: p.bgColor, color: p.color }}
              >
                {p.icon}
              </div>
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-sm font-bold text-[#1C1C2E] leading-snug">{p.title}</h3>
                  <Badge
                    className="shrink-0 text-[0.65rem] font-bold text-white px-2.5 py-0.5 h-auto"
                    style={{ backgroundColor: p.color }}
                  >
                    {p.jurusan}
                  </Badge>
                </div>
                <p className="text-[#3B3B58] text-xs leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="bg-[#F5F4F2] text-[#3B3B58] text-[0.7rem] font-medium px-2.5 py-1 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}
