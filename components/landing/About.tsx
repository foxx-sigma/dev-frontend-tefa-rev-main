"use client";

import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/lib/useScrollReveal";

const checklist = [
  "Dibimbing langsung oleh guru dan mentor industri berpengalaman",
  "Menggunakan workflow ISO dan best practice modern",
  "Harga kompetitif dengan kualitas profesional",
  "3 jurusan berkolaborasi: RPL, TKJ, dan PG",
];

const departments = [
  { label: "RPL", full: "Rekayasa Perangkat Lunak", color: "#C0272D", bgColor: "rgba(192,39,45,0.08)" },
  { label: "TKJ", full: "Teknik Komputer & Jaringan", color: "#1E56A0", bgColor: "rgba(30,86,160,0.08)" },
  { label: "PG", full: "Produksi & Grafika", color: "#6D28D9", bgColor: "rgba(109,40,217,0.08)" },
];

export default function About() {
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal(0.1);

  return (
    <section id="tentang" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left Column */}
          <div ref={leftRef} className="opacity-0 translate-y-6 transition-all duration-700 ease-out">
            <Badge
              variant="secondary"
              className="mb-4 bg-[#FBF7F7] text-[#C0272D] border border-[#C0272D]/20 px-3.5 py-1.5 h-auto text-xs font-semibold tracking-wide uppercase"
            >
              Tentang Kami
            </Badge>
            <h2 className="text-2xl md:text-[2rem] font-bold tracking-[-0.02em] text-[#1C1C2E] mb-5 leading-tight">
              Mengapa memilih{" "}
              <span className="text-[#C0272D]">TEFA SMK Telkom</span>?
            </h2>
            <p className="text-[#3B3B58] leading-relaxed mb-6">
              Teaching Factory adalah model pembelajaran berbasis industri dimana
              siswa mengerjakan proyek nyata dari klien. Kami memastikan standar
              kualitas industri di setiap deliverable.
            </p>

            <div className="space-y-3">
              {checklist.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 min-w-5 mt-0.5 rounded-full bg-[#C0272D] flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-sm text-[#1C1C2E] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Department Cards */}
          <div ref={rightRef} className="flex flex-col gap-4 opacity-0 translate-y-6 transition-all duration-700 ease-out delay-200">
            {departments.map((dept, i) => (
              <div
                key={dept.label}
                className="flex items-center gap-4 bg-white border border-[#E8E6E1] rounded-xl px-6 py-5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-extrabold shrink-0"
                  style={{ backgroundColor: dept.bgColor, color: dept.color }}
                >
                  {dept.label.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-sm" style={{ color: dept.color }}>
                    {dept.label}
                  </div>
                  <div className="text-sm text-[#3B3B58]">{dept.full}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
