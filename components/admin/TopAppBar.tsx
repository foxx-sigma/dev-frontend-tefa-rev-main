"use client";

import React from "react";
import { Search, Bell, LayoutGrid, Menu } from "lucide-react";

interface TopAppBarProps {
  /** Page context title shown on desktop */
  pageTitle?: string;
  /** Called when mobile menu button is clicked */
  onMenuClick?: () => void;
  /** User avatar initials */
  avatarInitial?: string;
}

export default function TopAppBar({
  pageTitle,
  onMenuClick,
  avatarInitial = "A",
}: TopAppBarProps) {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 border-b border-[#E8E6E1]"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.90)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Left section */}
      <div className="flex items-center gap-4 min-w-0 flex-1">
        {/* Mobile menu */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 -ml-2 rounded-xl hover:bg-[#F5F4F2] transition-colors cursor-pointer"
            aria-label="Buka menu navigasi"
          >
            <Menu className="w-5 h-5 text-[#1C1C2E]" />
          </button>
        )}

        {/* Desktop page title */}
        {pageTitle && (
          <h1 className="hidden md:block text-lg font-bold text-[#1C1C2E] truncate tracking-tight">
            {pageTitle}
          </h1>
        )}

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
          <input
            type="text"
            placeholder="Search across dashboard..."
            className="w-full h-10 pl-10 pr-4 rounded-[10px] border-[1.5px] border-[#E8E6E1] bg-[#FAFAF9] text-sm placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C0272D] focus:ring-2 focus:ring-[#C0272D]/10 transition-colors"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-1.5 ml-4 shrink-0">
        {/* Notifications */}
        <button
          className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#F5F4F2] transition-colors cursor-pointer"
          aria-label="Notifikasi"
          title="Notifikasi"
        >
          <Bell className="w-5 h-5 text-[#6B6A7A]" />
          {/* Notification dot */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#C0272D] rounded-full ring-2 ring-white" />
        </button>

        {/* Apps grid */}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#F5F4F2] transition-colors cursor-pointer"
          aria-label="Menu aplikasi"
          title="Menu aplikasi"
        >
          <LayoutGrid className="w-5 h-5 text-[#6B6A7A]" />
        </button>

        {/* User avatar */}
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold bg-[#C0272D] hover:ring-2 hover:ring-[#C0272D]/30 transition-all cursor-pointer ml-1"
          aria-label="Profil pengguna"
          title="Profil pengguna"
        >
          {avatarInitial}
        </button>
      </div>
    </header>
  );
}
