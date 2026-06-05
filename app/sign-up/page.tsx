"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { classifyEmail, type EmailClassification } from "../utils/emailClassifier";
import { authApi } from "@/lib/api";


console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

export default function SignUp() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [classification, setClassification] = useState<EmailClassification | null>(null);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (email && email.includes("@")) {
      setClassification(classifyEmail(email));
      setError(null);
    } else {
      setClassification(null);
    }
  }, [email]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirm) { setError("Passwords do not match!"); return; }
    setLoading(true);
    try {
      await authApi.register({ 
        full_name: fullName, 
        email, 
        password, 
        phone, 
        address, 
        postal_code: postalCode 
      });
      sessionStorage.setItem("pendingVerificationEmail", email);
      router.push("/verify-email");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan. Coba beberapa saat lagi.");
    } finally {
      setLoading(false);
    }
  };  

  const handleGoogleContinue = () => {
    setGoogleLoading(true);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
      <div style={{ background: "#fff", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div className="fi" style={{ padding: "48px 64px", maxWidth: 540, margin: "0 auto", width: "100%" }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
            <img src="/Logo-SMK Telkom.svg" alt="Logo" style={{ height: 36, width: "auto" }} />
            <span style={{ fontWeight: 800, fontSize: "1rem", color: "#111" }}>TEFA <span style={{ color: "#e63946" }}>SMK Telkom Malang</span></span>
          </Link>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 8, color: "#111" }}>Create your account</h1>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: 28, lineHeight: 1.6 }}>Join TEFA SMK Telkom and start collaborating on real industry projects.</p>
          <button className="sb" style={{ marginBottom: 24 }} onClick={() => setShowGoogleModal(true)} type="button">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
            <span style={{ color: "#9ca3af", fontSize: "0.8rem", fontWeight: 500 }}>or sign up with email</span>
            <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
          </div>
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Full Name</label>
              <input className="ai" type="text" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Phone Number</label>
              <input className="ai" type="tel" placeholder="081234567890" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Address</label>
              <input className="ai" type="text" placeholder="Jl. Example No. 123" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Postal Code</label>
              <input className="ai" type="text" placeholder="65123" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email Address</label>
              <input className="ai" type="email" placeholder="you@student.smktelkom-mlg.sch.id" value={email} onChange={(e) => setEmail(e.target.value)} required />
              {classification && (
                <div className="badge-appear" style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 10, fontSize: "0.82rem", fontWeight: 600, background: classification.isInternal ? `${classification.color}12` : "#f3f4f6", color: classification.color, border: `1.5px solid ${classification.color}30` }}>
                  <span style={{ fontSize: "1rem" }}>{classification.icon}</span>
                  <span>{classification.majorLabel}</span>
                  <span style={{ fontSize: "0.7rem", background: classification.isInternal ? `${classification.color}20` : "#e5e7eb", padding: "2px 8px", borderRadius: 20, fontWeight: 700 }}>{classification.isInternal ? "Telkom Internal" : "External"}</span>
                </div>
              )}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Password</label>
                <div style={{ position: "relative" }}>
                  <input className="ai" type={showPw ? "text" : "password"} placeholder="Min 8 chars" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} style={{ paddingRight: 44 }} />
                  <button type="button" className="pt" onClick={() => setShowPw(!showPw)} tabIndex={-1}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{showPw ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><line x1="1" y1="1" x2="23" y2="23"/></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}</svg>
                  </button>
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: 6 }}>Confirm</label>
                <input className="ai" type={showPw ? "text" : "password"} placeholder="Re-enter" value={confirm} onChange={(e) => setConfirm(e.target.value)} required minLength={8} />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <input type="checkbox" required style={{ marginTop: 3, accentColor: "#e63946" }} />
              <span style={{ fontSize: "0.8rem", color: "#6b7280", lineHeight: 1.5 }}>I agree to the <a href="#" style={{ color: "#e63946", textDecoration: "none", fontWeight: 600 }}>Terms of Service</a> and <a href="#" style={{ color: "#e63946", textDecoration: "none", fontWeight: 600 }}>Privacy Policy</a></span>
            </div>
            {error && (
              <div style={{ background: "#fef2f2", border: "1.5px solid #fee2e2", color: "#991b1b", padding: "12px 16px", borderRadius: 10, fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}
            <button className="ab" type="submit" disabled={loading}>
              {loading ? <><div className="sp" /> Sending verification email...</> : "Create Account"}
            </button>
          </form>
          <p style={{ textAlign: "center", marginTop: 24, color: "#6b7280", fontSize: "0.88rem" }}>Already have an account?{" "}<Link href="/sign-in" style={{ color: "#e63946", fontWeight: 700, textDecoration: "none" }}>Sign in</Link></p>
        </div>
      </div>
      <div style={{ background: "linear-gradient(135deg, #e63946 0%, #c1121f 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 64, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,.08)" }} />
        <div style={{ position: "absolute", bottom: -80, left: -40, width: 340, height: 340, borderRadius: "50%", background: "rgba(255,255,255,.05)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 400 }}>
          <div style={{ width: 80, height: 80, background: "rgba(255,255,255,.15)", borderRadius: 22, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", border: "1px solid rgba(255,255,255,.25)", animation: "float 3s ease-in-out infinite" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </div>
          <h2 style={{ color: "white", fontSize: "1.8rem", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 16, lineHeight: 1.3 }}>Start Your Journey<br />With Us Today</h2>
          <p style={{ color: "rgba(255,255,255,.8)", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: 40 }}>Get hands-on experience with real industry projects and grow with professional mentors.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "left" }}>
            {[{ icon: "🎯", text: "Access real industry projects" }, { icon: "👨‍🏫", text: "Learn from professional mentors" }, { icon: "📜", text: "Earn industry certificates" }].map((f) => (
              <div key={f.text} style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,.12)", borderRadius: 10, padding: "13px 16px", border: "1px solid rgba(255,255,255,.2)" }}>
                <span style={{ fontSize: "1.1rem" }}>{f.icon}</span>
                <span style={{ color: "rgba(255,255,255,.9)", fontSize: "0.88rem", fontWeight: 500 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showGoogleModal && (
        <div className="modal-overlay" onClick={() => setShowGoogleModal(false)}>
          <div className="modal-card modal-appear" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#111", marginBottom: 8, textAlign: "center" }}>Sign up with Google?</h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.65, textAlign: "center", marginBottom: 28 }}>Your Google profile will be used to set up your TEFA account.</p>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setShowGoogleModal(false)} style={{ flex: 1, padding: "13px 20px", border: "1.5px solid #e5e7eb", borderRadius: 10, background: "#fff", color: "#374151", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
              <button onClick={handleGoogleContinue} disabled={googleLoading} style={{ flex: 1, padding: "13px 20px", border: "none", borderRadius: 10, background: "#e63946", color: "#fff", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {googleLoading ? <div className="sp" /> : "Continue"}
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .ai{width:100%;border:1.5px solid #e5e7eb;border-radius:10px;padding:14px 16px;font-size:0.9rem;font-family:inherit;outline:none;transition:border-color .2s,box-shadow .2s;background:#fafafa}
        .ai:focus{border-color:#e63946;box-shadow:0 0 0 3px rgba(230,57,70,.08);background:#fff}
        .ai::placeholder{color:#9ca3af}
        .ab{width:100%;background:#e63946;color:#fff;border:none;padding:14px 24px;border-radius:10px;font-weight:700;font-size:0.95rem;font-family:inherit;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:background .2s,transform .1s}
        .ab:hover{background:#c1121f;transform:translateY(-1px)}
        .ab:disabled{opacity:.7;cursor:not-allowed;transform:none}
        .sb{width:100%;display:flex;align-items:center;justify-content:center;gap:8px;padding:12px 16px;border:1.5px solid #e5e7eb;border-radius:10px;background:#fff;font-family:inherit;font-size:0.88rem;font-weight:600;color:#374151;cursor:pointer;transition:border-color .2s}
        .sb:hover{border-color:#e63946;background:#fdf2f2;color:#e63946}
        .pt{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#9ca3af;padding:4px}
        @keyframes spin{to{transform:rotate(360deg)}}
        .sp{width:18px;height:18px;border:2.5px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite}
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .fi{animation:fadeIn .5s ease-out}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes badgeAppear{from{opacity:0;transform:translateY(-4px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
        .badge-appear{animation:badgeAppear .3s ease-out}
        .modal-overlay{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.45);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center}
        .modal-card{background:white;border-radius:20px;padding:40px 36px;max-width:440px;width:90%;box-shadow:0 25px 60px rgba(0,0,0,.2)}
        @keyframes modalAppear{from{opacity:0;transform:scale(.92) translateY(12px)}to{opacity:1;transform:scale(1) translateY(0)}}
        .modal-appear{animation:modalAppear .35s cubic-bezier(.16,1,.3,1)}
      `}</style>
    </div>
  );
}