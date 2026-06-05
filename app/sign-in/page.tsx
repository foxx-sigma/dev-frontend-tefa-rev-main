"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* ─── Token Warna ──────────────────────────────────────────────────────────── */
const C = {
  primary: '#C0272D',
  primaryDark: '#991B1F',
  tint: '#FBF7F7',
  heading: '#1C1C2E',
  body: '#3B3B58',
  muted: '#9CA3AF',
  border: '#E8E6E1',
  surface: '#FAFAF9',
} as const;

/* ─── Skema Zod ────────────────────────────────────────────────────────────── */
const signInSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Minimal 8 karakter"),
});

type SignInValues = z.infer<typeof signInSchema>;

/* ─── Komponen Halaman ─────────────────────────────────────────────────────── */
export default function SignIn() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: SignInValues) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Set a mock access token so middleware allows entry
      document.cookie = "accessToken=mock_token_123; path=/; max-age=86400";
      router.push("/user/dashboard");
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* ══════ PANEL KIRI ══════ */}
      <div className="bg-white flex flex-col justify-center">
        <div className="max-w-[480px] mx-auto w-full px-12 py-10 animate-in fade-in slide-in-from-bottom-3 duration-500">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-10 no-underline">
            <img
              src="/Logo-SMK Telkom.svg"
              alt="Logo SMK Telkom"
              className="h-8 w-auto object-contain"
            />
            <span className="font-bold text-[#1C1C2E]">
              TEFA <span className="text-[#C0272D]">SMK Telkom Malang</span>
            </span>
          </Link>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-[#1C1C2E] tracking-tight">
            Selamat Datang Kembali
          </h1>
          <p className="text-sm text-[#6B6A7A] mt-1.5 mb-7 leading-6">
            Masuk ke akun Anda untuk mengakses dashboard dan mengelola proyek.
          </p>

          {/* Tombol Google */}
          <Button variant="outline" className="w-full gap-2 h-11 text-sm font-semibold" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Lanjutkan dengan Google
          </Button>

          {/* Pembatas */}
          <div className="flex items-center gap-3 my-5">
            <hr className="flex-1 border-[#E8E6E1]" />
            <span className="text-xs text-[#9CA3AF]">atau dengan email</span>
            <hr className="flex-1 border-[#E8E6E1]" />
          </div>

          {/* Formulir */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* Email */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-[#374151]">Alamat Email</Label>
              <Input
                type="email"
                placeholder="email@contoh.com"
                className={`h-11 rounded-[10px] border-[1.5px] bg-[#FAFAF9] px-4 text-sm placeholder:text-[#9CA3AF] focus-visible:border-[#C0272D] focus-visible:ring-[#C0272D]/10 ${errors.email ? "border-red-500" : "border-[#E8E6E1]"}`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Kata Sandi */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label className="text-xs font-semibold text-[#374151]">Kata Sandi</Label>
                <a href="#" className="text-xs text-[#C0272D] font-semibold no-underline hover:underline">
                  Lupa kata sandi?
                </a>
              </div>
              <div className="relative">
                <Input
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  className={`h-11 rounded-[10px] border-[1.5px] bg-[#FAFAF9] px-4 pr-11 text-sm placeholder:text-[#9CA3AF] focus-visible:border-[#C0272D] focus-visible:ring-[#C0272D]/10 ${errors.password ? "border-red-500" : "border-[#E8E6E1]"}`}
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#9CA3AF] hover:text-[#374151] transition-colors"
                  onClick={() => setShowPw(!showPw)}
                  tabIndex={-1}
                >
                  {showPw ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Tombol Masuk */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-[10px] text-sm font-bold transition-all duration-200 hover:-translate-y-px hover:shadow-lg"
              style={{ backgroundColor: C.primary }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.primaryDark)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.primary)}
            >
              {loading ? (
                <>
                  <Loader2 className="size-[18px] animate-spin" />
                  Memproses...
                </>
              ) : (
                "Masuk"
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-sm text-[#6B6A7A] text-center mt-6">
            Belum punya akun?{" "}
            <Link href="/sign-up" className="text-[#C0272D] font-semibold no-underline hover:underline">
              Daftar
            </Link>
          </p>
        </div>
      </div>

      {/* ══════ PANEL KANAN ══════ */}
      <div
        className="hidden md:flex flex-col items-center justify-center p-16 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)` }}
      >
        {/* Lingkaran Dekoratif */}
        <div className="absolute -top-16 -right-16 w-[300px] h-[300px] rounded-full bg-white/8" />
        <div className="absolute -bottom-20 -left-10 w-[340px] h-[340px] rounded-full bg-white/5" />
        <div className="absolute top-[45%] left-[10%] w-[100px] h-[100px] rounded-full bg-white/6" />

        <div className="relative z-10 text-center max-w-[400px]">
          {/* Ikon Mengambang */}
          <div
            className="w-20 h-20 bg-white/15 rounded-2xl border border-white/25 flex items-center justify-center mx-auto mb-8"
            style={{ animation: "float 3s ease-in-out infinite" }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>

          <h2 className="text-white font-bold text-2xl text-center leading-snug mb-4">
            Teaching Factory<br />SMK Telkom Malang
          </h2>
          <p className="text-white/80 text-sm text-center leading-7 mb-10">
            Menjembatani pendidikan dan industri melalui pengalaman proyek nyata.
          </p>

          {/* Strip Statistik */}
          <div className="bg-white/12 border border-white/20 rounded-2xl flex divide-x divide-white/20">
            {[
              { v: "50+", l: "Proyek" },
              { v: "20+", l: "Mitra" },
              { v: "3", l: "Jurusan" },
            ].map((s) => (
              <div key={s.l} className="flex-1 text-center px-8 py-5">
                <div className="text-white font-extrabold text-2xl">{s.v}</div>
                <div className="text-white/70 text-xs uppercase tracking-wider mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Animasi Float (scoped style) */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
        `}</style>
      </div>
    </div>
  );
}
