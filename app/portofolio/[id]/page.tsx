"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
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
    completedAt: "2024-03",
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
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11v8a1 1 0 001 1h14a1 1 0 001-1v-8" />
      <path d="M4 11l4-7h8l4 7" />
      <circle cx="12" cy="15" r="2" />
      <path d="M14 15l4-4" />
    </svg>
  );
}

// ─── Format completedAt ──────────────────────────────────────────────────────
function formatDate(raw?: string): string | null {
  if (!raw) return null;
  const [year, month] = raw.split("-");
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  const idx = parseInt(month, 10) - 1;
  if (idx < 0 || idx > 11) return raw;
  return `${monthNames[idx]} ${year}`;
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function DetailNavbar() {
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
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 no-underline text-[#3B3B58] hover:text-[#C0272D] hover:bg-[#FBF7F7]"
            >
              {link.label}
            </Link>
          ))}
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
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-sm font-medium rounded-lg transition-colors no-underline text-[#3B3B58] hover:text-[#C0272D] hover:bg-[#FBF7F7]"
            >
              {link.label}
            </Link>
          ))}
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

// ─── Skeleton Detail ─────────────────────────────────────────────────────────
function SkeletonDetail() {
  return (
    <div className="animate-pulse">
      {/* Back button skeleton */}
      <div className="py-6 px-6 max-w-5xl mx-auto">
        <div className="h-4 bg-[#E8E6E1] rounded w-48" />
      </div>

      {/* Hero skeleton */}
      <div className="max-w-5xl mx-auto px-6 pb-12">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left */}
          <div className="space-y-4">
            <div className="h-6 bg-[#E8E6E1] rounded-full w-16" />
            <div className="h-8 bg-[#E8E6E1] rounded w-3/4 mt-3" />
            <div className="h-4 bg-[#E8E6E1] rounded w-1/3 mt-2" />
            <div className="space-y-2 mt-4">
              <div className="h-4 bg-[#E8E6E1] rounded w-full" />
              <div className="h-4 bg-[#E8E6E1] rounded w-5/6" />
              <div className="h-4 bg-[#E8E6E1] rounded w-2/3" />
            </div>
            <div className="flex gap-2 mt-4">
              <div className="h-7 bg-[#E8E6E1] rounded-md w-20" />
              <div className="h-7 bg-[#E8E6E1] rounded-md w-16" />
              <div className="h-7 bg-[#E8E6E1] rounded-md w-24" />
            </div>
            <div className="flex gap-3 mt-6">
              <div className="h-10 bg-[#E8E6E1] rounded-lg w-32" />
              <div className="h-10 bg-[#E8E6E1] rounded-lg w-32" />
            </div>
          </div>
          {/* Right */}
          <div className="rounded-xl aspect-video" style={{ background: C.surface }} />
        </div>
      </div>

      {/* Testimonial skeleton */}
      <div className="py-12 mt-8" style={{ background: C.surface }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-6 bg-[#E8E6E1] rounded w-32 mb-6" />
          <div className="bg-white rounded-xl border border-[#E8E6E1] p-8 space-y-4">
            <div className="h-5 bg-[#E8E6E1] rounded w-full" />
            <div className="h-5 bg-[#E8E6E1] rounded w-4/5" />
            <div className="flex items-center gap-3 mt-6">
              <div className="w-10 h-10 rounded-full bg-[#E8E6E1]" />
              <div className="space-y-2">
                <div className="h-4 bg-[#E8E6E1] rounded w-28" />
                <div className="h-3 bg-[#E8E6E1] rounded w-36" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Related Project Card ────────────────────────────────────────────────────
function RelatedCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const dc = DEPT_COLORS[project.department];
  const visibleTech = project.techStack.slice(0, 3);
  const remaining = project.techStack.length - 3;

  return (
    <div
      onClick={onClick}
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
        <h3 className="font-bold line-clamp-1 mb-2" style={{ color: C.heading }}>
          {project.title}
        </h3>
        <p className="text-sm line-clamp-2 mb-4" style={{ color: C.muted }}>
          {project.description}
        </p>
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill={C.muted} opacity={0.6}>
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.7 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.332-.547-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.7 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.332-.547-2.917-1.179z" />
            </svg>
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
}

// ─── Arrow Left SVG ──────────────────────────────────────────────────────────
function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

// ─── External Link SVG ───────────────────────────────────────────────────────
function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  );
}

// ─── Code Icon SVG ───────────────────────────────────────────────────────────
function CodeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

// ─── Page Component ──────────────────────────────────────────────────────────
export default function PortofolioDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [related, setRelated] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${baseUrl}/portfolio/${id}`);

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const json = await res.json();
      const data: Project = json.data ?? json;

      if (data && data.id) {
        setProject(data);
        // Fetch related from list
        try {
          const listRes = await fetch(`${baseUrl}/portfolio`);
          if (listRes.ok) {
            const listJson = await listRes.json();
            const all: Project[] = listJson.data ?? listJson;
            if (Array.isArray(all)) {
              setRelated(
                all
                  .filter((p) => p.department === data.department && p.id !== data.id)
                  .slice(0, 3)
              );
            }
          }
        } catch {
          // Use fallback for related
          setRelated(
            FALLBACK
              .filter((p) => p.department === data.department && p.id !== data.id)
              .slice(0, 3)
          );
        }
      } else {
        throw new Error("Invalid data");
      }
    } catch {
      // Use fallback
      const fallbackProject = FALLBACK.find((p) => p.id === id);
      if (fallbackProject) {
        setProject(fallbackProject);
        setRelated(
          FALLBACK
            .filter((p) => p.department === fallbackProject.department && p.id !== fallbackProject.id)
            .slice(0, 3)
        );
      } else {
        setError("Project tidak ditemukan.");
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return (
    <main style={{ background: "#FFFFFF", color: C.body }}>
      {/* 1 ── NAVBAR */}
      <DetailNavbar />

      {/* 6 ── LOADING STATE */}
      {loading && <SkeletonDetail />}

      {/* Error */}
      {error && !loading && (
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <p className="font-semibold text-lg mb-2" style={{ color: C.heading }}>
            {error}
          </p>
          <p className="text-sm mb-6" style={{ color: C.muted }}>
            Project yang Anda cari tidak tersedia.
          </p>
          <Link href="/portofolio">
            <Button
              variant="outline"
              className="text-sm border-[#C0272D] text-[#C0272D] hover:bg-[#FBF7F7] cursor-pointer"
            >
              Kembali ke Portofolio
            </Button>
          </Link>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && project && (
        <>
          {/* 2 ── BACK BUTTON */}
          <div className="py-6 px-6 max-w-5xl mx-auto">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm transition-colors bg-transparent border-none cursor-pointer"
              style={{ color: C.muted }}
              onMouseEnter={(e) => { e.currentTarget.style.color = C.heading; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = C.muted; }}
            >
              <ArrowLeft />
              Kembali ke Portofolio
            </button>
          </div>

          {/* 3 ── HERO SECTION */}
          <div className="max-w-5xl mx-auto px-6 pb-12">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              {/* Left — Content */}
              <div>
                {/* Dept badge */}
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: DEPT_COLORS[project.department].bg,
                    color: DEPT_COLORS[project.department].text,
                  }}
                >
                  {project.department}
                </span>

                {/* Title */}
                <h1
                  className="text-3xl font-bold tracking-tight mt-3"
                  style={{ color: C.heading }}
                >
                  {project.title}
                </h1>

                {/* Client */}
                {project.client && (
                  <p className="text-sm mt-2" style={{ color: C.muted }}>
                    Klien: {project.client}
                  </p>
                )}

                {/* Description */}
                <p
                  className="leading-7 mt-4 max-w-lg"
                  style={{ color: C.body }}
                >
                  {project.description}
                </p>

                {/* Tech stack chips (all shown) */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1.5 rounded-md font-medium"
                      style={{ background: C.surface, color: C.body, border: `1px solid ${C.border}` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <Button
                        className="bg-[#C0272D] hover:bg-[#991B1F] text-white font-semibold cursor-pointer gap-2 h-10 px-5 text-sm"
                      >
                        Lihat Demo
                        <ExternalLinkIcon />
                      </Button>
                    </a>
                  )}
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        className="border-[#E8E6E1] text-[#3B3B58] hover:bg-[#F5F4F2] font-semibold cursor-pointer gap-2 h-10 px-5 text-sm"
                      >
                        Source Code
                        <CodeIcon />
                      </Button>
                    </a>
                  )}
                </div>
              </div>

              {/* Right — Thumbnail */}
              <div>
                <div className="rounded-xl overflow-hidden aspect-video relative" style={{ background: C.surface }}>
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
                      <DeptIcon dept={project.department} size={64} />
                    </div>
                  )}
                </div>
                {/* Completed date badge */}
                {project.completedAt && (
                  <div className="mt-3 flex justify-end">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                      style={{ background: C.surface, color: C.muted, border: `1px solid ${C.border}` }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>
                      Selesai: {formatDate(project.completedAt)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 4 ── TESTIMONIAL SECTION */}
          {project.testimonial && (
            <section className="py-12 mt-8" style={{ background: C.surface }}>
              <div className="max-w-5xl mx-auto px-6">
                <h2 className="font-bold text-xl mb-6" style={{ color: C.heading }}>
                  Kata Klien
                </h2>
                <div
                  className="bg-white rounded-xl border p-8 relative"
                  style={{ borderColor: C.border }}
                >
                  {/* Big quote mark */}
                  <span
                    className="absolute top-4 left-6 text-6xl font-serif leading-none select-none pointer-events-none"
                    style={{ color: C.primary, opacity: 0.15 }}
                  >
                    &ldquo;
                  </span>

                  {/* Quote text */}
                  <p
                    className="text-lg leading-7 italic relative z-10 pt-6"
                    style={{ color: C.body }}
                  >
                    {project.testimonial.quote}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-6">
                    {/* Avatar initial circle */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ background: C.primary }}
                    >
                      {project.testimonial.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: C.heading }}>
                        {project.testimonial.name}
                      </p>
                      <p className="text-xs" style={{ color: C.muted }}>
                        {project.testimonial.role} — {project.testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 5 ── RELATED PROJECTS */}
          {related.length > 0 && (
            <section className="py-16 px-6">
              <div className="max-w-5xl mx-auto">
                <h2 className="font-bold text-xl mb-8" style={{ color: C.heading }}>
                  Project Lainnya dari {project.department}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {related.map((rp) => (
                    <RelatedCard
                      key={rp.id}
                      project={rp}
                      onClick={() => router.push(`/portofolio/${rp.id}`)}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* 7 ── FOOTER */}
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
