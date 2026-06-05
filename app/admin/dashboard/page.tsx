"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: "260px", background: "white", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#e63946", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold" }}>A</div>
          <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#111" }}>Admin Panel</span>
        </div>
        <nav style={{ padding: "24px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <a href="#" style={{ padding: "12px 16px", background: "#fdf2f2", color: "#e63946", borderRadius: 8, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "1.2rem" }}>📊</span> Overview
          </a>
          <a href="#" style={{ padding: "12px 16px", color: "#4b5563", borderRadius: 8, fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "1.2rem" }}>👥</span> Users
          </a>
          <a href="#" style={{ padding: "12px 16px", color: "#4b5563", borderRadius: 8, fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "1.2rem" }}>⚙️</span> Settings
          </a>
        </nav>
        <div style={{ padding: "24px 16px", borderTop: "1px solid #f3f4f6" }}>
          <Link href="/" style={{ padding: "12px 16px", color: "#ef4444", borderRadius: 8, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "1.2rem" }}>🚪</span> Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "48px 64px", overflowY: "auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.02em", color: "#111", marginBottom: 8 }}>Welcome back, Admin</h1>
            <p style={{ color: "#6b7280" }}>Here is what is happening with your platform today.</p>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <button style={{ padding: "10px 20px", background: "white", border: "1px solid #e5e7eb", borderRadius: 8, fontWeight: 600, color: "#374151", cursor: "pointer" }}>Generate Report</button>
            <button style={{ padding: "10px 20px", background: "#e63946", border: "none", borderRadius: 8, fontWeight: 600, color: "white", cursor: "pointer" }}>New Campaign</button>
          </div>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 40 }}>
          {[
            { label: "Total Users", value: "24,593", change: "+12%" },
            { label: "Active Projects", value: "1,204", change: "+5%" },
            { label: "Revenue", value: "$45,231.89", change: "+18%" }
          ].map(stat => (
            <div key={stat.label} style={{ background: "white", padding: 24, borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
              <div style={{ color: "#6b7280", fontSize: "0.9rem", fontWeight: 600, marginBottom: 8 }}>{stat.label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <span style={{ fontSize: "2rem", fontWeight: 800, color: "#111", letterSpacing: "-0.02em" }}>{stat.value}</span>
                <span style={{ color: "#10b981", fontWeight: 600, fontSize: "0.85rem" }}>{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "white", borderRadius: 16, border: "1px solid #e5e7eb", padding: 32 }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: 24, color: "#111" }}>Recent Activity</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 16, borderBottom: i < 4 ? "1px solid #f3f4f6" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#fdf2f2", display: "flex", alignItems: "center", justifyContent: "center", color: "#e63946" }}>U</div>
                  <div>
                    <div style={{ fontWeight: 600, color: "#111", fontSize: "0.95rem" }}>New user registered</div>
                    <div style={{ color: "#6b7280", fontSize: "0.85rem" }}>user{i}@example.com joined the platform</div>
                  </div>
                </div>
                <div style={{ color: "#9ca3af", fontSize: "0.85rem" }}>{i * 2} hours ago</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
