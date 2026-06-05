"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  // FETCHING API TEMPLATE
  const [apiData, setApiData] = useState<any>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setApiLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setApiData(result);
      } catch (err: any) {
        setApiError(err.message);
      } finally {
        setApiLoading(false);
      }
    };
    fetchData();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Set a mock access token so middleware allows entry
      document.cookie = "accessToken=mock_token_123; path=/; max-age=86400"; // 1 day expiry
      router.push(`/${role}/dashboard`);
    }, 1500);
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
      {/* Left — Form */}
      <div style={{ background: "#fff", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="fi" style={{ padding: "48px 64px", maxWidth: 540, margin: "0 auto", width: "100%" }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 48 }}>
            <img
              src="/Logo-SMK Telkom.svg"
              alt="Logo SMK Telkom"
              style={{ height: 36, width: "auto", objectFit: "contain" }}
            />
            <span style={{ fontWeight: 800, fontSize: "1rem", color: "#111" }}>TEFA <span style={{ color: "#e63946" }}>SMK Telkom Malang</span></span>
          </Link>

          <h1 style={{ fontSize: "1.8rem", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 8, color: "#111" }}>Welcome back</h1>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: 32, lineHeight: 1.6 }}>Sign in to your account to access your dashboard and manage projects.</p>

          {/* Google only */}
          <button className="sb" style={{ marginBottom: 24 }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
            Continue with Google
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
            <span style={{ color: "#9ca3af", fontSize: "0.8rem", fontWeight: 500 }}>or continue with email</span>
            <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
          </div>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email Address</label>
                <input className="ai" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Role</label>
                <select className="ai" value={role} onChange={(e) => setRole(e.target.value)} required style={{ appearance: "auto" }}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="marketing">Marketing</option>
                  <option value="operator">Operator</option>
                </select>
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "#374151" }}>Password</label>
                <a href="#" style={{ fontSize: "0.8rem", color: "#e63946", textDecoration: "none", fontWeight: 600 }}>Forgot password?</a>
              </div>
              <div style={{ position: "relative" }}>
                <input className="ai" type={showPw ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ paddingRight: 44 }} />
                <button type="button" className="pt" onClick={() => setShowPw(!showPw)} tabIndex={-1}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {showPw ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" /><line x1="1" y1="1" x2="23" y2="23" /></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>}
                  </svg>
                </button>
              </div>
            </div>
            <button className="ab" type="submit" disabled={loading}>
              {loading ? <div className="sp" /> : "Sign In"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 28, color: "#6b7280", fontSize: "0.88rem" }}>
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" style={{ color: "#e63946", fontWeight: 700, textDecoration: "none" }}>Create account</Link>
          </p>
        </div>
      </div>

      {/* Right — Red Brand Panel */}
      <div className="bp" style={{ background: "linear-gradient(135deg, #e63946 0%, #c1121f 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 64, position: "relative", overflow: "hidden" }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,.08)" }} />
        <div style={{ position: "absolute", bottom: -80, left: -40, width: 340, height: 340, borderRadius: "50%", background: "rgba(255,255,255,.05)" }} />
        <div style={{ position: "absolute", top: "45%", left: "10%", width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,.06)" }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 400 }}>
          {/* Animated icon */}
          <div style={{ width: 80, height: 80, background: "rgba(255,255,255,.15)", borderRadius: 22, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", border: "1px solid rgba(255,255,255,.25)", animation: "float 3s ease-in-out infinite" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
          </div>

          <h2 style={{ color: "white", fontSize: "1.8rem", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 16, lineHeight: 1.3 }}>
            Teaching Factory<br />SMK Telkom Malang
          </h2>
          <p style={{ color: "rgba(255,255,255,.8)", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: 40 }}>
            Bridging education and industry through real-world project experience.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: 0, background: "rgba(255,255,255,.12)", borderRadius: 14, padding: "20px 0", border: "1px solid rgba(255,255,255,.2)" }}>
            {[{ v: "50+", l: "Projects" }, { v: "20+", l: "Partners" }, { v: "3", l: "Majors" }].map((s, i) => (
              <div key={s.l} style={{ flex: 1, textAlign: "center", borderRight: i < 2 ? "1px solid rgba(255,255,255,.2)" : "none" }}>
                <div style={{ color: "white", fontWeight: 900, fontSize: "1.6rem", letterSpacing: "-0.02em" }}>{s.v}</div>
                <div style={{ color: "rgba(255,255,255,.7)", fontSize: "0.75rem", fontWeight: 600, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .ai { width: 100%; border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 14px 16px; font-size: 0.9rem; font-family: inherit; outline: none; transition: border-color 0.2s, box-shadow 0.2s; background: #fafafa; }
        .ai:focus { border-color: #e63946; box-shadow: 0 0 0 3px rgba(230, 57, 70, 0.08); background: #fff; }
        .ai::placeholder { color: #9ca3af; }

        .ab { width: 100%; background: #e63946; color: #fff; border: none; padding: 14px 24px; border-radius: 10px; font-weight: 700; font-size: 0.95rem; font-family: inherit; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: background 0.2s, transform 0.1s, box-shadow 0.2s; }
        .ab:hover { background: #c1121f; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(230, 57, 70, 0.3); }
        .ab:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

        .sb { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 16px; border: 1.5px solid #e5e7eb; border-radius: 10px; background: #fff; font-family: inherit; font-size: 0.88rem; font-weight: 600; color: #374151; cursor: pointer; transition: border-color 0.2s, background 0.2s; }
        .sb:hover { border-color: #e63946; background: #fdf2f2; color: #e63946; }

        .pt { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #9ca3af; display: flex; padding: 4px; }
        .pt:hover { color: #374151; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .sp { width: 18px; height: 18px; border: 2.5px solid rgba(255, 255, 255, 0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.6s linear infinite; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .fi { animation: fadeIn 0.5s ease-out; }
      `}</style>
    </div>
  );
}
