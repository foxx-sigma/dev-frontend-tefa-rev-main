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
  name: "User",
  email: "user@example.com",
  userType: "external",
  category: "customer",
  majorLabel: "External User",
  majorFull: "Customer — External User",
  color: "#64748b",
  icon: "👤",
  isInternal: false,
};

export default function UserDashboard() {
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

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Get sidebar accent color based on user category
  const accentColor = user.color || "#3b82f6";
  const accentBg = `${accentColor}12`;
  const accentBorder = `${accentColor}25`;

  // Get sidebar letter
  const sidebarLetter = user.category === "student_rpl" ? "R"
    : user.category === "student_tkj" ? "T"
    : user.category === "student_pg" ? "P"
    : user.category === "guru" ? "G"
    : user.category === "staff" ? "S"
    : "U";

  // Get sidebar title
  const sidebarTitle = user.category === "student_rpl" ? "RPL Portal"
    : user.category === "student_tkj" ? "TKJ Portal"
    : user.category === "student_pg" ? "PG Portal"
    : user.category === "guru" ? "Teacher Portal"
    : user.category === "staff" ? "Staff Portal"
    : "User Portal";

  if (!mounted) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", fontFamily: "var(--font-plus-jakarta-sans), 'Inter', sans-serif" }}>
      {/* Sidebar */}
      <aside style={{
        width: "270px", background: "white", borderRight: "1px solid #f1f5f9",
        display: "flex", flexDirection: "column",
        boxShadow: "2px 0 20px rgba(0,0,0,0.03)",
      }}>
        {/* Logo area */}
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
            {sidebarLetter}
          </div>
          <span style={{ fontWeight: 800, fontSize: "1.05rem", color: "#0f172a" }}>{sidebarTitle}</span>
        </div>

        {/* User profile mini card */}
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

        {/* Nav */}
        <nav style={{ padding: "8px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            { icon: "🏠", label: "Home", active: true },
            { icon: "📁", label: "My Projects", active: false },
            { icon: "📊", label: "Progress", active: false },
            { icon: "💬", label: "Messages", active: false },
            { icon: "👤", label: "Profile", active: false },
          ].map((item) => (
            <a
              key={item.label}
              href="#"
              style={{
                padding: "11px 16px",
                background: item.active ? accentBg : "transparent",
                color: item.active ? accentColor : "#64748b",
                borderRadius: 10, fontWeight: item.active ? 650 : 500,
                textDecoration: "none", display: "flex", alignItems: "center",
                gap: 12, fontSize: "0.9rem",
                transition: "all 0.2s",
                border: item.active ? `1.5px solid ${accentBorder}` : "1.5px solid transparent",
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: "20px 16px", borderTop: "1px solid #f1f5f9" }}>
          <Link href="/" style={{
            padding: "12px 16px", color: "#ef4444", borderRadius: 10,
            fontWeight: 600, textDecoration: "none", display: "flex",
            alignItems: "center", gap: 12, fontSize: "0.9rem",
            transition: "background 0.2s",
          }}>
            <span style={{ fontSize: "1.1rem" }}>🚪</span> Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "40px 56px", overflowY: "auto" }}>
        {/* Header */}
        <header className="dash-fadein" style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          marginBottom: 36,
        }}>
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
              {user.isInternal && (
                <span style={{
                  background: "#dcfce7", color: "#166534", padding: "2px 8px",
                  borderRadius: 12, fontSize: "0.68rem",
                }}>
                  Internal
                </span>
              )}
            </div>

            <h1 style={{
              fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.02em",
              color: "#0f172a", marginBottom: 6, lineHeight: 1.2,
            }}>
              {getGreeting()}, <span style={{ color: accentColor }}>{user.name}</span> 👋
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6 }}>
              {user.isInternal
                ? `${user.majorFull} — Track your projects and learning progress.`
                : "Welcome to TEFA SMK Telkom Malang. Explore available services."
              }
            </p>
          </div>

          <button style={{
            padding: "11px 22px", background: accentColor, border: "none",
            borderRadius: 10, fontWeight: 700, color: "white", cursor: "pointer",
            fontFamily: "inherit", fontSize: "0.88rem",
            boxShadow: `0 4px 14px ${accentColor}30`,
            transition: "all 0.2s",
          }}>
            + New Project
          </button>
        </header>

        {/* Stats Cards */}
        <div className="dash-fadein" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 32, animationDelay: "0.1s" }}>
          {[
            { label: "Active Projects", value: "3", icon: "🚀", change: "+1 this week" },
            { label: "Completed", value: "12", icon: "✅", change: "2 this month" },
            { label: "Pending Reviews", value: "1", icon: "⏳", change: "Awaiting feedback" },
          ].map(stat => (
            <div key={stat.label} style={{
              background: "white", padding: "24px 28px", borderRadius: 16,
              border: "1.5px solid #f1f5f9",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.03)",
              transition: "all 0.25s",
              cursor: "default",
              position: "relative", overflow: "hidden",
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = `0 8px 24px ${accentColor}15`;
                e.currentTarget.style.borderColor = `${accentColor}30`;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.03)";
                e.currentTarget.style.borderColor = "#f1f5f9";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ color: "#64748b", fontSize: "0.85rem", fontWeight: 600 }}>{stat.label}</div>
                <span style={{ fontSize: "1.4rem" }}>{stat.icon}</span>
              </div>
              <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.03em", marginBottom: 6 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 500 }}>
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Role / Major Info Card */}
        <div className="dash-fadein" style={{
          background: `linear-gradient(135deg, ${accentColor}08, ${accentColor}04)`,
          borderRadius: 16, border: `1.5px solid ${accentBorder}`,
          padding: "28px 32px", marginBottom: 32,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          animationDelay: "0.15s",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.8rem",
              boxShadow: `0 8px 20px ${accentColor}30`,
            }}>
              {user.icon}
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#0f172a", marginBottom: 4 }}>
                {user.majorLabel}
              </div>
              <div style={{ color: "#64748b", fontSize: "0.88rem" }}>
                {user.majorFull}
              </div>
            </div>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: user.isInternal ? "#dcfce7" : "#f3f4f6",
            color: user.isInternal ? "#166534" : "#374151",
            padding: "8px 16px", borderRadius: 10,
            fontWeight: 700, fontSize: "0.82rem",
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: user.isInternal ? "#22c55e" : "#9ca3af",
            }} />
            {user.isInternal ? "Telkom Internal" : "External Account"}
          </div>
        </div>

        {/* Projects Table */}
        <div className="dash-fadein" style={{
          background: "white", borderRadius: 16,
          border: "1.5px solid #f1f5f9", padding: "28px 32px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.03)",
          animationDelay: "0.2s",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a" }}>Your Projects</h2>
            <a href="#" style={{ color: accentColor, fontWeight: 600, fontSize: "0.85rem", textDecoration: "none" }}>
              View All →
            </a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { name: "E-Commerce Redesign", tag: "Web Dev", status: "In Progress", statusColor: "#dcfce7", statusText: "#166534", time: "Updated 2 days ago" },
              { name: "Network Monitoring Setup", tag: "Infra", status: "Review", statusColor: "#fef3c7", statusText: "#92400e", time: "Updated 5 days ago" },
            ].map((project, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "18px 20px", border: "1.5px solid #f1f5f9", borderRadius: 14,
                transition: "all 0.2s", cursor: "pointer",
              }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = `${accentColor}30`;
                  e.currentTarget.style.background = `${accentColor}03`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#f1f5f9";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: 12,
                    background: accentBg, display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "1.3rem",
                  }}>
                    🚀
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.98rem" }}>{project.name}</div>
                    <div style={{ color: "#94a3b8", fontSize: "0.82rem", marginTop: 3, display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ background: "#f1f5f9", padding: "2px 8px", borderRadius: 6, fontWeight: 600, fontSize: "0.72rem", color: "#475569" }}>
                        {project.tag}
                      </span>
                      {project.time}
                    </div>
                  </div>
                </div>
                <span style={{
                  background: project.statusColor, color: project.statusText,
                  padding: "6px 14px", borderRadius: 20,
                  fontSize: "0.75rem", fontWeight: 700,
                }}>
                  {project.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes dashFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dash-fadein {
          animation: dashFadeIn 0.5s ease-out both;
        }
      `}</style>
    </div>
  );
}
