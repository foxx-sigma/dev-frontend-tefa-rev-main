import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// ─── Color Tokens ────────────────────────────────────────────────────────────
const C = {
  primary:     "#C0272D",
  primaryDark: "#991B1F",
  tint:        "#FBF7F7",
  heading:     "#1C1C2E",
  body:        "#3B3B58",
  muted:       "#6B6A7A",
  border:      "#E8E6E1",
  surface:     "#F5F4F2",
} as const;

// ─── Static Data ─────────────────────────────────────────────────────────────
const VISI =
  "Menjadi Teaching Factory unggulan yang menghasilkan lulusan kompeten, berkarakter, dan siap bersaing di industri digital global.";

const MISI = [
  "Menyelenggarakan pembelajaran berbasis proyek industri nyata",
  "Membangun kemitraan strategis dengan industri teknologi terkemuka",
  "Mengembangkan kompetensi siswa sesuai standar SKKNI dan industri",
  "Menciptakan ekosistem inovasi dan kewirausahaan digital di sekolah",
];

const STRUKTUR = [
  { name: "Kepala Sekolah", person: "Dr. [Nama]",     dept: null },
  { name: "Kepala TEFA",    person: "[Nama]",          dept: null },
  {
    name: "Kaproli RPL", person: "Pak Firdausa", dept: "RPL" as const,
    email: "ahmad.fauzi@smktelkom-mlg.sch.id",  phone: "6281234567001",
  },
  {
    name: "Kaproli TKJ", person: "Pak Firman",   dept: "TKJ" as const,
    email: "budi.santoso@smktelkom-mlg.sch.id",  phone: "6281234567002",
  },
  {
    name: "Kaproli PG",  person: "Ibu Bias",     dept: "PG" as const,
    email: "sari.dewi@smktelkom-mlg.sch.id",     phone: "6281234567003",
  },
];

const DEPT_COLORS = {
  RPL: { primary: "#C0272D", tint: "#FBF7F7", icon: "💻", fullName: "Rekayasa Perangkat Lunak" },
  TKJ: { primary: "#1A5276", tint: "#EFF6FF", icon: "🔌", fullName: "Teknik Komputer & Jaringan" },
  PG:  { primary: "#5B2C6F", tint: "#F5F3FF", icon: "🎨", fullName: "Produksi Grafika" },
} as const;

type DeptKey = keyof typeof DEPT_COLORS;

const PENCAPAIAN = [
  { tahun: "2024", judul: "Juara 1 LKS Nasional Web Technologies",    kategori: "RPL",     icon: "🏆" },
  { tahun: "2024", judul: "Akreditasi A BAN-SM",                      kategori: "Sekolah", icon: "⭐" },
  { tahun: "2023", judul: "50+ Proyek Industri Diselesaikan",          kategori: "TEFA",    icon: "🚀" },
  { tahun: "2023", judul: "Kemitraan dengan 20+ Perusahaan",           kategori: "Industri",icon: "🤝" },
  { tahun: "2022", judul: "Juara 2 LKS Provinsi Network Systems",     kategori: "TKJ",     icon: "🥈" },
  { tahun: "2022", judul: "Best Creative School Award Jawa Timur",    kategori: "PG",      icon: "🎖️" },
];

const STATS = [
  { value: "50+",  label: "Proyek Diselesaikan" },
  { value: "20+",  label: "Mitra Industri" },
  { value: "3",    label: "Program Keahlian" },
  { value: "500+", label: "Alumni Berkompeten" },
];

// ─── Navbar (dengan active state /tentang) ───────────────────────────────────
function TentangNavbar() {
  const navLinks = [
    { label: "Beranda",    href: "/" },
    { label: "Layanan",    href: "/layanan" },
    { label: "Portofolio", href: "/portofolio" },
    { label: "Tentang",    href: "/tentang" },
    { label: "Kontak",     href: "/contact-supervisor" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl shadow-sm border-b border-[#E8E6E1]">
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
            TEFA <span className="text-[#C0272D]">SMK Telkom Malang</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = link.href === "/tentang";
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 no-underline ${
                  isActive
                    ? "text-[#C0272D] bg-[#FBF7F7] font-semibold"
                    : "text-[#3B3B58] hover:text-[#C0272D] hover:bg-[#FBF7F7]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <Link href="/sign-in" className="hidden md:block">
          <Button
            variant="default"
            className="bg-[#C0272D] hover:bg-[#991B1F] text-white px-5 py-2 h-9 text-sm font-semibold cursor-pointer"
          >
            Masuk
          </Button>
        </Link>
      </div>
    </nav>
  );
}

// ─── Section Badge ────────────────────────────────────────────────────────────
function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase"
      style={{ background: C.tint, color: C.primary, border: `1px solid ${C.border}` }}
    >
      {children}
    </span>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function TentangPage() {
  const topLevel  = STRUKTUR.filter((s) => s.dept === null);
  const kaprolis  = STRUKTUR.filter((s) => s.dept !== null) as (typeof STRUKTUR[number] & { dept: DeptKey; email: string; phone: string })[];

  return (
    <main style={{ background: C.surface, color: C.body }}>
      {/* ① NAVBAR */}
      <TentangNavbar />

      {/* ② PAGE HEADER */}
      <section
        className="py-20 text-center relative overflow-hidden"
        style={{ background: C.heading }}
      >
        {/* Decorative radial blobs */}
        <div
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: `${C.primary}14` }}
        />
        <div
          className="absolute -bottom-16 right-10 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: `${C.primary}0A` }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <p className="text-white/50 text-sm mb-4">
            <Link href="/" className="hover:text-white/80 no-underline transition-colors">
              Beranda
            </Link>
            {" / "}
            <span>Tentang Kami</span>
          </p>

          {/* Badge */}
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold text-white border border-white/20 bg-white/10 mb-6">
            Tentang Kami
          </span>

          {/* H1 */}
          <h1 className="text-white font-bold text-4xl md:text-5xl leading-tight">
            Mengenal TEFA{" "}
            <span style={{ color: C.primary }}>SMK Telkom Malang</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/70 max-w-xl mx-auto leading-7 mt-4 text-base">
            Program Teaching Factory yang menghubungkan dunia pendidikan vokasi
            dengan kebutuhan nyata industri digital Indonesia.
          </p>
        </div>
      </section>

      {/* ③ PROFIL SINGKAT */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Kiri — teks */}
            <div>
              <SectionBadge>Profil Sekolah</SectionBadge>
              <h2
                className="text-3xl font-bold mt-4 mb-6 leading-snug"
                style={{ color: C.heading }}
              >
                Pusat Inovasi Digital<br />Vokasi Jawa Timur
              </h2>

              <div
                className="space-y-4 text-base leading-7"
                style={{ color: C.body }}
              >
                <p>
                  TEFA SMK Telkom Malang adalah program unggulan Teaching Factory
                  yang beroperasi selayaknya perusahaan teknologi sungguhan di
                  dalam lingkungan sekolah. Siswa mengerjakan proyek nyata dari
                  klien industri dengan standar profesional.
                </p>
                <p>
                  Didukung oleh kurikulum berbasis SKKNI dan mentor berpengalaman
                  dari industri, setiap jurusan — RPL, TKJ, dan PG — memiliki
                  unit produksi yang aktif menghasilkan produk dan layanan digital
                  berkualitas tinggi.
                </p>
                <p>
                  Lebih dari sekadar sekolah, TEFA adalah inkubator talenta digital
                  yang telah melahirkan ratusan alumni kompeten dan siap kerja di
                  ekosistem teknologi nasional maupun global.
                </p>
              </div>

              {/* Key Stats 2×2 */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl p-4"
                    style={{ background: C.surface }}
                  >
                    <p
                      className="text-3xl font-extrabold leading-none"
                      style={{ color: C.primary }}
                    >
                      {s.value}
                    </p>
                    <p
                      className="text-xs mt-1 font-medium"
                      style={{ color: C.muted }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kanan — dept cards */}
            <div
              className="rounded-2xl p-8 space-y-4"
              style={{ background: C.surface }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: C.muted }}
              >
                Program Keahlian
              </p>
              {(Object.entries(DEPT_COLORS) as [DeptKey, typeof DEPT_COLORS[DeptKey]][]).map(
                ([key, val]) => (
                  <div
                    key={key}
                    className="bg-white rounded-xl p-5 flex items-center gap-4"
                    style={{ borderLeft: `4px solid ${val.primary}` }}
                  >
                    <span className="text-2xl">{val.icon}</span>
                    <div>
                      <p
                        className="font-bold text-sm"
                        style={{ color: C.heading }}
                      >
                        {key}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: C.muted }}
                      >
                        {val.fullName}
                      </p>
                    </div>
                  </div>
                )
              )}

              {/* Accreditation badge */}
              <div
                className="mt-4 rounded-xl p-5 flex items-center gap-4 border"
                style={{ background: C.tint, borderColor: C.border }}
              >
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="font-bold text-sm" style={{ color: C.heading }}>
                    Akreditasi A
                  </p>
                  <p className="text-xs" style={{ color: C.muted }}>
                    BAN-SM · 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ④ VISI & MISI */}
      <section className="py-20" style={{ background: C.surface }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionBadge>Visi & Misi</SectionBadge>
            <h2
              className="text-3xl font-bold mt-4"
              style={{ color: C.heading }}
            >
              Arah & Tujuan Kami
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Visi Card */}
            <div
              className="rounded-2xl p-10 border relative overflow-hidden"
              style={{ background: "#FFFFFF", borderColor: C.border }}
            >
              <SectionBadge>Visi</SectionBadge>
              {/* Ornamental quote */}
              <div
                className="text-8xl font-serif leading-none select-none pointer-events-none absolute top-6 right-8"
                style={{ color: C.primary, opacity: 0.12 }}
              >
                &ldquo;
              </div>
              <p
                className="text-xl font-bold leading-8 mt-6 relative z-10"
                style={{ color: C.heading }}
              >
                {VISI}
              </p>
            </div>

            {/* Misi Card */}
            <div
              className="rounded-2xl p-10 border"
              style={{ background: "#FFFFFF", borderColor: C.border }}
            >
              <SectionBadge>Misi</SectionBadge>
              <ol className="mt-6 space-y-5">
                {MISI.map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span
                      className="w-7 h-7 rounded-full text-white text-sm font-bold flex items-center justify-center flex-shrink-0"
                      style={{ background: C.primary }}
                    >
                      {idx + 1}
                    </span>
                    <span
                      className="leading-6 text-sm pt-0.5"
                      style={{ color: C.body }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ⑤ STRUKTUR ORGANISASI */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <SectionBadge>Struktur Organisasi</SectionBadge>
            <h2
              className="text-3xl font-bold mt-4"
              style={{ color: C.heading }}
            >
              Tim Penggerak TEFA
            </h2>
            <p
              className="mt-3 text-sm max-w-lg mx-auto leading-6"
              style={{ color: C.muted }}
            >
              Dipimpin oleh tenaga pendidik berpengalaman yang berkomitmen
              menghadirkan pendidikan vokasi berkelas industri.
            </p>
          </div>

          {/* Top Level */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {topLevel.map((s) => (
              <div
                key={s.name}
                className="rounded-xl p-6 text-center w-52"
                style={{ background: C.surface }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3"
                  style={{ background: C.heading }}
                >
                  {s.person.replace("Dr. ", "").replace("[", "").replace("]", "")[0]}
                </div>
                <p className="text-xs font-medium mb-1" style={{ color: C.muted }}>
                  {s.name}
                </p>
                <p className="font-semibold text-sm" style={{ color: C.heading }}>
                  {s.person}
                </p>
              </div>
            ))}
          </div>

          {/* Connector line */}
          <div
            className="h-8 w-0.5 mx-auto mb-8"
            style={{ background: C.border }}
          />

          {/* Kaproli grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {kaprolis.map((s) => {
              const dc = DEPT_COLORS[s.dept];
              return (
                <div
                  key={s.name}
                  className="bg-white rounded-xl p-6 relative border border-[#E8E6E1]"
                  style={{ borderTop: `4px solid ${dc.primary}` }}
                >
                  {/* Dept badge */}
                  <span
                    className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{ background: dc.tint, color: dc.primary }}
                  >
                    {s.dept}
                  </span>

                  <div className="text-3xl mb-3">{dc.icon}</div>
                  <p className="text-xs font-medium" style={{ color: C.muted }}>
                    {s.name}
                  </p>
                  <p
                    className="font-bold text-lg mt-0.5 mb-2"
                    style={{ color: C.heading }}
                  >
                    {s.person}
                  </p>
                  <p
                    className="text-xs truncate mb-4"
                    style={{ color: C.muted }}
                  >
                    {s.email}
                  </p>

                  <div className="flex gap-2">
                    <a
                      href={`https://wa.me/${s.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg font-semibold text-center transition-colors no-underline"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={`mailto:${s.email}`}
                      className="flex-1 text-xs px-3 py-1.5 rounded-lg font-semibold text-center transition-colors no-underline border"
                      style={{
                        borderColor: C.border,
                        color: C.body,
                        background: "transparent",
                      }}
                    >
                      Email
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ⑥ AKREDITASI & PENCAPAIAN — Timeline */}
      <section className="py-20" style={{ background: C.surface }}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <SectionBadge>Akreditasi & Pencapaian</SectionBadge>
            <h2
              className="text-3xl font-bold mt-4"
              style={{ color: C.heading }}
            >
              Rekam Jejak Prestasi
            </h2>
            <p
              className="mt-3 text-sm max-w-lg mx-auto leading-6"
              style={{ color: C.muted }}
            >
              Pencapaian nyata yang membuktikan kualitas pendidikan vokasi kami
              di tingkat nasional dan regional.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-0.5 top-0 bottom-0"
              style={{ background: C.border }}
            />

            <div className="space-y-10">
              {PENCAPAIAN.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`relative flex items-center ${
                      isLeft ? "justify-start" : "justify-end"
                    }`}
                  >
                    {/* Center dot */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white z-10"
                      style={{ background: C.primary }}
                    />

                    {/* Card */}
                    <div
                      className="w-5/12 bg-white rounded-xl border p-6"
                      style={{ borderColor: C.border }}
                    >
                      <div className="text-2xl mb-3">{item.icon}</div>
                      <span
                        className="inline-block text-white text-xs px-2.5 py-1 rounded-full font-semibold mb-2"
                        style={{ background: C.heading }}
                      >
                        {item.tahun}
                      </span>
                      <p
                        className="font-semibold text-sm leading-snug mt-2"
                        style={{ color: C.heading }}
                      >
                        {item.judul}
                      </p>
                      <span
                        className="inline-block mt-3 text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: C.surface, color: C.muted }}
                      >
                        {item.kategori}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ⑦ CTA BANNER */}
      <section className="pb-20" style={{ background: C.surface }}>
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="rounded-2xl p-12 text-center relative overflow-hidden"
            style={{ background: C.heading }}
          >
            {/* Decorative blobs */}
            <div
              className="absolute -top-10 -right-10 w-44 h-44 rounded-full pointer-events-none"
              style={{ background: `${C.primary}14` }}
            />
            <div
              className="absolute -bottom-8 left-[30%] w-32 h-32 rounded-full pointer-events-none"
              style={{ background: `${C.primary}0A` }}
            />

            <div className="relative z-10">
              <p
                className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold text-white border border-white/20 bg-white/10 mb-4"
              >
                Kolaborasi
              </p>
              <h3 className="text-white font-bold text-2xl md:text-3xl mb-3">
                Tertarik berkolaborasi dengan kami?
              </h3>
              <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed mb-8">
                Jadilah bagian dari ekosistem inovasi digital bersama TEFA SMK
                Telkom Malang. Kami terbuka untuk kemitraan proyek dan program
                magang industri.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/layanan">
                  <Button
                    variant="default"
                    className="bg-white text-[#1C1C2E] hover:bg-white/90 font-bold px-7 h-11 text-sm cursor-pointer"
                  >
                    Lihat Layanan
                  </Button>
                </Link>
                <Link href="/contact-supervisor">
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 font-bold px-7 h-11 text-sm cursor-pointer bg-transparent"
                  >
                    Hubungi Supervisor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⑧ FOOTER */}
      <footer className="bg-[#0d1117] py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
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
                  TEFA <span style={{ color: C.primary }}>SMK Telkom Malang</span>
                </span>
                <p className="text-[#6B7280] text-xs mt-0.5">
                  Teaching Factory — Bridging Education &amp; Industry
                </p>
              </div>
            </div>
            <p className="text-[#6B7280] text-xs">
              © {new Date().getFullYear()} TEFA SMK Telkom Malang. All rights reserved.
            </p>
          </div>

          <Separator className="my-6 bg-white/10" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
            <div className="flex gap-6">
              <Link href="/" className="hover:text-white transition-colors no-underline">Beranda</Link>
              <Link href="/layanan" className="hover:text-white transition-colors no-underline">Layanan</Link>
              <Link href="/portofolio" className="hover:text-white transition-colors no-underline">Portofolio</Link>
              <Link href="/tentang" className="text-white no-underline">Tentang</Link>
              <Link href="/contact-supervisor" className="hover:text-white transition-colors no-underline">Kontak</Link>
            </div>
            <p>SMK Telkom Malang, Jl. Danau Ranau, Sawojajar, Malang</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
