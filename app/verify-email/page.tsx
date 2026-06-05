"use client";

/**
 * /app/verify-email/page.tsx
 *
 * Halaman ini tampil SETELAH user berhasil register.
 * Fungsinya: memberitahu user untuk cek inbox emailnya.
 *
 * Flow:
 *   sign-up → (backend kirim email) → halaman ini
 *   → user buka email → klik link → /verify?token=xxx
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { authApi } from "@/lib/api";

export default function VerifyEmailPage() {
  const [email, setEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState<"idle" | "sent" | "error">("idle");
  const [countdown, setCountdown] = useState(0); // cooldown resend (detik)

  // Ambil email dari sessionStorage yang disimpan saat register
  useEffect(() => {
    const stored = sessionStorage.getItem("pendingVerificationEmail");
    if (stored) setEmail(stored);
  }, []);

  // Countdown timer untuk tombol resend
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  // ─── Resend email verifikasi ──────────────────────────────────────────────
  const handleResend = async () => {
    if (!email || countdown > 0) return;
    setResendLoading(true);
    setResendStatus("idle");

    try {
      await authApi.resendVerification({ email });
      setResendStatus("sent");
      setCountdown(60); // cooldown 60 detik
    } catch {
      setResendStatus("error");
    } finally {
      setResendLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fdf2f2 0%, #fff 50%, #fdf2f2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>

      {/* Background decorative circles */}
      <div style={{ position: "fixed", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "rgba(230,57,70,.05)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: -80, left: -80, width: 350, height: 350, borderRadius: "50%", background: "rgba(230,57,70,.04)", pointerEvents: "none" }} />

      <div style={{
        background: "white",
        borderRadius: 24,
        padding: "56px 48px",
        maxWidth: 480,
        width: "100%",
        boxShadow: "0 20px 60px rgba(0,0,0,.08), 0 0 0 1px rgba(0,0,0,.04)",
        textAlign: "center",
        animation: "cardIn .5s cubic-bezier(.16,1,.3,1)",
        position: "relative",
      }}>

        {/* Envelope icon animasi */}
        <div style={{
          width: 88,
          height: 88,
          background: "linear-gradient(135deg, #fdf2f2, #fee2e2)",
          borderRadius: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 28px",
          border: "2px solid #fca5a5",
          animation: "float 3s ease-in-out infinite",
          position: "relative",
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e63946" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          {/* Notif dot */}
          <div style={{
            position: "absolute",
            top: -4, right: -4,
            width: 20, height: 20,
            background: "#e63946",
            borderRadius: "50%",
            border: "3px solid white",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "white", fontSize: "0.6rem", fontWeight: 900 }}>1</span>
          </div>
        </div>

        <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#111", letterSpacing: "-0.02em", marginBottom: 10 }}>
          Verifikasi Email Kamu
        </h1>
        <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 24 }}>
          Kami telah mengirim link verifikasi ke:
        </p>

        {/* Email display */}
        <div style={{
          background: "#f9fafb",
          border: "1.5px solid #e5e7eb",
          borderRadius: 12,
          padding: "14px 20px",
          marginBottom: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <span style={{ fontWeight: 700, color: "#111", fontSize: "0.92rem" }}>
            {email || "email kamu"}
          </span>
        </div>

        {/* Step-by-step guide */}
        <div style={{
          background: "#f9fafb",
          borderRadius: 14,
          padding: "20px 24px",
          marginBottom: 28,
          textAlign: "left",
        }}>
          <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
            Langkah selanjutnya
          </p>
          {[
            { step: "1", text: "Buka inbox email kamu" },
            { step: "2", text: "Cari email dari TEFA SMK Telkom" },
            { step: "3", text: "Klik tombol \"Verify Email\" di email" },
            { step: "4", text: "Kamu akan diarahkan ke dashboard" },
          ].map((item) => (
            <div key={item.step} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div style={{
                width: 26, height: 26, minWidth: 26,
                background: "#e63946",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.72rem", fontWeight: 900, color: "white",
              }}>{item.step}</div>
              <span style={{ color: "#374151", fontSize: "0.87rem" }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Resend status feedback */}
        {resendStatus === "sent" && (
          <div style={{
            background: "#f0fdf4", border: "1.5px solid #bbf7d0",
            color: "#166534", borderRadius: 10,
            padding: "12px 16px", fontSize: "0.85rem", fontWeight: 600,
            display: "flex", alignItems: "center", gap: 8, marginBottom: 16,
            animation: "fadeUp .3s ease",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Email berhasil dikirim ulang! Cek inbox kamu.
          </div>
        )}
        {resendStatus === "error" && (
          <div style={{
            background: "#fef2f2", border: "1.5px solid #fee2e2",
            color: "#991b1b", borderRadius: 10,
            padding: "12px 16px", fontSize: "0.85rem", fontWeight: 600,
            display: "flex", alignItems: "center", gap: 8, marginBottom: 16,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Gagal mengirim ulang. Coba beberapa saat lagi.
          </div>
        )}

        {/* Resend button */}
        <button
          onClick={handleResend}
          disabled={resendLoading || countdown > 0}
          style={{
            width: "100%",
            padding: "13px 24px",
            border: "1.5px solid #e5e7eb",
            borderRadius: 10,
            background: countdown > 0 ? "#f3f4f6" : "white",
            color: countdown > 0 ? "#9ca3af" : "#374151",
            fontWeight: 600,
            fontSize: "0.9rem",
            fontFamily: "inherit",
            cursor: countdown > 0 ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "all .2s",
            marginBottom: 12,
          }}
        >
          {resendLoading
            ? <><div className="sp-dark" /> Mengirim...</>
            : countdown > 0
            ? `Kirim ulang dalam ${countdown}s`
            : <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
                </svg>
                Kirim Ulang Email
              </>}
        </button>

        {/* Back to sign in */}
        <Link href="/sign-in" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          color: "#6b7280", fontSize: "0.85rem", textDecoration: "none",
          padding: "10px", borderRadius: 8, transition: "color .2s",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Kembali ke Sign In
        </Link>

        {/* Footer note */}
        <p style={{ marginTop: 24, color: "#d1d5db", fontSize: "0.76rem", borderTop: "1px solid #f3f4f6", paddingTop: 20 }}>
          Email tidak masuk? Cek folder <strong>Spam</strong> atau <strong>Promotions</strong> kamu.
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        @keyframes cardIn { from { opacity:0; transform:translateY(20px) scale(.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { to { transform:rotate(360deg); } }
        .sp-dark { width:16px; height:16px; border:2px solid #d1d5db; border-top-color:#374151; border-radius:50%; animation:spin .6s linear infinite; }
      `}</style>
    </div>
  );
}