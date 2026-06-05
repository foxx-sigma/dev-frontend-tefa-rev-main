"use client";

import { useState, Fragment, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // FETCHING API TEMPLATE
  // const [apiData, setApiData] = useState<any>(null);
  // const [apiLoading, setApiLoading] = useState(false);
  // const [apiError, setApiError] = useState<string | null>(null);
  // 
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setApiLoading(true);
  //     try {
  //       const response = await fetch("YOUR_API_URL_HERE");
  //       if (!response.ok) throw new Error("Failed to fetch data");
  //       const result = await response.json();
  //       setApiData(result);
  //     } catch (err: any) {
  //       setApiError(err.message);
  //     } finally {
  //       setApiLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <main className="bg-white text-gray-900">

      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #f3f4f6",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img 
            src="/Logo-SMK Telkom.svg" 
            alt="Logo SMK Telkom" 
            style={{ height: 36, width: "auto", objectFit: "contain" }} 
          />
          <span style={{ fontWeight: 800, fontSize: "1rem" }}>
            TEFA <span style={{ color: "#e63946" }}>SMK Telkom Malang</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div
          className="desktop-nav"
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          {["Home", "About", "Services", "Portfolio", "Contact"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`nav-link${item === "Home" ? " active" : ""}`}
              >
                {item}
              </a>
            )
          )}
        </div>

        {/* Auth */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/sign-in" style={{ fontWeight: 600, fontSize: "0.9rem", color: "#374151", textDecoration: "none" }}>
            Sign in
          </Link>
          <Link href="/sign-up" className="btn-primary" style={{ padding: "8px 20px" }}>
            Sign up
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        id="home"
        style={{ padding: "80px 0", backgroundColor: "#fafafa" }}
      >
        <div
          className="hero-grid"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 32px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          {/* Left */}
          <div>
            <div className="section-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              Teaching Factory
            </div>

            <h1
              style={{
                fontSize: "2.2rem",
                fontWeight: 900,
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                marginBottom: 12,
              }}
            >
              Bridging{" "}
              <span style={{ color: "#e63946" }}>Education</span> and
              <br />
              Industry Through
              <br />
              <span style={{ color: "#e63946" }}>Real Projects</span>
            </h1>

            <p style={{ color: "#6b7280", lineHeight: 1.7, marginBottom: 32, maxWidth: 460 }}>
              TEFA SMK Telkom Malang menghubungkan pembelajaran vokasi dengan pengalaman
              kerja nyata. Kami mengerjakan proyek industri di bidang software, jaringan,
              dan multimedia.
            </p>

           

            {/* Stats */}
            <div
              className="stats-row"
              style={{ display: "flex", gap: 40, marginTop: 48, alignItems: "center" }}
            >
              {[
                { value: "50+", label: "Project Selesai" },
                { value: "20+", label: "Mitra Industri" },
                { value: "3", label: "Jurusan Aktif" },
              ].map((s, i) => (
                <Fragment key={s.label}>
                  {i > 0 && <div className="stat-divider" />}
                  <div>
                    <div style={{ fontWeight: 900, fontSize: "2rem", letterSpacing: "-0.03em" }}>
                      {s.value}
                    </div>
                    <div style={{ color: "#9ca3af", fontSize: "0.85rem", marginTop: 2 }}>
                      {s.label}
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>

          {/* Right — Hero Image */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                background: "#f3f4f6",
                aspectRatio: "4/3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Placeholder image with gradient */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(135deg, #fdf2f2 0%, #fee2e2 50%, #fca5a5 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "5rem",
                }}
              >
                👩‍💻
              </div>
            </div>

            {/* Floating badge */}
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: -20,
                background: "white",
                borderRadius: 12,
                padding: "12px 20px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>Industry Standard</div>
                <div style={{ color: "#9ca3af", fontSize: "0.75rem" }}>ISO Workflow & Best Practices</div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "80px 0", borderTop: "1px solid #f3f4f6" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ marginBottom: 48 }}>
          <div className="section-badge">Services</div>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 12 }}>
            Apa yang kami kerjakan
          </h2>
          <p style={{ color: "#6b7280", maxWidth: 520, lineHeight: 1.7 }}>
            Tiga jurusan TEFA berkolaborasi memberikan layanan end-to-end untuk kebutuhan digital Anda.
          </p>
        </div>

        <div
          className="service-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
        >
          {[
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                </svg>
              ),
              title: "Software Development",
              desc: "Web & mobile app berstandar industri menggunakan stack modern.",
              tag: "RPL",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" />
                  <path d="M7 20.662V19a2 2 0 012-2h6a2 2 0 012 2v1.662" />
                </svg>
              ),
              title: "UI/UX Design",
              desc: "Riset, wireframing, dan desain antarmuka berfokus pada pengguna.",
              tag: "RPL",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="8" height="8" rx="1" /><rect x="14" y="2" width="8" height="8" rx="1" />
                  <rect x="2" y="14" width="8" height="8" rx="1" /><rect x="14" y="14" width="8" height="8" rx="1" />
                </svg>
              ),
              title: "Network & Infrastructure",
              desc: "Instalasi, konfigurasi, dan monitoring jaringan untuk bisnis.",
              tag: "TKJ",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              ),
              title: "Server & Cloud",
              desc: "Setup server, DevOps, dan deployment di cloud provider.",
              tag: "TKJ",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              ),
              title: "Multimedia & Photography",
              desc: "Foto produk, dokumentasi event, dan konten visual brand.",
              tag: "PG",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="2.18" /><line x1="7" y1="2" x2="7" y2="22" />
                  <line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" />
                  <line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" />
                  <line x1="17" y1="17" x2="22" y2="17" /><line x1="17" y1="7" x2="22" y2="7" />
                </svg>
              ),
              title: "Video Production",
              desc: "Video promosi, company profile, dan konten media sosial.",
              tag: "PG",
            },
          ].map((s) => (
            <div key={s.title} className="service-card">
              <div className="service-icon">{s.icon}</div>
              <h3 style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: 8 }}>{s.title}</h3>
              <p style={{ color: "#6b7280", fontSize: "0.88rem", lineHeight: 1.65 }}>{s.desc}</p>
              <span className="tag">{s.tag}</span>
            </div>
          ))}
        </div>

        {/* Contact Supervisor CTA */}
        <div
          style={{
            marginTop: 48,
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
            borderRadius: 20,
            padding: "40px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(230,57,70,.1)" }} />
          <div style={{ position: "absolute", bottom: -30, left: "40%", width: 120, height: 120, borderRadius: "50%", background: "rgba(230,57,70,.06)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h3 style={{ color: "white", fontWeight: 800, fontSize: "1.2rem", marginBottom: 6 }}>
              Punya pertanyaan tentang layanan kami?
            </h3>
            <p style={{ color: "rgba(255,255,255,.6)", fontSize: "0.88rem", lineHeight: 1.6 }}>
              Hubungi langsung kepala program keahlian di setiap jurusan untuk konsultasi proyek.
            </p>
          </div>
          <Link
            href="/contact-supervisor"
            style={{
              position: "relative",
              zIndex: 1,
              background: "#e63946",
              color: "white",
              border: "none",
              padding: "14px 28px",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              transition: "background 0.2s, transform 0.1s",
              whiteSpace: "nowrap",
            }}
          >
            Contact Supervisor
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section
        id="portfolio"
        style={{ padding: "80px 0", background: "#fafafa" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ marginBottom: 48 }}>
            <div className="section-badge">Portfolio</div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 12 }}>
              Proyek Terbaru Kami
            </h2>
            <p style={{ color: "#6b7280", maxWidth: 480, lineHeight: 1.7 }}>
              Hasil kerja nyata dari kolaborasi siswa dan industri.
            </p>
          </div>

          <div
            className="portfolio-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
          >
            {[
              {
                emoji: "🛒",
                bg: "#fdf2f2",
                title: "E-Commerce Platform",
                desc: "Platform belanja online untuk UMKM lokal dengan fitur pembayaran digital.",
                tags: ["Next.js", "Prisma", "Midtrans"],
                jurusan: "RPL",
              },
              {
                emoji: "🌐",
                bg: "#f0fdf4",
                title: "Network Monitoring Dashboard",
                desc: "Dashboard real-time untuk monitoring infrastruktur jaringan sekolah.",
                tags: ["Grafana", "Prometheus", "Linux"],
                jurusan: "TKJ",
              },
              {
                emoji: "🎬",
                bg: "#eff6ff",
                title: "Company Profile Video",
                desc: "Video company profile profesional untuk klien UMKM di Malang.",
                tags: ["Premiere Pro", "After Effects"],
                jurusan: "PG",
              },
            ].map((p) => (
              <div key={p.title} className="portfolio-card" style={{ background: "white" }}>
                <div
                  style={{
                    height: 180,
                    background: p.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "4rem",
                  }}
                >
                  {p.emoji}
                </div>
                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <h3 style={{ fontWeight: 800, fontSize: "1rem" }}>{p.title}</h3>
                    <span
                      style={{
                        background: "#e63946",
                        color: "white",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: 20,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.jurusan}
                    </span>
                  </div>
                  <p style={{ color: "#6b7280", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 16 }}>
                    {p.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          background: "#f3f4f6",
                          color: "#374151",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          padding: "4px 10px",
                          borderRadius: 6,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a href="#" className="btn-outline">
              Lihat Semua Proyek →
            </a>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "80px 0", borderTop: "1px solid #f3f4f6" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
          className="hero-grid"
        >
          <div>
            <div className="section-badge">Tentang Kami</div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 20, lineHeight: 1.2 }}>
              Mengapa memilih{" "}
              <span style={{ color: "#e63946" }}>TEFA SMK Telkom</span>?
            </h2>
            <p style={{ color: "#6b7280", lineHeight: 1.75, marginBottom: 24 }}>
              Teaching Factory adalah model pembelajaran berbasis industri dimana siswa mengerjakan proyek
              nyata dari klien. Kami memastikan standar kualitas industri di setiap deliverable.
            </p>
            {[
              "Dibimbing langsung oleh guru dan mentor industri berpengalaman",
              "Menggunakan workflow ISO dan best practice modern",
              "Harga kompetitif dengan kualitas profesional",
              "3 jurusan kolaborasi: RPL, TKJ, dan PG",
            ].map((item) => (
              <div
                key={item}
                style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    minWidth: 22,
                    background: "#e63946",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 1,
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span style={{ color: "#374151", fontSize: "0.9rem", lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #fdf2f2, #fee2e2)",
              borderRadius: 20,
              padding: 40,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {[
              { label: "RPL", full: "Rekayasa Perangkat Lunak", icon: "💻", color: "#e63946" },
              { label: "TKJ", full: "Teknik Komputer & Jaringan", icon: "🔌", color: "#2563eb" },
              { label: "PG", full: "Produksi & Grafika", icon: "🎨", color: "#7c3aed" },
            ].map((j) => (
              <div
                key={j.label}
                style={{
                  background: "white",
                  borderRadius: 12,
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ fontSize: "2rem" }}>{j.icon}</div>
                <div>
                  <div style={{ fontWeight: 800, color: j.color }}>{j.label}</div>
                  <div style={{ color: "#374151", fontSize: "0.85rem" }}>{j.full}</div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        style={{ padding: "80px 32px", background: "#fafafa", borderTop: "1px solid #f3f4f6" }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <div
            className="section-badge"
            style={{ background: "rgba(230,57,70,0.15)", borderColor: "#e63946", margin: "0 auto 20px" }}
          >
            Hubungi Kami
          </div>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "black", letterSpacing: "-0.02em", marginBottom: 12 }}>
            Mulai Proyek Bersama Kami
          </h2>
          <p style={{ color: "#000000ff", marginBottom: 40, lineHeight: 1.7 }}>
            Ceritakan kebutuhan proyek Anda. Tim kami akan menghubungi Anda dalam 2x24 jam.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", color: "#000000ff", fontSize: "0.82rem", fontWeight: 600, marginBottom: 6 }}>
                  Nama
                </label>
                <input className="input-field" placeholder="Nama lengkap" />
              </div>
              <div>
                <label style={{ display: "block", color: "#000000ff", fontSize: "0.82rem", fontWeight: 600, marginBottom: 6 }}>
                  Email
                </label>
                <input className="input-field" type="email" placeholder="email@contoh.com" />
              </div>
            </div>
            <div>
              <label style={{ display: "block", color: "#000000ff", fontSize: "0.82rem", fontWeight: 600, marginBottom: 6 }}>
                Jenis Layanan
              </label>
              <select className="input-field" style={{ appearance: "auto" }}>
                <option value="">Pilih layanan...</option>
                <option>Software Development</option>
                <option>UI/UX Design</option>
                <option>Network & Infrastructure</option>
                <option>Server & Cloud</option>
                <option>Multimedia & Photography</option>
                <option>Video Production</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", color: "#000000ff", fontSize: "0.82rem", fontWeight: 600, marginBottom: 6 }}>
                Deskripsi Proyek
              </label>
              <textarea
                className="input-field"
                rows={4}
                placeholder="Ceritakan proyek Anda..."
                style={{ resize: "vertical" }}
              />
            </div>
            <button className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px" }}>
              Kirim Pesan
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0d1117", padding: "40px 32px", borderTop: "1px solid #1f2937" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img 
            src="/Logo-SMK Telkom.svg" 
            alt="Logo SMK Telkom" 
            style={{ height: 36, width: "auto", objectFit: "contain" }} 
          />
          <span style={{ fontWeight: 800, color: "white", fontSize: "0.95rem" }}>
              TEFA <span style={{ color: "#e63946" }}>SMK Telkom Malang</span>
            </span>
        </div>

            
          </div>
          <p style={{ color: "#6b7280", fontSize: "0.82rem" }}>
            © 2026 TEFA SMK Telkom Malang. All rights reserved.
          </p>

        </div>
      </footer>

      <style>{`
        /* ── SHARED UI CLASSES ── */
        .nav-link { color: #374151; text-decoration: none; font-size: 0.9rem; font-weight: 500; padding: 6px 4px; transition: color 0.2s; }
        .nav-link:hover, .nav-link.active { color: #e63946; }
        .nav-link.active { background: #fdf2f2; padding: 6px 14px; border-radius: 20px; }

        .btn-primary { background: #e63946; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; transition: background 0.2s, transform 0.1s, box-shadow 0.2s; text-decoration: none; }
        .btn-primary:hover { background: #c1121f; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(230, 57, 70, 0.3); }

        .btn-outline { background: transparent; color: #111; border: 1.5px solid #d1d5db; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: border-color 0.2s, color 0.2s; text-decoration: none; }
        .btn-outline:hover { border-color: #e63946; color: #e63946; }

        .section-badge { display: inline-flex; align-items: center; gap: 8px; background: #fdf2f2; color: #e63946; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 6px 14px; border-radius: 20px; border: 1.5px solid #fca5a5; margin-bottom: 20px; }

        .service-card { background: white; border: 1.5px solid #f0f0f0; border-radius: 16px; padding: 32px 28px; transition: box-shadow 0.25s, border-color 0.25s, transform 0.2s; }
        .service-card:hover { box-shadow: 0 8px 32px rgba(230, 57, 70, 0.10); border-color: #fca5a5; transform: translateY(-4px); }

        .service-icon { width: 52px; height: 52px; background: #fdf2f2; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; color: #e63946; }

        .tag { display: inline-block; background: #f3f4f6; color: #374151; font-size: 0.75rem; font-weight: 600; padding: 4px 12px; border-radius: 20px; margin-top: 16px; }

        .portfolio-card { border-radius: 16px; overflow: hidden; border: 1.5px solid #f0f0f0; transition: box-shadow 0.25s, transform 0.2s; }
        .portfolio-card:hover { box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); transform: translateY(-4px); }

        .stat-divider { width: 1px; height: 48px; background: #e5e7eb; }

        .ticker-wrap { overflow: hidden; background: #e63946; padding: 12px 0; }
        .ticker-inner { display: flex; gap: 0; animation: ticker 28s linear infinite; white-space: nowrap; }
        .ticker-inner:hover { animation-play-state: paused; }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .ticker-item { color: white; font-weight: 700; font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; padding: 0 32px; display: inline-flex; align-items: center; gap: 12px; }
        .ticker-dot { width: 6px; height: 6px; background: rgba(255, 255, 255, 0.5); border-radius: 50%; }

        .team-card { background: white; border: 1.5px solid #f0f0f0; border-radius: 16px; overflow: hidden; transition: box-shadow 0.25s, transform 0.2s; }
        .team-card:hover { box-shadow: 0 8px 24px rgba(0, 0, 0, 0.10); transform: translateY(-3px); }

        .input-field { width: 100%; border: 1.5px solid #e5e7eb; border-radius: 8px; padding: 12px 16px; font-size: 0.9rem; font-family: inherit; outline: none; transition: border-color 0.2s; }
        .input-field:focus { border-color: #e63946; }
      `}</style>
    </main>
  );
}