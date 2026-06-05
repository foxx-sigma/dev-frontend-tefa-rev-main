"use client";

import Link from "next/link";

export default function OperatorDashboard() {
  return (
    <div style={{ minHeight: "100vh", background: "#f0fdf4", display: "flex", fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: "260px", background: "white", borderRight: "1px solid #dcfce7", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px", borderBottom: "1px solid #dcfce7", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold" }}>O</div>
          <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#14532d" }}>Operator Station</span>
        </div>
        <nav style={{ padding: "24px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <a href="#" style={{ padding: "12px 16px", background: "#dcfce7", color: "#16a34a", borderRadius: 8, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "1.2rem" }}>🛠️</span> Operations
          </a>
          <a href="#" style={{ padding: "12px 16px", color: "#166534", borderRadius: 8, fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "1.2rem" }}>📋</span> Tasks
          </a>
          <a href="#" style={{ padding: "12px 16px", color: "#166534", borderRadius: 8, fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "1.2rem" }}>⚠️</span> Alerts
          </a>
        </nav>
        <div style={{ padding: "24px 16px", borderTop: "1px solid #dcfce7" }}>
          <Link href="/" style={{ padding: "12px 16px", color: "#ef4444", borderRadius: 8, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "1.2rem" }}>🚪</span> Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "48px 64px", overflowY: "auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.02em", color: "#14532d", marginBottom: 8 }}>System Operations</h1>
            <p style={{ color: "#166534" }}>Monitor active services and handle ongoing tasks.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "white", padding: "8px 16px", borderRadius: 8, border: "1px solid #dcfce7", fontWeight: 600, color: "#16a34a" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }}></div>
            All Systems Operational
          </div>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 40 }}>
          {[
            { label: "Pending Tasks", value: "14", priority: "High" },
            { label: "Resolved Issues", value: "102", priority: "Normal" },
            { label: "Uptime", value: "99.9%", priority: "Optimal" }
          ].map(stat => (
            <div key={stat.label} style={{ background: "white", padding: 24, borderRadius: 16, border: "1px solid #dcfce7", boxShadow: "0 4px 6px -1px rgba(34, 197, 94, 0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ color: "#166534", fontSize: "0.9rem", fontWeight: 600 }}>{stat.label}</div>
                <div style={{ background: "#f0fdf4", color: "#16a34a", fontSize: "0.7rem", padding: "4px 8px", borderRadius: 12, fontWeight: 700 }}>{stat.priority}</div>
              </div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#14532d", letterSpacing: "-0.02em" }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "white", borderRadius: 16, border: "1px solid #dcfce7", padding: 32 }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: 24, color: "#14532d" }}>Recent Logs</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { msg: "Server backup completed successfully", time: "10 mins ago", type: "info" },
              { msg: "High CPU usage detected on Node 3", time: "1 hour ago", type: "warning" },
              { msg: "New deployment pushed to production", time: "3 hours ago", type: "info" },
            ].map((log, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", border: "1px solid #dcfce7", borderRadius: 12, background: log.type === "warning" ? "#fffbeb" : "white" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ fontSize: "1.2rem" }}>{log.type === "warning" ? "⚠️" : "✅"}</div>
                  <div style={{ fontWeight: 600, color: "#14532d", fontSize: "0.95rem" }}>{log.msg}</div>
                </div>
                <div style={{ color: "#166534", fontSize: "0.85rem", fontWeight: 500 }}>{log.time}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
