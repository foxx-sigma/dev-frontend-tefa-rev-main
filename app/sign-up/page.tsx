"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff, AlertCircle } from "lucide-react";

import { classifyEmail, type EmailClassification } from "../utils/emailClassifier";
import { authApi } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
const signUpSchema = z
  .object({
    fullName: z.string().min(2, "Minimal 2 karakter"),
    phone: z.string().min(10, "Minimal 10 digit").max(13, "Maksimal 13 digit"),
    address: z.string().min(5, "Minimal 5 karakter"),
    postalCode: z.string().length(5, "Kode pos harus 5 digit"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(8, "Minimal 8 karakter"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Kata sandi tidak sama",
    path: ["confirm"],
  });

type SignUpValues = z.infer<typeof signUpSchema>;

/* ─── Komponen Halaman ─────────────────────────────────────────────────────── */
export default function SignUp() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [classification, setClassification] = useState<EmailClassification | null>(null);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      postalCode: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  /* ─── Klasifikasi email secara reaktif ──────────────────────────────────── */
  const emailValue = watch("email");

  useEffect(() => {
    if (emailValue && emailValue.includes("@")) {
      setClassification(classifyEmail(emailValue));
      setApiError(null);
    } else {
      setClassification(null);
    }
  }, [emailValue]);

  /* ─── Submit ────────────────────────────────────────────────────────────── */
  const onSubmit = async (data: SignUpValues) => {
    setApiError(null);
    setLoading(true);
    try {
      await authApi.register({
        full_name: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address,
        postal_code: data.postalCode,
      });
      sessionStorage.setItem("pendingVerificationEmail", data.email);
      router.push("/verify-email");
    } catch (err: unknown) {
      setApiError(
        err instanceof Error ? err.message : "Terjadi kesalahan. Coba beberapa saat lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleContinue = () => {
    setGoogleLoading(true);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
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
            Buat Akun Baru
          </h1>
          <p className="text-sm text-[#6B6A7A] mt-1.5 mb-7 leading-6">
            Bergabung dengan TEFA SMK Telkom dan mulai berkolaborasi dalam proyek industri nyata.
          </p>

          {/* Tombol Google */}
          <Button
            variant="outline"
            className="w-full gap-2 h-11 text-sm font-semibold"
            type="button"
            onClick={() => setShowGoogleModal(true)}
          >
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

          {/* ─── Formulir ─────────────────────────────────────────────────── */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Nama Lengkap */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-[#374151]">Nama Lengkap</Label>
              <Input
                type="text"
                placeholder="Masukkan nama lengkap"
                className={`h-11 rounded-[10px] border-[1.5px] bg-[#FAFAF9] px-4 text-sm placeholder:text-[#9CA3AF] focus-visible:border-[#C0272D] focus-visible:ring-[#C0272D]/10 ${errors.fullName ? "border-red-500" : "border-[#E8E6E1]"}`}
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Telepon */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-[#374151]">Nomor Telepon</Label>
              <Input
                type="tel"
                placeholder="081234567890"
                className={`h-11 rounded-[10px] border-[1.5px] bg-[#FAFAF9] px-4 text-sm placeholder:text-[#9CA3AF] focus-visible:border-[#C0272D] focus-visible:ring-[#C0272D]/10 ${errors.phone ? "border-red-500" : "border-[#E8E6E1]"}`}
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Alamat */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-[#374151]">Alamat</Label>
              <Input
                type="text"
                placeholder="Jl. Contoh No. 123"
                className={`h-11 rounded-[10px] border-[1.5px] bg-[#FAFAF9] px-4 text-sm placeholder:text-[#9CA3AF] focus-visible:border-[#C0272D] focus-visible:ring-[#C0272D]/10 ${errors.address ? "border-red-500" : "border-[#E8E6E1]"}`}
                {...register("address")}
              />
              {errors.address && (
                <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>
              )}
            </div>

            {/* Kode Pos */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-[#374151]">Kode Pos</Label>
              <Input
                type="text"
                placeholder="65123"
                className={`h-11 rounded-[10px] border-[1.5px] bg-[#FAFAF9] px-4 text-sm placeholder:text-[#9CA3AF] focus-visible:border-[#C0272D] focus-visible:ring-[#C0272D]/10 ${errors.postalCode ? "border-red-500" : "border-[#E8E6E1]"}`}
                {...register("postalCode")}
              />
              {errors.postalCode && (
                <p className="text-xs text-red-500 mt-1">{errors.postalCode.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-[#374151]">Alamat Email</Label>
              <Input
                type="email"
                placeholder="anda@student.smktelkom-mlg.sch.id"
                className={`h-11 rounded-[10px] border-[1.5px] bg-[#FAFAF9] px-4 text-sm placeholder:text-[#9CA3AF] focus-visible:border-[#C0272D] focus-visible:ring-[#C0272D]/10 ${errors.email ? "border-red-500" : "border-[#E8E6E1]"}`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
              )}
              {/* Lencana Klasifikasi Email */}
              {classification && (
                <div
                  className="mt-2.5 inline-flex items-center gap-2 px-4 py-2 rounded-[10px] text-[0.82rem] font-semibold animate-in fade-in slide-in-from-top-1 duration-300"
                  style={{
                    background: classification.isInternal
                      ? `${classification.color}12`
                      : "#f3f4f6",
                    color: classification.color,
                    border: `1.5px solid ${classification.color}30`,
                  }}
                >
                  <span className="text-base">{classification.icon}</span>
                  <span>{classification.majorLabel}</span>
                  <span
                    className="text-[0.7rem] px-2 py-0.5 rounded-full font-bold"
                    style={{
                      background: classification.isInternal
                        ? `${classification.color}20`
                        : "#e5e7eb",
                    }}
                  >
                    {classification.isInternal ? "Internal Telkom" : "Eksternal"}
                  </span>
                </div>
              )}
            </div>

            {/* Kata Sandi + Konfirmasi (grid 2 kolom) */}
            <div className="grid grid-cols-2 gap-3">
              {/* Kata Sandi */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#374151]">Kata Sandi</Label>
                <div className="relative">
                  <Input
                    type={showPw ? "text" : "password"}
                    placeholder="Min. 8 karakter"
                    className={`h-11 rounded-[10px] border-[1.5px] bg-[#FAFAF9] px-4 pr-11 text-sm placeholder:text-[#9CA3AF] focus-visible:border-[#C0272D] focus-visible:ring-[#C0272D]/10 ${errors.password ? "border-red-500" : "border-[#E8E6E1]"}`}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#9CA3AF] hover:text-[#374151] transition-colors"
                    onClick={() => setShowPw(!showPw)}
                    tabIndex={-1}
                  >
                    {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Konfirmasi */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#374151]">Konfirmasi</Label>
                <Input
                  type={showPw ? "text" : "password"}
                  placeholder="Ulangi sandi"
                  className={`h-11 rounded-[10px] border-[1.5px] bg-[#FAFAF9] px-4 text-sm placeholder:text-[#9CA3AF] focus-visible:border-[#C0272D] focus-visible:ring-[#C0272D]/10 ${errors.confirm ? "border-red-500" : "border-[#E8E6E1]"}`}
                  {...register("confirm")}
                />
                {errors.confirm && (
                  <p className="text-xs text-red-500 mt-1">{errors.confirm.message}</p>
                )}
              </div>
            </div>

            {/* Syarat & Ketentuan */}
            <div className="flex items-start gap-2.5">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(v) => setAgreed(v === true)}
                className="mt-0.5"
              />
              <Label htmlFor="terms" className="text-xs text-[#6B6A7A] leading-5 font-normal cursor-pointer">
                Saya menyetujui{" "}
                <a href="#" className="text-[#C0272D] font-semibold no-underline hover:underline">
                  Syarat Layanan
                </a>{" "}
                dan{" "}
                <a href="#" className="text-[#C0272D] font-semibold no-underline hover:underline">
                  Kebijakan Privasi
                </a>
              </Label>
            </div>

            {/* Error API */}
            {apiError && (
              <Alert variant="destructive" className="rounded-[10px]">
                <AlertCircle className="size-4" />
                <AlertDescription className="text-sm font-semibold">
                  {apiError}
                </AlertDescription>
              </Alert>
            )}

            {/* Tombol Kirim */}
            <Button
              type="submit"
              disabled={loading || !agreed}
              className="w-full h-11 rounded-[10px] text-sm font-bold transition-all duration-200 hover:-translate-y-px hover:shadow-lg disabled:opacity-60"
              style={{ backgroundColor: C.primary }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = C.primaryDark;
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = C.primary;
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="size-[18px] animate-spin" />
                  Memverifikasi...
                </>
              ) : (
                "Buat Akun"
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-sm text-[#6B6A7A] text-center mt-6">
            Sudah punya akun?{" "}
            <Link href="/sign-in" className="text-[#C0272D] font-semibold no-underline hover:underline">
              Masuk
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
            Mulai Perjalananmu<br />Bersama Kami
          </h2>
          <p className="text-white/80 text-sm text-center leading-7 mb-10">
            Dapatkan pengalaman langsung dengan proyek industri nyata dan berkembang bersama mentor profesional.
          </p>

          {/* Daftar Fitur */}
          <div className="flex flex-col gap-3 w-full">
            {[
              { icon: "🎯", text: "Akses proyek industri nyata" },
              { icon: "👨‍🏫", text: "Belajar dari mentor profesional" },
              { icon: "📜", text: "Dapatkan sertifikat industri" },
            ].map((f) => (
              <div
                key={f.text}
                className="bg-white/12 rounded-xl p-4 border border-white/20 flex items-center gap-4"
              >
                <span style={{ fontSize: "1.2rem" }}>{f.icon}</span>
                <span className="text-white/90 text-sm">{f.text}</span>
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

      {/* ══════ MODAL GOOGLE ══════ */}
      {showGoogleModal && (
        <div
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setShowGoogleModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-10 max-w-[440px] w-[90%] shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-3 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-extrabold text-[#1C1C2E] mb-2 text-center">
              Daftar dengan Google?
            </h3>
            <p className="text-[#6B6A7A] text-sm leading-relaxed text-center mb-7">
              Profil Google Anda akan digunakan untuk membuat akun TEFA.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-11 font-bold"
                onClick={() => setShowGoogleModal(false)}
              >
                Batal
              </Button>
              <Button
                className="flex-1 h-11 font-bold text-white"
                style={{ backgroundColor: C.primary }}
                onClick={handleGoogleContinue}
                disabled={googleLoading}
              >
                {googleLoading ? <Loader2 className="size-[18px] animate-spin" /> : "Lanjutkan"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}