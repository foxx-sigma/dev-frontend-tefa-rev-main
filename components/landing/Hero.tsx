import { Badge } from "@/components/ui/badge";

const stats = [
  { value: "50+", label: "Proyek Selesai" },
  { value: "20+", label: "Mitra Industri" },
  { value: "3", label: "Jurusan Aktif" },
];

export default function Hero() {
  return (
    <section id="beranda" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left Column */}
        <div className="animate-fade-in [animation:fadeInLeft_0.7s_cubic-bezier(0.22,1,0.36,1)_both] [&]:[--tw-enter-translate-x:-24px]">
          <Badge
            variant="secondary"
            className="mb-5 bg-[#FBF7F7] text-[#C0272D] border border-[#C0272D]/20 px-3.5 py-1.5 h-auto text-xs font-semibold tracking-wide uppercase gap-2"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="shrink-0"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            Teaching Factory
          </Badge>

          <h1 className="text-3xl md:text-[2.75rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-[#1C1C2E] mb-4">
            Menjembatani{" "}
            <span className="text-[#C0272D]">Pendidikan</span>{" "}
            dan Industri Melalui{" "}
            <span className="text-[#C0272D]">Proyek Nyata</span>
          </h1>

          <p className="text-[#3B3B58] leading-relaxed mb-8 max-w-lg text-[0.95rem]">
            TEFA SMK Telkom Malang menghubungkan pembelajaran vokasi dengan
            pengalaman kerja nyata. Kami mengerjakan proyek industri di bidang
            software, jaringan, dan multimedia.
          </p>

          {/* Stat Chips */}
          <div className="flex flex-wrap gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2.5 bg-[#F5F4F2] border border-[#E8E6E1] rounded-xl px-4 py-2.5"
              >
                <span className="text-xl font-extrabold tracking-tight text-[#1C1C2E]">
                  {s.value}
                </span>
                <span className="text-xs font-medium text-[#3B3B58]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column — Hero Image Placeholder */}
        <div className="relative animate-fade-in [animation:fadeInRight_0.7s_cubic-bezier(0.22,1,0.36,1)_0.2s_both]">
          <div className="rounded-2xl overflow-hidden bg-[#F5F4F2] border border-[#E8E6E1] aspect-[4/3] flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-[#FBF7F7] via-white to-[#F5F4F2] flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-[#C0272D]/10 flex items-center justify-center">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C0272D"
                  strokeWidth="1.5"
                  className="opacity-60"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-sm font-medium text-[#3B3B58]/50">
                Hero Image
              </span>
            </div>
          </div>

          {/* Floating Accreditation Badge */}
          <div className="absolute -bottom-4 -left-4 md:-left-6 bg-white rounded-xl px-5 py-3.5 shadow-md border border-[#E8E6E1] animate-bounce [animation:float_3s_ease-in-out_infinite]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#C0272D]/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C0272D" strokeWidth="2">
                  <path d="M12 15l-3 3 1-4-3-3h4L12 7l1 4h4l-3 3 1 4z" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-[#1C1C2E]">Akreditasi A</div>
                <div className="text-xs text-[#3B3B58]">BAN-SM Certified</div>
              </div>
            </div>
          </div>

          {/* Floating Industry Badge */}
          <div className="absolute -top-3 -right-3 md:-right-5 bg-white rounded-xl px-4 py-3 shadow-md border border-[#E8E6E1] animate-bounce [animation:float_3s_ease-in-out_1.5s_infinite]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1E56A0]/10 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E56A0" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-bold text-[#1C1C2E]">Industry Standard</div>
                <div className="text-[0.65rem] text-[#3B3B58]">ISO Workflow</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline keyframes for this component */}
      <style>{`
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-24px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      `}</style>
    </section>
  );
}
