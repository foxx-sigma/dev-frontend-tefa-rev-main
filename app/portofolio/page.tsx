"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  RPL: { bg: "#FBF7F7", text: "#C0272D" },
  TKJ: { bg: "#EFF6FF", text: "#1A5276" },
  PG:  { bg: "#F5F3FF", text: "#5B2C6F" },
} as const;

type DeptKey = keyof typeof DEPT_COLORS;

// ─── Project Interface ───────────────────────────────────────────────────────
interface Project {
  id: string;
  title: string;
  description: string;
  department: "RPL" | "TKJ" | "PG";
  thumbnail?: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
  testimonial?: {
    name: string;
    role: string;
    company: string;
    quote: string;
  };
  completedAt?: string;
  client?: string;
}

// ─── Fallback Data ───────────────────────────────────────────────────────────
const FALLBACK: Project[] = [
  {
    id: "1", title: "E-Commerce Platform", department: "RPL",
    description: "Platform belanja online untuk UMKM lokal.",
    techStack: ["Next.js", "NestJS", "PostgreSQL", "Midtrans"],
    demoUrl: "#", repoUrl: "#", client: "CV Maju Jaya",
    testimonial: { name: "Budi Santoso", role: "Owner", company: "CV Maju Jaya",
      quote: "Sangat profesional dan hasilnya melebihi ekspektasi kami." },
  },
  {
    id: "2", title: "Sistem Absensi Digital", department: "RPL",
    description: "Aplikasi absensi berbasis QR code untuk instansi.",
    techStack: ["React", "Express", "MySQL", "Socket.io"],
    demoUrl: "#", repoUrl: "#",
  },
  {
    id: "3", title: "Network Monitoring Dashboard", department: "TKJ",
    description: "Dashboard real-time monitoring infrastruktur jaringan.",
    techStack: ["Grafana", "Prometheus", "Linux", "SNMP"],
    demoUrl: "#", client: "Dinas Kominfo",
    testimonial: { name: "Ir. Hendra", role: "Kepala Dinas", company: "Kominfo Kota",
      quote: "Dashboard ini sangat membantu tim kami memantau jaringan 24/7." },
  },
  {
    id: "4", title: "Server Virtualisasi Lab", department: "TKJ",
    description: "Setup virtualisasi server untuk laboratorium komputer.",
    techStack: ["Proxmox", "VMware", "Ubuntu Server", "pfSense"],
  },
  {
    id: "5", title: "Company Profile Video", department: "PG",
    description: "Video company profile profesional untuk klien UMKM.",
    techStack: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    client: "PT Sinar Abadi",
    testimonial: { name: "Rina Wulandari", role: "Marketing Manager",
      company: "PT Sinar Abadi",
      quote: "Video-nya keren banget, engagement sosmed kami naik 3x lipat!" },
  },
  {
    id: "6", title: "Branding & Visual Identity", department: "PG",
    description: "Desain logo, brand guideline, dan materi promosi.",
    techStack: ["Illustrator", "Photoshop", "Figma"],
  },
];

// ─── Filter Tabs ─────────────────────────────────────────────────────────────
const TABS = ["Semua", "RPL", "TKJ", "PG"] as const;
type TabKey = (typeof TABS)[number];

// ─── Dept gradient backgrounds for thumbnails ────────────────────────────────
const DEPT_GRADIENTS: Record<DeptKey, string> = {
  RPL: "linear-gradient(135deg, #FBF7F7, #FEE2E2)",
  TKJ: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
  PG:  "linear-gradient(135deg, #F5F3FF, #EDE9FE)",
};

// ─── Dept SVG icons for thumbnail placeholder ────────────────────────────────
function DeptIcon({ dept, size = 48 }: { dept: DeptKey; size?: number }) {
  const color = DEPT_COLORS[dept].text;
  if (dept === "RPL") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8l3 3-3 3M12 14h4" />
      </svg>
    );
  }
  if (dept === "TKJ") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    );
  }
  // PG
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11v8a1 1 0 001 1h14a1 1 0 001-1v-8" />
      <path d="M4 11l4-7h8l4 7" />
      <circle cx="12" cy="15" r="2" />
      <path d="M14 15l4-4" />
    </svg>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function PortofolioNavbar() {
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
            const isActive = link.href === "/portofolio";
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
            const isActive = link.href === "/portofolio";
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
    <div className="bg-white rounded-xl overflow-hidden border border-[#E8E6E1] animate-pulse">
      <div className="h-48" style={{ background: C.surface }} />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-[#E8E6E1] rounded w-1/3" />
        <div className="h-5 bg-[#E8E6E1] rounded w-3/4" />
        <div className="h-4 bg-[#E8E6E1] rounded w-full" />
        <div className="h-4 bg-[#E8E6E1] rounded w-2/3" />
        <div className="flex gap-1.5 mt-2">
          <div className="h-6 bg-[#E8E6E1] rounded-md w-16" />
          <div className="h-6 bg-[#E8E6E1] rounded-md w-14" />
          <div className="h-6 bg-[#E8E6E1] rounded-md w-18" />
        </div>
      </div>
      <div className="border-t border-[#E8E6E1] px-5 py-3 flex justify-between">
        <div className="h-4 bg-[#E8E6E1] rounded w-24" />
        <div className="h-4 bg-[#E8E6E1] rounded w-20" />
      </div>
    </div>
  );
}

// ─── Search Icon SVG ─────────────────────────────────────────────────────────
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

// ─── Quote Icon SVG ──────────────────────────────────────────────────────────
function QuoteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={C.muted} opacity={0.6}>
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.7 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.332-.547-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.7 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.332-.547-2.917-1.179z" />
    </svg>
  );
}

// ─── Empty State SVG ─────────────────────────────────────────────────────────
function EmptyFolderSVG() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="24" width="60" height="42" rx="4" fill="#E8E6E1" />
      <path d="M10 28C10 25.7909 11.7909 24 14 24H30L35 18H66C68.2091 18 70 19.7909 70 22V24H10V28Z" fill="#D5D3CE" />
      <rect x="24" y="38" width="32" height="3" rx="1.5" fill="#B8B6B0" />
      <rect x="30" y="46" width="20" height="3" rx="1.5" fill="#B8B6B0" />
    </svg>
  );
}

// ─── Page Component ──────────────────────────────────────────────────────────
export default function PortofolioPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>("Semua");
  const [search, setSearch] = useState("");
  const [usingFallback, setUsingFallback] = useState(false);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setUsingFallback(false);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${baseUrl}/portfolio`);

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const json = await res.json();

      if (Array.isArray(json.data) && json.data.length > 0) {
        setProjects(json.data);
      } else if (Array.isArray(json) && json.length > 0) {
        setProjects(json);
      } else {
        setProjects(FALLBACK);
        setUsingFallback(true);
      }
    } catch {
      setProjects(FALLBACK);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // ── Derived data ───────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = projects;
    if (activeTab !== "Semua") {
      result = result.filter((p) => p.department === activeTab);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }
    return result;
  }, [projects, activeTab, search]);

  const stats = useMemo(() => ({
    total: projects.length,
    RPL: projects.filter((p) => p.department === "RPL").length,
    TKJ: projects.filter((p) => p.department === "TKJ").length,
    PG:  projects.filter((p) => p.department === "PG").length,
  }), [projects]);

  return (
    <main style={{ background: C.surface, color: C.body }}>
      {/* 1 ── NAVBAR */}
      <PortofolioNavbar />

      {/* 2 ── PAGE HEADER */}
      <section className="py-16 text-center bg-white">
        <div className="max-w-3xl mx-auto px-6">

          {/* Badge */}
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-5"
            style={{ background: C.tint, color: C.primary, border: `1px solid ${C.border}` }}
          >
            Portofolio Kami
          </span>

          {/* H1 */}
          <h1
            className="font-bold text-3xl md:text-4xl leading-tight"
            style={{ color: C.heading }}
          >
            Hasil Karya{" "}
            <span style={{ color: C.primary }}>Siswa Siswi SMK Telkom Malang</span>
          </h1>

          {/* Subtitle */}
          <p
            className="max-w-xl mx-auto leading-7 mt-4 text-base"
            style={{ color: C.muted }}
          >
            Koleksi proyek nyata yang telah diselesaikan oleh tim siswa-siswi
            kompeten dari berbagai jurusan.
          </p>

          {/* Stat Row */}
          {!loading && (
            <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
              {[
                { label: "Total Project", value: stats.total },
                { label: "RPL",           value: stats.RPL, color: DEPT_COLORS.RPL.text },
                { label: "TKJ",           value: stats.TKJ, color: DEPT_COLORS.TKJ.text },
                { label: "PG",            value: stats.PG,  color: DEPT_COLORS.PG.text },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p
                    className="text-2xl font-bold"
                    style={{ color: s.color || C.heading }}
                  >
                    {s.value}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: C.muted }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3 ── FILTER BAR */}
      <div
        className="bg-white border-b sticky top-16 z-40"
        style={{ borderColor: C.border }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between gap-4 py-0">
            {/* Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto">
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
                            borderBottomColor: deptColor ? deptColor.text : C.primary,
                          }
                        : { color: C.muted }
                    }
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Search + count */}
            <div className="hidden sm:flex items-center gap-3">
              <p className="text-sm whitespace-nowrap" style={{ color: C.muted }}>
                {filtered.length} project ditemukan
              </p>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <SearchIcon />
                </span>
                <Input
                  placeholder="Cari project..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 w-48 h-9 text-sm border-[#E8E6E1] bg-[#F5F4F2] focus-visible:ring-[#C0272D]/20 focus-visible:border-[#C0272D]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search (below filter bar) */}
      <div className="sm:hidden bg-white px-6 pb-3 border-b" style={{ borderColor: C.border }}>
        <div className="relative">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <SearchIcon />
          </span>
          <Input
            placeholder="Cari project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 w-full h-9 text-sm border-[#E8E6E1] bg-[#F5F4F2] focus-visible:ring-[#C0272D]/20 focus-visible:border-[#C0272D]"
          />
        </div>
        <p className="text-xs mt-2" style={{ color: C.muted }}>
          {filtered.length} project ditemukan
        </p>
      </div>

      {/* 4 ── PROJECT GRID */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Fallback notice */}
          {usingFallback && !loading && (
            <div
              className="mb-8 rounded-xl p-4 border flex items-center gap-3 text-sm"
              style={{ background: "#FFFBEB", borderColor: "#FDE68A", color: "#92400E" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
              <p>
                Menampilkan data portofolio contoh. Hubungkan backend API untuk
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

          {/* Cards */}
          {!loading && (
            <>
              {filtered.length === 0 ? (
                /* 5 ── EMPTY STATE */
                <div className="text-center py-20">
                  <div className="flex justify-center mb-4">
                    <EmptyFolderSVG />
                  </div>
                  <p className="font-semibold text-lg" style={{ color: C.heading }}>
                    Tidak ada project untuk filter ini
                  </p>
                  <p className="text-sm mt-1 mb-6" style={{ color: C.muted }}>
                    Coba ubah kata kunci pencarian atau pilih tab lain.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => { setActiveTab("Semua"); setSearch(""); }}
                    className="text-sm border-[#C0272D] text-[#C0272D] hover:bg-[#FBF7F7] cursor-pointer"
                  >
                    Reset Filter
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((project) => {
                    const dc = DEPT_COLORS[project.department];
                    const visibleTech = project.techStack.slice(0, 3);
                    const remaining = project.techStack.length - 3;

                    return (
                      <div
                        key={project.id}
                        onClick={() => router.push(`/portofolio/${project.id}`)}
                        className="bg-white rounded-xl overflow-hidden border border-[#E8E6E1] hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col"
                      >
                        {/* Thumbnail */}
                        <div className="h-48 relative" style={{ background: C.surface }}>
                          {project.thumbnail ? (
                            <Image
                              src={project.thumbnail}
                              alt={project.title}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          ) : (
                            <div
                              className="w-full h-full flex items-center justify-center"
                              style={{ background: DEPT_GRADIENTS[project.department] }}
                            >
                              <DeptIcon dept={project.department} size={48} />
                            </div>
                          )}
                          {/* Dept badge */}
                          <span
                            className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full"
                            style={{ background: dc.bg, color: dc.text }}
                          >
                            {project.department}
                          </span>
                        </div>

                        {/* Body */}
                        <div className="p-5 flex-1 flex flex-col">
                          {project.client && (
                            <p className="text-xs mb-1" style={{ color: C.muted }}>
                              Klien: {project.client}
                            </p>
                          )}
                          <h3
                            className="font-bold line-clamp-1 mb-2"
                            style={{ color: C.heading }}
                          >
                            {project.title}
                          </h3>
                          <p
                            className="text-sm line-clamp-2 mb-4"
                            style={{ color: C.muted }}
                          >
                            {project.description}
                          </p>
                          {/* Tech stack chips */}
                          <div className="flex flex-wrap gap-1.5 mt-auto">
                            {visibleTech.map((tech) => (
                              <span
                                key={tech}
                                className="text-xs px-2.5 py-1 rounded-md"
                                style={{ background: C.surface, color: C.body }}
                              >
                                {tech}
                              </span>
                            ))}
                            {remaining > 0 && (
                              <span
                                className="text-xs px-2.5 py-1 rounded-md"
                                style={{ background: C.surface, color: C.muted }}
                              >
                                +{remaining}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Footer */}
                        <div
                          className="border-t px-5 py-3 flex justify-between items-center"
                          style={{ borderColor: C.border }}
                        >
                          {project.testimonial ? (
                            <span className="flex items-center gap-1.5 text-xs" style={{ color: C.muted }}>
                              <QuoteIcon />
                              Ada testimoni
                            </span>
                          ) : (
                            <span />
                          )}
                          <span className="text-xs font-semibold" style={{ color: C.primary }}>
                            Lihat Detail &rarr;
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* 6 ── FOOTER */}
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
              &copy; {new Date().getFullYear()} TEFA SMK Telkom Malang. All rights
              reserved.
            </p>
          </div>

          <Separator className="my-6 bg-white/10" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
            <div className="flex gap-6">
              <Link href="/" className="hover:text-white transition-colors no-underline">
                Beranda
              </Link>
              <Link href="/layanan" className="hover:text-white transition-colors no-underline">
                Layanan
              </Link>
              <Link href="/portofolio" className="text-white no-underline">
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
