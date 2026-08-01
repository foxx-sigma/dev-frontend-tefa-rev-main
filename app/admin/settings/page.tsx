"use client";

import React, { useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { ROLE_COLORS } from "@/components/DashboardLayout";
import { Save, ExternalLink } from "lucide-react";

// ─── PAGE ───────────────────────────────────────────────────────────────────
export default function AdminSettingsPage() {
  const roleColor = ROLE_COLORS.admin.primary;

  // Mock pre-filled institution data
  const [form, setForm] = useState({
    schoolName: "SMK Telkom Malang",
    tagline: "Teaching Factory — Menghubungkan Pendidikan dengan Industri",
    email: "tefa@smktelkom-mlg.sch.id",
    phone: "(0341) 478585",
    address: "Jl. Danau Ranau, Sawojajar, Kec. Kedungkandang, Kota Malang, Jawa Timur 65139",
    website: "https://smktelkom-mlg.sch.id",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    // Simulate save
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminShell pageTitle="Settings">
      {/* Page header */}
      <div className="mb-6 dash-fadein">
        <h2 className="text-2xl sm:text-[2rem] font-bold text-[#1C1C2E] tracking-tight leading-tight">
          Pengaturan
        </h2>
        <p className="text-[#6B6A7A] text-[0.95rem] mt-1">
          Konfigurasi profil institusi dan preferensi admin
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Institution profile form */}
        <div
          className="lg:col-span-2 bg-white rounded-2xl border border-[#E8E6E1] p-7 dash-fadein"
          style={{ animationDelay: "0.1s" }}
        >
          <h3 className="text-lg font-extrabold text-[#1C1C2E] mb-6">
            Profil Institusi
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* School Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#6B6A7A] mb-2">
                Nama Sekolah
              </label>
              <input
                type="text"
                value={form.schoolName}
                onChange={(e) => handleChange("schoolName", e.target.value)}
                className="w-full h-11 px-4 rounded-[10px] border-[1.5px] border-[#E8E6E1] bg-[#FAFAF9] text-sm text-[#1C1C2E] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C0272D] focus:ring-2 focus:ring-[#C0272D]/10 transition-colors"
              />
            </div>

            {/* Tagline */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#6B6A7A] mb-2">
                Tagline / Deskripsi Singkat
              </label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => handleChange("tagline", e.target.value)}
                className="w-full h-11 px-4 rounded-[10px] border-[1.5px] border-[#E8E6E1] bg-[#FAFAF9] text-sm text-[#1C1C2E] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C0272D] focus:ring-2 focus:ring-[#C0272D]/10 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#6B6A7A] mb-2">
                Email Kontak
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full h-11 px-4 rounded-[10px] border-[1.5px] border-[#E8E6E1] bg-[#FAFAF9] text-sm text-[#1C1C2E] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C0272D] focus:ring-2 focus:ring-[#C0272D]/10 transition-colors"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-[#6B6A7A] mb-2">
                Telepon
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full h-11 px-4 rounded-[10px] border-[1.5px] border-[#E8E6E1] bg-[#FAFAF9] text-sm text-[#1C1C2E] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C0272D] focus:ring-2 focus:ring-[#C0272D]/10 transition-colors"
              />
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#6B6A7A] mb-2">
                Alamat
              </label>
              <textarea
                rows={3}
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full px-4 py-3 rounded-[10px] border-[1.5px] border-[#E8E6E1] bg-[#FAFAF9] text-sm text-[#1C1C2E] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C0272D] focus:ring-2 focus:ring-[#C0272D]/10 transition-colors resize-none"
              />
            </div>

            {/* Website */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#6B6A7A] mb-2">
                Website
              </label>
              <input
                type="url"
                value={form.website}
                onChange={(e) => handleChange("website", e.target.value)}
                className="w-full h-11 px-4 rounded-[10px] border-[1.5px] border-[#E8E6E1] bg-[#FAFAF9] text-sm text-[#1C1C2E] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C0272D] focus:ring-2 focus:ring-[#C0272D]/10 transition-colors"
              />
            </div>
          </div>

          {/* Save button */}
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-[#E8E6E1]">
            <button
              onClick={handleSave}
              className="h-11 px-6 flex items-center gap-2 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:opacity-90 cursor-pointer"
              style={{
                backgroundColor: roleColor,
                boxShadow: `0 4px 14px ${roleColor}30`,
              }}
            >
              <Save className="w-4 h-4" />
              Simpan Perubahan
            </button>
            {saved && (
              <span className="text-sm font-medium text-green-600 animate-in fade-in duration-300">
                ✓ Berhasil disimpan
              </span>
            )}
          </div>
        </div>

        {/* Right: Quick links */}
        <div className="flex flex-col gap-6">
          {/* Manage Users shortcut */}
          <div
            className="bg-white rounded-2xl border border-[#E8E6E1] p-7 dash-fadein"
            style={{ animationDelay: "0.15s" }}
          >
            <h3 className="text-lg font-extrabold text-[#1C1C2E] mb-4">
              Manajemen Pengguna
            </h3>
            <p className="text-sm text-[#6B6A7A] mb-5">
              Kelola persetujuan pendaftaran pengguna baru dan tinjau antrian permintaan yang masuk.
            </p>
            <a
              href="/admin/users"
              className="flex items-center gap-2 text-sm font-semibold no-underline transition-colors hover:opacity-80"
              style={{ color: roleColor }}
            >
              <ExternalLink className="w-4 h-4" />
              Buka Persetujuan Antrean
            </a>
          </div>

          {/* System info */}
          <div
            className="bg-white rounded-2xl border border-[#E8E6E1] p-7 dash-fadein"
            style={{ animationDelay: "0.2s" }}
          >
            <h3 className="text-lg font-extrabold text-[#1C1C2E] mb-4">
              Informasi Sistem
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { label: "Versi Platform", value: "TEFA v2.0" },
                { label: "Framework", value: "Next.js 16.2.4" },
                { label: "Terakhir Deploy", value: "1 Aug 2026" },
                { label: "Status Server", value: "● Online" },
              ].map((info) => (
                <div
                  key={info.label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-[#6B6A7A]">{info.label}</span>
                  <span className="font-medium text-[#1C1C2E]">
                    {info.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Notification preferences placeholder */}
          <div
            className="bg-white rounded-2xl border border-[#E8E6E1] p-7 dash-fadein"
            style={{ animationDelay: "0.25s" }}
          >
            <h3 className="text-lg font-extrabold text-[#1C1C2E] mb-4">
              Preferensi Notifikasi
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { label: "Email notifikasi pendaftaran baru", checked: true },
                { label: "Email ringkasan mingguan", checked: true },
                { label: "Notifikasi proyek baru", checked: false },
              ].map((pref) => (
                <label
                  key={pref.label}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    defaultChecked={pref.checked}
                    className="w-4 h-4 rounded accent-[#C0272D] cursor-pointer"
                  />
                  <span className="text-sm text-[#3B3B58]">{pref.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
