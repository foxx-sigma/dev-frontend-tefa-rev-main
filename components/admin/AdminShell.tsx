"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ROLE_COLORS } from "@/components/DashboardLayout";
import TopAppBar from "./TopAppBar";

// ─── NAV CONFIG ─────────────────────────────────────────────────────────────
const ADMIN_NAV = [
  { icon: "", label: "Dashboard", href: "/contact-supervisor/dashboard" },
  { icon: "", label: "Projects", href: "/contact-supervisor/projects" },
  { icon: "", label: "Inventory", href: "/contact-supervisor/inventory" },
  { icon: "", label: "Financials", href: "/contact-supervisor/financials" },
  { icon: "", label: "Users", href: "/contact-supervisor/users" },
  { icon: "", label: "Settings", href: "/contact-supervisor/settings" },
] as const;

// ─── PROPS ──────────────────────────────────────────────────────────────────
interface AdminShellProps {
  children: React.ReactNode;
  /** Page title shown in the TopAppBar */
  pageTitle?: string;
}

// ─── SIDEBAR CONTENT ────────────────────────────────────────────────────────
function AdminSidebar({ onNavClick }: { onNavClick?: () => void }) {
  const pathname = usePathname();
  const colors = ROLE_COLORS.admin;

  return (
    <>
      {/* 1 ─ Logo bar */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[#E8E6E1]">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
          style={{ backgroundColor: colors.primary }}
        >
          
        </div>
        <div className="min-w-0">
          <div className="font-bold text-[#1C1C2E] text-[0.95rem] leading-tight">
            TEFA SMK Telkom
          </div>
          <div className="text-xs text-[#6B6A7A] leading-tight">
            Management System
          </div>
        </div>
      </div>

      {/* 2 ─ Navigation */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {ADMIN_NAV.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavClick}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-150 no-underline"
              style={
                isActive
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
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "#F5F4F2";
                  e.currentTarget.style.color = "#1C1C2E";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#6B6A7A";
                }
              }}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* 3 ─ Footer: New Project CTA */}
      <div className="px-4 pb-3">
        <Link
          href="/contact-supervisor/projects"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:opacity-90 no-underline cursor-pointer"
          style={{
            backgroundColor: colors.primary,
            boxShadow: `0 4px 14px ${colors.primary}30`,
          }}
        >
          <span className="text-base leading-none">＋</span>
          New Project
        </Link>
      </div>

      <Separator className="bg-[#E8E6E1]" />

      {/* 4 ─ Help Center + Logout */}
      <div className="px-3 pb-4 pt-2 flex flex-col gap-0.5">
        <Link
          href="#"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#6B6A7A] hover:bg-[#F5F4F2] hover:text-[#1C1C2E] text-sm font-medium transition-colors duration-150 no-underline"
        >
          <span className="text-lg leading-none"></span>
          Help Center
        </Link>
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

// ─── ADMIN SHELL ────────────────────────────────────────────────────────────
export default function AdminShell({ children, pageTitle }: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#F5F4F2]">
      {/* ── Desktop sidebar ────────────────────────────────────────── */}
      <aside className="hidden md:flex w-[260px] shrink-0 flex-col bg-white border-r border-[#E8E6E1] sticky top-0 h-screen overflow-y-auto">
        <AdminSidebar />
      </aside>

      {/* ── Mobile sheet ───────────────────────────────────────────── */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-[280px] p-0 flex flex-col bg-white"
          showCloseButton
        >
          <SheetTitle className="sr-only">Panel Admin</SheetTitle>
          <SheetDescription className="sr-only">
            Navigasi sidebar untuk Panel Admin
          </SheetDescription>
          <AdminSidebar onNavClick={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* ── Main content ───────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* TopAppBar */}
        <TopAppBar
          pageTitle={pageTitle}
          onMenuClick={() => setMobileOpen(true)}
          avatarInitial="A"
        />

        {/* Content area */}
        <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8">
          {children}
        </main>
      </div>

      {/* Fade-in animation */}
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
