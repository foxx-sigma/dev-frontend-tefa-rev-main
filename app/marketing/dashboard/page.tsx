"use client";

import Link from "next/link";

export default function MarketingDashboard() {
  return (
    <div style={{ minHeight: "100vh", background: "#fdf4ff", display: "flex", fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: "260px", background: "white", borderRight: "1px solid #fae8ff", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px", borderBottom: "1px solid #fae8ff", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#d946ef", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold" }}>M</div>
          <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#4a044e" }}>Marketing Hub</span>
        </div>
        <nav style={{ padding: "24px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <a href="#" style={{ padding: "12px 16px", background: "#fae8ff", color: "#d946ef", borderRadius: 8, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "1.2rem" }}>📈</span> Campaigns
          </a>
          <a href="#" style={{ padding: "12px 16px", color: "#701a75", borderRadius: 8, fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "1.2rem" }}>🎯</span> Leads
          </a>
          <a href="#" style={{ padding: "12px 16px", color: "#701a75", borderRadius: 8, fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "1.2rem" }}>📣</span> Social Media
          </a>
        </nav>
        <div style={{ padding: "24px 16px", borderTop: "1px solid #fae8ff" }}>
          <Link href="/" style={{ padding: "12px 16px", color: "#ef4444", borderRadius: 8, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "1.2rem" }}>🚪</span> Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "48px 64px", overflowY: "auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.02em", color: "#4a044e", marginBottom: 8 }}>Marketing Dashboard</h1>
            <p style={{ color: "#701a75" }}>Monitor your campaign performance and reach.</p>
          </div>
          <button style={{ padding: "10px 20px", background: "#d946ef", border: "none", borderRadius: 8, fontWeight: 600, color: "white", cursor: "pointer" }}>Create Campaign</button>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 40 }}>
          {[
            { label: "Total Reach", value: "842K", change: "+24%", icon: "👁️" },
            { label: "Conversion Rate", value: "4.8%", change: "+1.2%", icon: "⚡" },
            { label: "New Leads", value: "1,249", change: "+340", icon: "👥" }
          ].map(stat => (
            <div key={stat.label} style={{ background: "white", padding: 24, borderRadius: 16, border: "1px solid #fae8ff", boxShadow: "0 4px 6px -1px rgba(217, 70, 239, 0.05)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -20, right: -20, fontSize: "6rem", opacity: 0.05 }}>{stat.icon}</div>
              <div style={{ color: "#86198f", fontSize: "0.9rem", fontWeight: 600, marginBottom: 8, position: "relative" }}>{stat.label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, position: "relative" }}>
                <span style={{ fontSize: "2rem", fontWeight: 800, color: "#4a044e", letterSpacing: "-0.02em" }}>{stat.value}</span>
                <span style={{ color: "#10b981", fontWeight: 600, fontSize: "0.85rem" }}>{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "white", borderRadius: 16, border: "1px solid #fae8ff", padding: 32 }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: 24, color: "#4a044e" }}>Active Campaigns</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { name: "Summer Sale 2026", status: "Running", budget: "$4,500" },
              { name: "B2B Outreach", status: "Draft", budget: "$1,200" }
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 20, border: "1px solid #fae8ff", borderRadius: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "#fdf4ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>🔥</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#4a044e", fontSize: "1.05rem" }}>{c.name}</div>
                    <div style={{ color: "#86198f", fontSize: "0.85rem", marginTop: 2 }}>Budget: {c.budget}</div>
                  </div>
                </div>
                <div>
                  <span style={{ background: c.status === "Running" ? "#dcfce7" : "#f1f5f9", color: c.status === "Running" ? "#166534" : "#475569", padding: "6px 12px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 700 }}>{c.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
