"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

// ─── ROLE COLOR MAP ─────────────────────────────────────────────────────────
export const ROLE_COLORS = {
  admin:       { primary: "#C0272D", tint: "#FBF7F7", label: "Panel Admin" },
  guru:        { primary: "#145A32", tint: "#F0FDF4", label: "Portal Guru" },
  student_rpl: { primary: "#C0272D", tint: "#FBF7F7", label: "Portal RPL" },
  student_tkj: { primary: "#1A5276", tint: "#EFF6FF", label: "Portal TKJ" },
  student_pg:  { primary: "#5B2C6F", tint: "#F5F3FF", label: "Portal PG" },
  operator:    { primary: "#2E4057", tint: "#F1F5F9", label: "Operator Station" },
  pemasaran:   { primary: "#5B2C6F", tint: "#F5F3FF", label: "Marketing Hub" },
  pelanggan:   { primary: "#1A5276", tint: "#EFF6FF", label: "Customer Portal" },
} as const;

export type RoleKey = keyof typeof ROLE_COLORS;

// ─── INTERFACES ─────────────────────────────────────────────────────────────
export interface DashboardLayoutProps {
  role: RoleKey;
  user: {
    name: string;
    email: string;
    icon: string;
    majorLabel: string;
    isInternal?: boolean;
  };
  navItems: {
    icon: string; // emoji
    label: string;
    href: string;
    active?: boolean;
  }[];
  headerTitle: string;
  headerSubtitle?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
}

export interface StatCardProps {
  label: string;
  value: string;
  icon: string; // emoji
  change?: string;
  roleColor: string;
}

// ─── UTILS ──────────────────────────────────────────────────────────────────
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Selamat pagi";
  if (hour < 17) return "Selamat siang";
  return "Selamat malam";
}

// ─── SIDEBAR CONTENT (shared between desktop & mobile sheet) ────────────────
function SidebarContent({
  role,
  user,
  navItems,
}: Pick<DashboardLayoutProps, "role" | "user" | "navItems">) {
  const colors = ROLE_COLORS[role];
  const portalInitial = colors.label.charAt(0).toUpperCase();

  return (
    <>
      {/* 1 ─ Logo bar */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[#E8E6E1]">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
          style={{ backgroundColor: colors.primary }}
        >
          {portalInitial}
        </div>
        <span className="font-bold text-[#1C1C2E] text-[0.95rem] leading-tight">
          {colors.label}
        </span>
      </div>

      {/* 2 ─ User mini-card */}
      <div
        className="mx-4 my-4 rounded-xl p-4"
        style={{
          backgroundColor: colors.tint,
          border: `1px solid ${colors.primary}33`,
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-white font-bold text-base shrink-0"
            style={{ backgroundColor: colors.primary }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-sm text-[#1C1C2E] truncate">
              {user.name}
            </div>
            <div className="text-xs text-[#6B6A7A] truncate">{user.email}</div>
          </div>
        </div>
        <span
          className="inline-flex items-center gap-1.5 text-xs rounded-full px-3 py-1 font-semibold"
          style={{
            backgroundColor: `${colors.primary}1A`,
            color: colors.primary,
          }}
        >
          <span>{user.icon}</span>
          {user.majorLabel}
        </span>
      </div>

      {/* 3 ─ Navigation */}
      <nav className="flex-1 px-3 py-2 flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-150 no-underline"
            style={
              item.active
                ? {
                    backgroundColor: colors.tint,
                    color: colors.primary,
                    fontWeight: 600,
                    border: `1px solid ${colors.primary}26`,
                  }
                : {
                    color: "#6B6A7A",
                    border: "1px solid transparent",
                  }
            }
            onMouseEnter={(e) => {
              if (!item.active) {
                e.currentTarget.style.backgroundColor = "#F5F4F2";
                e.currentTarget.style.color = "#1C1C2E";
              }
            }}
            onMouseLeave={(e) => {
              if (!item.active) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#6B6A7A";
              }
            }}
          >
            <span className="text-lg leading-none">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* 4 ─ Separator */}
      <Separator className="bg-[#E8E6E1]" />

      {/* 5 ─ Logout */}
      <div className="px-3 pb-4 pt-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 text-sm font-semibold transition-colors duration-150 no-underline"
        >
          <span className="text-lg leading-none">🚪</span>
          Keluar
        </Link>
      </div>
    </>
  );
}

// ─── DASHBOARD LAYOUT ───────────────────────────────────────────────────────
export default function DashboardLayout({
  role,
  user,
  navItems,
  headerTitle,
  headerSubtitle,
  headerAction,
  children,
}: DashboardLayoutProps) {
  const colors = ROLE_COLORS[role];
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#F5F4F2]">
      {/* ── Desktop sidebar ─────────────────────────────────────────── */}
      <aside className="hidden md:flex w-[260px] shrink-0 flex-col bg-white border-r border-[#E8E6E1]">
        <SidebarContent role={role} user={user} navItems={navItems} />
      </aside>

      {/* ── Mobile sheet ─────────────────────────────────────────────── */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-[280px] p-0 flex flex-col bg-white"
          showCloseButton
        >
          {/* Accessible title for screen readers */}
          <SheetTitle className="sr-only">{colors.label}</SheetTitle>
          <SheetDescription className="sr-only">
            Navigasi sidebar untuk {colors.label}
          </SheetDescription>
          <SidebarContent role={role} user={user} navItems={navItems} />
        </SheetContent>
      </Sheet>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <main className="flex-1 bg-[#F5F4F2] overflow-y-auto min-w-0">
        {/* Header */}
        <header className="px-4 sm:px-8 pt-6 sm:pt-8 pb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden mb-4 p-2 -ml-2 rounded-xl hover:bg-[#E8E6E1] transition-colors cursor-pointer"
                aria-label="Buka menu navigasi"
              >
                <Menu className="w-6 h-6 text-[#1C1C2E]" />
              </button>

              {/* Internal / External badge */}
              {user.isInternal ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1 mb-3 bg-green-50 text-green-700 border border-green-200">
                  ● Internal
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1 mb-3 bg-[#F5F4F2] text-[#6B6A7A] border border-[#E8E6E1]">
                  ● Eksternal
                </span>
              )}

              {/* H1 greeting */}
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1C1C2E] tracking-tight">
                {getGreeting()},{" "}
                <span style={{ color: colors.primary }}>{user.name}</span>
              </h1>

              {/* Subtitle */}
              {headerSubtitle && (
                <p className="text-[#6B6A7A] text-sm mt-1">{headerSubtitle}</p>
              )}
            </div>

            {/* Header action slot */}
            {headerAction && (
              <div className="shrink-0 hidden sm:block">{headerAction}</div>
            )}
          </div>
        </header>

        {/* Content area */}
        <div className="px-4 sm:px-8 pb-8">{children}</div>
      </main>

      {/* Fade-in animation (scoped) */}
      <style>{`
        @keyframes dashFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .dash-fadein {
          animation: dashFadeIn 0.45s ease-out both;
        }
      `}</style>
    </div>
  );
}

// ─── STAT CARD ──────────────────────────────────────────────────────────────
export function StatCard({
  label,
  value,
  icon,
  change,
  roleColor,
}: StatCardProps) {
  return (
    <div
      className="bg-white rounded-xl border border-[#E8E6E1] p-6 relative overflow-hidden cursor-default transition-all duration-200 hover:-translate-y-0.5"
      style={{ ["--rc" as string]: roleColor }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${roleColor}4D`;
        e.currentTarget.style.boxShadow = `0 8px 24px ${roleColor}15`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E8E6E1";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Icon */}
      <span className="absolute top-5 right-5 text-2xl leading-none">
        {icon}
      </span>

      {/* Label */}
      <p className="text-sm text-[#6B6A7A] font-medium">{label}</p>

      {/* Value */}
      <p className="text-3xl font-bold text-[#1C1C2E] mt-2">{value}</p>

      {/* Change */}
      {change && (
        <p className="text-xs text-[#6B6A7A] mt-1">{change}</p>
      )}
    </div>
  );
}
