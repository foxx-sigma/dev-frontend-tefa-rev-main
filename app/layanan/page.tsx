"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

const DEPT_COLORS = {
  RPL: { bg: "#FBF7F7", text: "#C0272D", border: "#C0272D" },
  TKJ: { bg: "#EFF6FF", text: "#1A5276", border: "#1A5276" },
  PG:  { bg: "#F5F3FF", text: "#5B2C6F", border: "#5B2C6F" },
} as const;

type DeptKey = keyof typeof DEPT_COLORS;

// ─── Service Interface ───────────────────────────────────────────────────────
interface Service {
  id: string;
  title: string;
  description: string;
  department: DeptKey;
  icon?: string;
  features?: string[];
}

// ─── Fallback Data ───────────────────────────────────────────────────────────
const FALLBACK_SERVICES: Service[] = [
  {
    id: "1", title: "Software Development", department: "RPL",
    description: "Pengembangan web & mobile app berstandar industri menggunakan teknologi modern.",
    features: ["Next.js / React", "REST API & NestJS", "Database PostgreSQL"],
  },
  {
    id: "2", title: "UI/UX Design", department: "RPL",
    description: "Riset pengguna, wireframing, dan desain antarmuka yang intuitif.",
    features: ["Figma Prototyping", "User Research", "Design System"],
  },
  {
    id: "3", title: "Network & Infrastructure", department: "TKJ",
    description: "Instalasi, konfigurasi, dan pemeliharaan jaringan enterprise.",
    features: ["Cisco Networking", "Server Setup", "Monitoring"],
  },
  {
    id: "4", title: "Server & Cloud", department: "TKJ",
    description: "Setup server dan deployment cloud untuk kebutuhan produksi.",
    features: ["Linux Server", "Docker", "CI/CD Pipeline"],
  },
  {
    id: "5", title: "Multimedia & Photography", department: "PG",
    description: "Foto produk profesional dan dokumentasi event berkualitas.",
    features: ["Product Photography", "Event Coverage", "Photo Editing"],
  },
  {
    id: "6", title: "Video Production", department: "PG",
    description: "Video promosi, company profile, dan konten media sosial.",
    features: ["Video Shooting", "After Effects", "Color Grading"],
  },
];

// ─── Map backend tefa name → local DeptKey ───────────────────────────────────
function mapTefaToDept(tefaName: string): DeptKey {
  const n = tefaName.toUpperCase();
  if (n.includes("RPL")) return "RPL";
  if (n.includes("TKJ")) return "TKJ";
  // Broadcasting / Produksi Grafika / PG
  return "PG";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapApiToServices(data: any[]): Service[] {
  return data.map((p) => {
    const dept: DeptKey =
      p.tefa && p.tefa.length > 0
        ? mapTefaToDept(p.tefa[0]?.tefa?.name ?? "PG")
        : "RPL";

    return {
      id: p.uuid ?? p.id ?? String(Math.random()),
      title: p.name ?? "Layanan",
      description: p.description ?? "",
      department: dept,
      icon: undefined,
      features: undefined,
    };
  });
}

// ─── Filter Tabs ─────────────────────────────────────────────────────────────
const TABS = ["Semua", "RPL", "TKJ", "PG"] as const;
type TabKey = (typeof TABS)[number];

// ─── Navbar ──────────────────────────────────────────────────────────────────
function LayananNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Beranda",    href: "/" },
    { label: "Layanan",    href: "/layanan" },
    { label: "Portofolio", href: "/portofolio" },
    { label: "Tentang",    href: "/tentang" },
    { label: "Kontak",     href: "/contact-supervisor" },
  ];

  return (
    <nav
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
            TEFA <span className="text-[#C0272D]">SMK Telkom Malang</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = link.href === "/layanan";
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
          {navLinks.map((link) => {
            const isActive = link.href === "/layanan";
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-colors no-underline ${
                  isActive
                    ? "text-[#C0272D] bg-[#FBF7F7] font-semibold"
                    : "text-[#3B3B58] hover:text-[#C0272D] hover:bg-[#FBF7F7]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
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

// ─── Skeleton Card ───────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-xl h-72 animate-pulse" style={{ background: C.surface }}>
      <div className="p-8 space-y-4">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-xl bg-[#E8E6E1]" />
          <div className="w-14 h-6 rounded-full bg-[#E8E6E1]" />
        </div>
        <div className="space-y-2 mt-6">
          <div className="h-5 bg-[#E8E6E1] rounded w-3/4" />
          <div className="h-4 bg-[#E8E6E1] rounded w-full" />
          <div className="h-4 bg-[#E8E6E1] rounded w-2/3" />
        </div>
        <div className="space-y-2 mt-4">
          <div className="h-3 bg-[#E8E6E1] rounded w-1/2" />
          <div className="h-3 bg-[#E8E6E1] rounded w-2/5" />
          <div className="h-3 bg-[#E8E6E1] rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}

// ─── Checkmark SVG ───────────────────────────────────────────────────────────
function CheckCircle() {
  return (
    <span
      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ background: C.primary }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

// ─── Default Icon for services from API ──────────────────────────────────────
const DEPT_ICONS: Record<DeptKey, string> = {
  RPL: "💻",
  TKJ: "🔌",
  PG:  "🎨",
};

// ─── Page Component ──────────────────────────────────────────────────────────
export default function LayananPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("Semua");
  const [usingFallback, setUsingFallback] = useState(false);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    setUsingFallback(false);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${baseUrl}/product`);

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const json = await res.json();

      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setServices(mapApiToServices(json.data));
      } else {
        // API returned empty data → use fallback
        setServices(FALLBACK_SERVICES);
        setUsingFallback(true);
      }
    } catch {
      // Network error or API unavailable → use fallback
      setServices(FALLBACK_SERVICES);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const filtered =
    activeTab === "Semua"
      ? services
      : services.filter((s) => s.department === activeTab);

  return (
    <main style={{ background: C.surface, color: C.body }}>
      {/* ① NAVBAR */}
      <LayananNavbar />

      {/* ② PAGE HEADER */}
      <section className="py-16 text-center bg-white">
        <div className="max-w-3xl mx-auto px-6">

          {/* Badge */}
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-5"
            style={{ background: C.tint, color: C.primary, border: `1px solid ${C.border}` }}
          >
            Layanan Kami
          </span>

          {/* H1 */}
          <h1
            className="font-bold text-3xl md:text-4xl leading-tight"
            style={{ color: C.heading }}
          >
            Layanan TEFA{" "}
            <span style={{ color: C.primary }}>SMK Telkom Malang</span>
          </h1>

          {/* Subtitle */}
          <p
            className="max-w-xl mx-auto leading-7 mt-4 text-base"
            style={{ color: C.muted }}
          >
            Solusi teknologi profesional yang dikerjakan oleh siswa-siswi
            kompeten di bawah bimbingan tenaga pendidik berpengalaman.
          </p>
        </div>
      </section>

      {/* ③ FILTER TABS */}
      <div
        className="bg-white border-b sticky top-16 z-40"
        style={{ borderColor: C.border }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-0">
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              const deptColor = tab !== "Semua" ? DEPT_COLORS[tab as DeptKey] : null;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3.5 text-sm font-medium transition-colors duration-200 border-b-2 cursor-pointer bg-transparent whitespace-nowrap ${
                    isActive
                      ? "font-semibold"
                      : "border-transparent hover:text-[#C0272D]"
                  }`}
                  style={
                    isActive
                      ? {
                          color: deptColor ? deptColor.text : C.primary,
                          borderBottomColor: deptColor ? deptColor.border : C.primary,
                        }
                      : { color: C.muted }
                  }
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ④ SERVICES GRID */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Fallback notice */}
          {usingFallback && !loading && (
            <div
              className="mb-8 rounded-xl p-4 border flex items-center gap-3 text-sm"
              style={{ background: "#FFFBEB", borderColor: "#FDE68A", color: "#92400E" }}
            >
              <span className="text-lg">ℹ️</span>
              <p>
                Menampilkan data layanan contoh. Hubungkan backend API untuk
                melihat data terbaru.
              </p>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Error with retry */}
          {error && !loading && (
            <div
              className="rounded-xl border p-6 text-center"
              style={{ background: "#FEF2F2", borderColor: "#FECACA" }}
            >
              <p className="text-sm font-medium mb-3" style={{ color: "#991B1B" }}>
                {error}
              </p>
              <Button
                variant="outline"
                onClick={fetchServices}
                className="text-sm border-[#C0272D] text-[#C0272D] hover:bg-[#FBF7F7] cursor-pointer"
              >
                Coba Lagi
              </Button>
            </div>
          )}

          {/* Cards */}
          {!loading && !error && (
            <>
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-5xl mb-4">📭</p>
                  <p className="font-semibold text-lg" style={{ color: C.heading }}>
                    Belum ada layanan
                  </p>
                  <p className="text-sm mt-1" style={{ color: C.muted }}>
                    Layanan untuk departemen ini belum tersedia.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((service) => {
                    const dc = DEPT_COLORS[service.department];
                    return (
                      <div
                        key={service.id}
                        className="bg-white rounded-xl border p-8 hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col"
                        style={{ borderColor: C.border }}
                      >
                        {/* Top row */}
                        <div className="flex items-start justify-between">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                            style={{ background: C.surface }}
                          >
                            {service.icon ?? DEPT_ICONS[service.department]}
                          </div>
                          <span
                            className="px-2.5 py-1 rounded-full text-xs font-bold"
                            style={{
                              background: dc.bg,
                              color: dc.text,
                              border: `1px solid ${dc.border}20`,
                            }}
                          >
                            {service.department}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          className="font-bold text-base mt-5 mb-2 leading-snug"
                          style={{ color: C.heading }}
                        >
                          {service.title}
                        </h3>

                        {/* Description */}
                        <p
                          className="text-sm leading-6 mb-5"
                          style={{ color: C.muted }}
                        >
                          {service.description}
                        </p>

                        {/* Features */}
                        {service.features && service.features.length > 0 && (
                          <ul className="space-y-2.5 mb-6">
                            {service.features.map((f, i) => (
                              <li
                                key={i}
                                className="flex items-center gap-2"
                              >
                                <CheckCircle />
                                <span
                                  className="text-xs"
                                  style={{ color: C.body }}
                                >
                                  {f}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Spacer */}
                        <div className="flex-1" />

                        {/* CTA */}
                        <button
                          onClick={() => router.push("/#kontak")}
                          className="w-full mt-2 text-sm font-semibold px-4 py-2.5 rounded-lg border transition-colors duration-200 cursor-pointer bg-transparent"
                          style={{
                            borderColor: C.primary,
                            color: C.primary,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = C.tint;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          Hubungi Kami
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ⑤ CTA BANNER */}
      <section style={{ background: C.surface }} className="pb-20">
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
              <h2 className="text-white font-bold text-2xl md:text-3xl mb-2">
                Butuh solusi teknologi untuk bisnis Anda?
              </h2>
              <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed mt-2 mb-8">
                Konsultasikan kebutuhan proyek Anda secara gratis bersama tim
                supervisor TEFA SMK Telkom Malang.
              </p>
              <Link href="/contact-supervisor">
                <Button
                  variant="default"
                  className="bg-[#C0272D] hover:bg-[#991B1F] text-white font-bold px-8 h-11 text-sm cursor-pointer gap-2"
                >
                  Konsultasi Gratis
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ⑥ FOOTER */}
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
                  TEFA{" "}
                  <span style={{ color: C.primary }}>SMK Telkom Malang</span>
                </span>
                <p className="text-[#6B7280] text-xs mt-0.5">
                  Teaching Factory — Bridging Education &amp; Industry
                </p>
              </div>
            </div>
            <p className="text-[#6B7280] text-xs">
              © {new Date().getFullYear()} TEFA SMK Telkom Malang. All rights
              reserved.
            </p>
          </div>

          <Separator className="my-6 bg-white/10" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
            <div className="flex gap-6">
              <Link href="/" className="hover:text-white transition-colors no-underline">
                Beranda
              </Link>
              <Link href="/layanan" className="text-white no-underline">
                Layanan
              </Link>
              <Link href="/portofolio" className="hover:text-white transition-colors no-underline">
                Portofolio
              </Link>
              <Link href="/tentang" className="hover:text-white transition-colors no-underline">
                Tentang
              </Link>
              <Link href="/contact-supervisor" className="hover:text-white transition-colors no-underline">
                Kontak
              </Link>
            </div>
            <p>SMK Telkom Malang, Jl. Danau Ranau, Sawojajar, Malang</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
