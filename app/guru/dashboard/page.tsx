"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface UserData {
  name: string;
  email: string;
  userType: string;
  category: string;
  majorLabel: string;
  majorFull: string;
  color: string;
  icon: string;
  isInternal: boolean;
}

const defaultUser: UserData = {
  name: "Teacher",
  email: "teacher@smktelkom-mlg.sch.id",
  userType: "internal",
  category: "guru",
  majorLabel: "Guru",
  majorFull: "Guru — SMK Telkom Malang",
  color: "#16a34a",
  icon: "👨‍🏫",
  isInternal: true,
};

export default function GuruDashboard() {
  const [user, setUser] = useState<UserData>(defaultUser);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("tefa_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        // fallback to default
      }
    }
    setMounted(true);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const accentColor = user.color || "#16a34a";
  const accentBg = `${accentColor}12`;
  const accentBorder = `${accentColor}25`;

  if (!mounted) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", fontFamily: "var(--font-plus-jakarta-sans), 'Inter', sans-serif" }}>
      {/* Sidebar */}
      <aside style={{
        width: "270px", background: "white", borderRight: "1px solid #f1f5f9",
        display: "flex", flexDirection: "column",
        boxShadow: "2px 0 20px rgba(0,0,0,0.03)",
      }}>
        <div style={{
          padding: "24px 20px", borderBottom: "1px solid #f1f5f9",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: accentColor, display: "flex", alignItems: "center",
            justifyContent: "center", color: "white", fontWeight: 800,
            fontSize: "0.95rem", boxShadow: `0 4px 12px ${accentColor}40`,
          }}>
            G
          </div>
          <span style={{ fontWeight: 800, fontSize: "1.05rem", color: "#0f172a" }}>Teacher Portal</span>
        </div>

        <div style={{
          margin: "20px 16px", padding: "16px", borderRadius: 14,
          background: `linear-gradient(135deg, ${accentColor}08, ${accentColor}04)`,
          border: `1.5px solid ${accentBorder}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontWeight: 800, fontSize: "1.1rem",
              boxShadow: `0 4px 12px ${accentColor}30`,
            }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a" }}>{user.name}</div>
              <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: 1 }}>{user.email}</div>
            </div>
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: "0.72rem", fontWeight: 700, padding: "4px 10px",
            borderRadius: 20, background: `${accentColor}15`, color: accentColor,
          }}>
            <span style={{ fontSize: "0.85rem" }}>{user.icon}</span>
            {user.majorLabel}
          </div>
        </div>

        <nav style={{ padding: "8px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            { icon: "🏠", label: "Dashboard", active: true },
            { icon: "👨‍🎓", label: "Students", active: false },
            { icon: "📚", label: "Projects", active: false },
            { icon: "📊", label: "Grades", active: false },
          ].map((item) => (
            <a key={item.label} href="#" style={{
              padding: "11px 16px", background: item.active ? accentBg : "transparent",
              color: item.active ? accentColor : "#64748b", borderRadius: 10,
              fontWeight: item.active ? 650 : 500, textDecoration: "none",
              display: "flex", alignItems: "center", gap: 12, fontSize: "0.9rem",
              border: item.active ? `1.5px solid ${accentBorder}` : "1.5px solid transparent",
            }}>
              <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div style={{ padding: "20px 16px", borderTop: "1px solid #f1f5f9" }}>
          <Link href="/" style={{
            padding: "12px 16px", color: "#ef4444", borderRadius: 10,
            fontWeight: 600, textDecoration: "none", display: "flex",
            alignItems: "center", gap: 12, fontSize: "0.9rem",
          }}>
            <span style={{ fontSize: "1.1rem" }}>🚪</span> Logout
          </Link>
        </div>
      </aside>

      <main style={{ flex: 1, padding: "40px 56px", overflowY: "auto" }}>
        <header className="dash-fadein" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36 }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: "0.78rem", fontWeight: 700, color: accentColor,
              background: accentBg, padding: "6px 14px", borderRadius: 20,
              border: `1.5px solid ${accentBorder}`, marginBottom: 16,
              letterSpacing: "0.04em", textTransform: "uppercase",
            }}>
              <span>{user.icon}</span>
              {user.majorLabel}
              <span style={{ background: "#dcfce7", color: "#166534", padding: "2px 8px", borderRadius: 12, fontSize: "0.68rem" }}>Internal</span>
            </div>
            <h1 style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.02em", color: "#0f172a", marginBottom: 6, lineHeight: 1.2 }}>
              {getGreeting()}, <span style={{ color: accentColor }}>{user.name}</span> 👨‍🏫
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6 }}>Manage your students and industrial projects effectively.</p>
          </div>
        </header>

        {/* Placeholder stats */}
        <div className="dash-fadein" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 32 }}>
          {[
            { label: "Mentored Projects", value: "8", icon: "📚" },
            { label: "Active Students", value: "42", icon: "👨‍🎓" },
            { label: "Reports Pending", value: "3", icon: "📄" },
          ].map(stat => (
            <div key={stat.label} style={{ background: "white", padding: "24px 28px", borderRadius: 16, border: "1.5px solid #f1f5f9", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.03)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ color: "#64748b", fontSize: "0.85rem", fontWeight: 600 }}>{stat.label}</div>
                <span style={{ fontSize: "1.4rem" }}>{stat.icon}</span>
              </div>
              <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a" }}>{stat.value}</div>
            </div>
          ))}
        </div>
      </main>

      <style>{`
        @keyframes dashFadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .dash-fadein { animation: dashFadeIn 0.5s ease-out both; }
      `}</style>
    </div>
  );
}
