"use client";

/**
 * /app/verify/page.tsx
 *
 * Halaman ini dipanggil saat user MENGKLIK LINK dari email.
 * URL format: /verify?token=<uuid_dari_backend>
 *
 * Flow:
 *   User klik link di email
 *   → Browser buka /verify?token=xxx
 *   → Halaman ini ambil token dari URL
 *   → Call POST /auth/verify-email dengan token
 *   → Backend cek token di DB, set isVerified=true
 *   → Tampilkan sukses / error
 */

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { authApi } from "@/lib/api";

// ─── Status yang mungkin terjadi ────────────────────────────────────────────
type Status = "verifying" | "success" | "invalid" | "expired" | "already_verified";

// ─── Komponen utama dibungkus Suspense karena useSearchParams() ──────────────
function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<Status>("verifying");
  const [userName, setUserName] = useState("");
  const [countdown, setCountdown] = useState(5); // redirect otomatis ke dashboard

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("invalid");
      return;
    }

    verifyToken(token);
  }, [searchParams]);

  // Auto-redirect ke dashboard setelah sukses
  useEffect(() => {
    if (status !== "success") return;
    if (countdown <= 0) {
      router.push("/dashboard");
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [status, countdown, router]);

  // ─── Call backend untuk verifikasi token ──────────────────────────────────
  const verifyToken = async (token: string) => {
    try {
      const data = await authApi.verifyEmail({ token });
      setUserName(data.user?.name || "");
      setStatus("success");
      sessionStorage.removeItem("pendingVerificationEmail");
    } catch (err: any) {
      if (err.code === "token_expired") {
        setStatus("expired");
      } else if (err.code === "already_verified") {
        setStatus("already_verified");
      } else {
        setStatus("invalid");
      }
    }
  };

  // ─── UI per status ─────────────────────────────────────────────────────────
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

      <div style={{
        background: "white",
        borderRadius: 24,
        padding: "56px 48px",
        maxWidth: 460,
        width: "100%",
        boxShadow: "0 20px 60px rgba(0,0,0,.08), 0 0 0 1px rgba(0,0,0,.04)",
        textAlign: "center",
        animation: "cardIn .5s cubic-bezier(.16,1,.3,1)",
      }}>

        {/* ── VERIFYING: Loading spinner ── */}
        {status === "verifying" && (
          <>
            <div style={{
              width: 88, height: 88, borderRadius: 24,
              background: "linear-gradient(135deg, #fdf2f2, #fee2e2)",
              border: "2px solid #fca5a5",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 28px",
            }}>
              <div style={{
                width: 40, height: 40, border: "3.5px solid #fca5a5",
                borderTopColor: "#e63946", borderRadius: "50%",
                animation: "spin .7s linear infinite",
              }} />
            </div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#111", marginBottom: 10 }}>
              Memverifikasi...
            </h1>
            <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.7 }}>
              Mohon tunggu, kami sedang memproses verifikasi email kamu.
            </p>
          </>
        )}

        {/* ── SUCCESS ── */}
        {status === "success" && (
          <>
            <div style={{
              width: 88, height: 88, borderRadius: 24,
              background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
              border: "2px solid #86efac",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 28px",
              animation: "scaleIn .4s cubic-bezier(.16,1,.3,1)",
            }}>
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>

            <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#111", marginBottom: 10 }}>
              Email Terverifikasi! 🎉
            </h1>
            <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 8 }}>
              {userName ? `Halo ${userName}, akun` : "Akun"} kamu telah berhasil diverifikasi dan siap digunakan.
            </p>
            <p style={{ color: "#9ca3af", fontSize: "0.82rem", marginBottom: 28 }}>
              Kamu akan otomatis diarahkan ke dashboard dalam{" "}
              <strong style={{ color: "#e63946" }}>{countdown} detik</strong>...
            </p>

            {/* Progress bar countdown */}
            <div style={{ background: "#f3f4f6", borderRadius: 8, height: 6, marginBottom: 28, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                background: "linear-gradient(90deg, #e63946, #c1121f)",
                borderRadius: 8,
                width: `${(countdown / 5) * 100}%`,
                transition: "width 1s linear",
              }} />
            </div>

            <Link href="/dashboard" style={{
              display: "block", padding: "14px 24px",
              background: "#e63946", color: "white",
              borderRadius: 10, fontWeight: 700, fontSize: "0.95rem",
              textDecoration: "none", transition: "background .2s",
            }}>
              Pergi ke Dashboard →
            </Link>
          </>
        )}

        {/* ── ALREADY VERIFIED ── */}
        {status === "already_verified" && (
          <>
            <div style={{
              width: 88, height: 88, borderRadius: 24,
              background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
              border: "2px solid #93c5fd",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 28px",
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#111", marginBottom: 10 }}>
              Sudah Terverifikasi
            </h1>
            <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 28 }}>
              Email kamu sudah pernah diverifikasi sebelumnya. Silakan langsung masuk ke akun kamu.
            </p>
            <Link href="/sign-in" style={{
              display: "block", padding: "14px 24px",
              background: "#2563eb", color: "white",
              borderRadius: 10, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none",
            }}>
              Masuk ke Akun
            </Link>
          </>
        )}

        {/* ── EXPIRED ── */}
        {status === "expired" && (
          <>
            <div style={{
              width: 88, height: 88, borderRadius: 24,
              background: "linear-gradient(135deg, #fffbeb, #fef3c7)",
              border: "2px solid #fcd34d",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 28px",
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#111", marginBottom: 10 }}>
              Link Kadaluarsa
            </h1>
            <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 28 }}>
              Link verifikasi ini sudah tidak berlaku (expired setelah 24 jam). Minta link baru untuk melanjutkan.
            </p>
            <Link href="/verify-email" style={{
              display: "block", padding: "14px 24px",
              background: "#d97706", color: "white",
              borderRadius: 10, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none",
            }}>
              Kirim Ulang Email Verifikasi
            </Link>
          </>
        )}

        {/* ── INVALID ── */}
        {status === "invalid" && (
          <>
            <div style={{
              width: 88, height: 88, borderRadius: 24,
              background: "linear-gradient(135deg, #fdf2f2, #fee2e2)",
              border: "2px solid #fca5a5",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 28px",
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e63946" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#111", marginBottom: 10 }}>
              Link Tidak Valid
            </h1>
            <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 28 }}>
              Link verifikasi ini tidak valid atau sudah digunakan sebelumnya. Pastikan kamu mengklik link yang benar dari email terbaru.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Link href="/verify-email" style={{
                display: "block", padding: "14px 24px",
                background: "#e63946", color: "white",
                borderRadius: 10, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none",
              }}>
                Kirim Ulang Email Verifikasi
              </Link>
              <Link href="/sign-in" style={{
                display: "block", padding: "13px 24px",
                border: "1.5px solid #e5e7eb", color: "#374151",
                borderRadius: 10, fontWeight: 600, fontSize: "0.9rem", textDecoration: "none",
              }}>
                Kembali ke Sign In
              </Link>
            </div>
          </>
        )}

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        @keyframes cardIn { from { opacity:0; transform:translateY(20px) scale(.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes scaleIn { from { transform:scale(.5); opacity:0; } to { transform:scale(1); opacity:1; } }
        @keyframes spin { to { transform:rotate(360deg); } }
      `}</style>
    </div>
  );
}

// Wrapped dengan Suspense karena Next.js 13+ requirement untuk useSearchParams
export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 40, height: 40, border: "3px solid #fca5a5", borderTopColor: "#e63946", borderRadius: "50%", animation: "spin .7s linear infinite" }} />
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}