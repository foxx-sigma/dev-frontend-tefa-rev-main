"use client";

import React from "react";
import AdminShell from "@/components/admin/AdminShell";
import { StatCard, ROLE_COLORS } from "@/components/DashboardLayout";
import StatusBadge from "@/components/admin/StatusBadge";
import type { StatusType } from "@/components/admin/StatusBadge";

// ─── MOCK DATA ──────────────────────────────────────────────────────────────
const STATS = [
  { label: "Menunggu Persetujuan", value: "14", icon: "", change: "+3 minggu ini" },
  { label: "Proyek Aktif", value: "28", icon: "", change: "+5 bulan ini" },
  { label: "Total Pengguna", value: "156", icon: "", change: "+12 baru" },
  { label: "Mitra Industri", value: "9", icon: "", change: "+2 baru" },
];

interface RecentItem {
  id: string;
  type: "user" | "project";
  name: string;
  description: string;
  status: StatusType;
  time: string;
  avatar: string;
}

const RECENT_ITEMS: RecentItem[] = [
  {
    id: "1",
    type: "user",
    name: "Budi Santoso",
    description: "Pendaftaran siswa baru — RPL",
    status: "Review",
    time: "2 jam lalu",
    avatar: "BS",
  },
  {
    id: "2",
    type: "project",
    name: "Aplikasi Kasir Digital",
    description: "Proyek RPL — Tim Alpha",
    status: "Running",
    time: "4 jam lalu",
    avatar: "",
  },
  {
    id: "3",
    type: "user",
    name: "Sari Amalia",
    description: "Pendaftaran guru baru — PG",
    status: "Review",
    time: "5 jam lalu",
    avatar: "SA",
  },
  {
    id: "4",
    type: "project",
    name: "Network Monitoring Tool",
    description: "Proyek TKJ — Tim Bravo",
    status: "Review",
    time: "6 jam lalu",
    avatar: "",
  },
  {
    id: "5",
    type: "user",
    name: "Dian Pratama",
    description: "Pendaftaran mitra industri — PT Maju Jaya",
    status: "Running",
    time: "1 hari lalu",
    avatar: "DP",
  },
];

// ─── PAGE ───────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const roleColor = ROLE_COLORS.admin.primary;

  return (
    <AdminShell pageTitle="Dashboard">
      {/* Greeting header */}
      <div className="mb-8 dash-fadein">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1 mb-3 bg-green-50 text-green-700 border border-green-200">
          ● Internal
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1C1C2E] tracking-tight">
          {getGreeting()},{" "}
          <span style={{ color: roleColor }}>Admin</span>
        </h1>
        <p className="text-[#6B6A7A] text-sm mt-1">
          Berikut ringkasan aktivitas platform TEFA hari ini.
        </p>
      </div>

      {/* Stat Cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 dash-fadein"
        style={{ animationDelay: "0.1s" }}
      >
        {STATS.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
            roleColor={roleColor}
          />
        ))}
      </div>

      {/* Recent Approvals */}
      <div
        className="bg-white rounded-2xl border border-[#E8E6E1] p-7 dash-fadein"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-extrabold text-[#1C1C2E]">
            Antrian Persetujuan Terbaru
          </h2>
          <a
            href="/contact-supervisor/users"
            className="text-sm font-semibold no-underline transition-colors hover:opacity-80"
            style={{ color: roleColor }}
          >
            Lihat Semua →
          </a>
        </div>

        <div className="flex flex-col">
          {RECENT_ITEMS.map((item, i) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-4 gap-4"
              style={{
                borderBottom:
                  i < RECENT_ITEMS.length - 1
                    ? "1px solid #E8E6E1"
                    : "none",
              }}
            >
              {/* Left: avatar + info */}
              <div className="flex items-center gap-4 min-w-0">
                {item.type === "user" ? (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{
                      backgroundColor: ROLE_COLORS.admin.tint,
                      color: roleColor,
                    }}
                  >
                    {item.avatar}
                  </div>
                ) : (
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                    style={{
                      backgroundColor: ROLE_COLORS.admin.tint,
                    }}
                  >
                    {item.avatar}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="font-semibold text-[#1C1C2E] text-sm truncate">
                    {item.name}
                  </div>
                  <div className="text-[#6B6A7A] text-xs mt-0.5 truncate">
                    {item.description}
                  </div>
                </div>
              </div>

              {/* Right: status + time */}
              <div className="flex items-center gap-3 shrink-0">
                <StatusBadge status={item.status} />
                <span className="text-[#6B6A7A] text-xs font-medium hidden sm:block whitespace-nowrap">
                  {item.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

// ─── UTILS ──────────────────────────────────────────────────────────────────
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Selamat pagi";
  if (hour < 17) return "Selamat siang";
  return "Selamat malam";
}
