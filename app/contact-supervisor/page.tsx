"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const supervisors = [
  {
    name: "Pak Firdausa",
    dept: "RPL",
    deptFull: "Rekayasa Perangkat Lunak",
    role: "Kepala Program Keahlian RPL",
    emoji: "💻",
    color: "#e63946",
    bgColor: "#fdf2f2",
    phone: "6281234567001",
    email: "ahmad.fauzi@smktelkom-mlg.sch.id",
    desc: "Software development, web & mobile apps, UI/UX design projects.",
  },
  {
    name: "Pak Firman",
    dept: "TKJ",
    deptFull: "Teknik Komputer & Jaringan",
    role: "Kepala Program Keahlian TKJ",
    emoji: "🔌",
    color: "#2563eb",
    bgColor: "#eff6ff",
    phone: "6281234567002",
    email: "budi.santoso@smktelkom-mlg.sch.id",
    desc: "Network infrastructure, server setup, cloud & DevOps projects.",
  },
  {
    name: "Ibu Bias",
    dept: "PG",
    deptFull: "Produksi & Grafika",
    role: "Kepala Program Keahlian PG",
    emoji: "🎨",
    color: "#7c3aed",
    bgColor: "#f5f3ff",
    phone: "6281234567003",
    email: "sari.dewi@smktelkom-mlg.sch.id",
    desc: "Multimedia, photography, video production & graphic design projects.",
  },
];

export default function ContactSupervisor() {
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

  const [selectedDept, setSelectedDept] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }, 1500);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa" }}>
      {/* Toast */}

      {/* Toast */}
      {sent && (
        <div className="toast">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          Message sent successfully!
        </div>
      )}

      {/* Nav */}
      <nav style={{ background: "rgba(255,255,255,.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #f3f4f6", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, zIndex: 100 }}>
        <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}>
          <img 
            src="/Logo-SMK Telkom.svg" 
            alt="Logo SMK Telkom" 
            style={{ height: 36, width: "auto", objectFit: "contain" }} 
          />
          <span style={{ fontWeight: 800, fontSize: "1rem", color: "#111" }}>TEFA <span style={{ color: "#e63946" }}>SMK Telkom Malang</span></span>
        </Link>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/" style={{ fontSize: "0.88rem", fontWeight: 600, color: "#374151", textDecoration: "none", padding: "6px 14px", borderRadius: 20, transition: "background .2s" }}>← Back to Home</Link>
        </div>
      </nav>

      {/* Header */}
      <section style={{ padding: "64px 32px 0", textAlign: "center" }}>
        <div className="fi" style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fdf2f2", color: "#e63946", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "6px 14px", borderRadius: 20, border: "1.5px solid #fca5a5", marginBottom: 20 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
            Department Supervisors
          </div>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 12, color: "#111" }}>
            Contact Our <span style={{ color: "#e63946" }}>Supervisors</span>
          </h1>
          <p style={{ color: "#6b7280", lineHeight: 1.7, fontSize: "0.95rem" }}>
            Reach out directly to the supervisor of each department for project inquiries, collaboration, or any questions about our Teaching Factory programs.
          </p>
        </div>
      </section>

      {/* Supervisor Cards */}
      <section style={{ padding: "48px 32px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="sup-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {supervisors.map((s) => (
            <div key={s.dept} className="sc fi">
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <div style={{ width: 56, height: 56, background: s.bgColor, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem" }}>
                  {s.emoji}
                </div>
                <div>
                  <span style={{ display: "inline-block", background: s.color, color: "white", fontSize: "0.7rem", fontWeight: 700, padding: "3px 10px", borderRadius: 20, marginBottom: 4 }}>{s.dept}</span>
                  <div style={{ fontSize: "0.78rem", color: "#6b7280" }}>{s.deptFull}</div>
                </div>
              </div>

              {/* Info */}
              <h3 style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: 4, color: "#111" }}>{s.name}</h3>
              <p style={{ color: "#9ca3af", fontSize: "0.8rem", fontWeight: 600, marginBottom: 12 }}>{s.role}</p>
              <p style={{ color: "#6b7280", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 20 }}>{s.desc}</p>

              {/* Divider */}
              <div style={{ height: 1, background: "#f0f0f0", marginBottom: 20 }} />

              {/* Actions */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a href={`https://wa.me/${s.phone}`} target="_blank" rel="noopener noreferrer" className="wa-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <a href={`mailto:${s.email}`} className="em-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  Email
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section style={{ padding: "0 32px 80px", maxWidth: 720, margin: "0 auto" }}>
        <div className="fi" style={{ background: "#fff", borderRadius: 20, padding: "40px 44px", border: "1.5px solid #f0f0f0", boxShadow: "0 4px 24px rgba(0,0,0,.04)" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 900, marginBottom: 6, color: "#111" }}>Send a Message</h2>
          <p style={{ color: "#6b7280", fontSize: "0.88rem", marginBottom: 28, lineHeight: 1.6 }}>
            Choose a department and send your message. The supervisor will respond within 1x24 hours.
          </p>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Your Name</label>
                <input className="ci" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email</label>
                <input className="ci" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Department</label>
              <select className="ci" style={{ appearance: "auto" }} value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} required>
                <option value="">Select department...</option>
                <option value="RPL">RPL — Rekayasa Perangkat Lunak</option>
                <option value="TKJ">TKJ — Teknik Komputer & Jaringan</option>
                <option value="PG">PG — Produksi & Grafika</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Message</label>
              <textarea className="ci" rows={4} placeholder="Describe your project or question..." style={{ resize: "vertical" }} value={message} onChange={(e) => setMessage(e.target.value)} required />
            </div>
            <button className="cb" type="submit" disabled={loading}>
              {loading ? <div className="sp" /> : <>Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></>}
            </button>
          </form>
        </div>
      </section>
      <style>{`
        .ci { width: 100%; border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 14px 16px; font-size: 0.9rem; font-family: inherit; outline: none; transition: border-color 0.2s, box-shadow 0.2s; background: #fff; }
        .ci:focus { border-color: #e63946; box-shadow: 0 0 0 3px rgba(230, 57, 70, 0.08); }
        .ci::placeholder { color: #9ca3af; }

        .cb { background: #e63946; color: #fff; border: none; padding: 14px 24px; border-radius: 10px; font-weight: 700; font-size: 0.95rem; font-family: inherit; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: background 0.2s, transform 0.1s, box-shadow 0.2s; width: 100%; }
        .cb:hover { background: #c1121f; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(230, 57, 70, 0.3); }
        .cb:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .sp { width: 18px; height: 18px; border: 2.5px solid rgba(255, 255, 255, 0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.6s linear infinite; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .fi { animation: fadeIn 0.5s ease-out; }

        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .toast { position: fixed; top: 24px; right: 24px; background: #10b981; color: #fff; padding: 14px 24px; border-radius: 10px; font-weight: 700; font-size: 0.9rem; box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3); z-index: 999; animation: slideDown 0.3s ease-out; display: flex; align-items: center; gap: 8px; }

        .sc { background: #fff; border: 1.5px solid #f0f0f0; border-radius: 16px; padding: 28px; transition: box-shadow 0.25s, border-color 0.25s, transform 0.2s; }
        .sc:hover { box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08); transform: translateY(-4px); }

        .wa-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 8px; font-weight: 700; font-size: 0.82rem; font-family: inherit; cursor: pointer; transition: transform 0.1s, box-shadow 0.2s; text-decoration: none; border: none; color: #fff; background: #25d366; }
        .wa-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3); }

        .em-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 8px; font-weight: 700; font-size: 0.82rem; font-family: inherit; cursor: pointer; transition: transform 0.1s, box-shadow 0.2s; text-decoration: none; border: 1.5px solid #e5e7eb; color: #374151; background: #fff; }
        .em-btn:hover { border-color: #e63946; color: #e63946; transform: translateY(-1px); }

        @media (max-width: 768px) { .bp { display: none !important; } }
      `}</style>
    </div>
  );
}
