"use client";

import { useState, useEffect } from "react";
import DashboardLayout, {
  StatCard,
  ROLE_COLORS,
  type RoleKey,
} from "@/components/DashboardLayout";

interface UserData {
  name: string;
  email: string;
  userType: string;
  category: string;
  majorLabel: string;
  majorFull: string;
  color: string;
  icon: string;
  isInternal: boolean;
}

const defaultUser: UserData = {
  name: "User",
  email: "user@example.com",
  userType: "external",
  category: "customer",
  majorLabel: "External User",
  majorFull: "Customer — External User",
  color: "#64748b",
  icon: "👤",
  isInternal: false,
};

// Map user category to role key
function categoryToRole(category: string): RoleKey {
  switch (category) {
    case "student_rpl": return "student_rpl";
    case "student_tkj": return "student_tkj";
    case "student_pg":  return "student_pg";
    case "guru":        return "guru";
    default:            return "pelanggan";
  }
}

export default function UserDashboard() {
  const [user, setUser] = useState<UserData>(defaultUser);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("tefa_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        // fallback to default
      }
    }
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const role = categoryToRole(user.category);
  const roleColor = ROLE_COLORS[role].primary;

  return (
    <DashboardLayout
      role={role}
      user={{
        name: user.name,
        email: user.email,
        icon: user.icon,
        majorLabel: user.majorLabel,
        isInternal: user.isInternal,
      }}
      navItems={[
        { icon: "🏠", label: "Home", href: "/user/dashboard", active: true },
        { icon: "📁", label: "Proyek Saya", href: "/user/projects" },
        { icon: "📊", label: "Progress", href: "/user/progress" },
        { icon: "💬", label: "Pesan", href: "/user/messages" },
        { icon: "👤", label: "Profil", href: "/user/profile" },
      ]}
      headerTitle="User Dashboard"
      headerSubtitle={
        user.isInternal
          ? `${user.majorFull} — Pantau proyek dan progres belajar Anda.`
          : "Selamat datang di TEFA SMK Telkom Malang. Jelajahi layanan yang tersedia."
      }
      headerAction={
        <button
          className="px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:opacity-90 cursor-pointer"
          style={{
            backgroundColor: roleColor,
            boxShadow: `0 4px 14px ${roleColor}30`,
          }}
        >
          + Proyek Baru
        </button>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 dash-fadein">
        <StatCard
          label="Proyek Aktif"
          value="3"
          icon="🚀"
          change="+1 minggu ini"
          roleColor={roleColor}
        />
        <StatCard
          label="Selesai"
          value="12"
          icon="✅"
          change="2 bulan ini"
          roleColor={roleColor}
        />
        <StatCard
          label="Menunggu Review"
          value="1"
          icon="⏳"
          change="Menunggu feedback"
          roleColor={roleColor}
        />
      </div>

      {/* Role / Major Info Card */}
      <div
        className="rounded-2xl p-7 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 dash-fadein"
        style={{
          background: `linear-gradient(135deg, ${roleColor}0D, ${roleColor}08)`,
          border: `1.5px solid ${roleColor}25`,
        }}
      >
        <div className="flex items-center gap-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
            style={{
              background: `linear-gradient(135deg, ${roleColor}, ${roleColor}bb)`,
              boxShadow: `0 8px 20px ${roleColor}30`,
            }}
          >
            {user.icon}
          </div>
          <div>
            <div className="font-extrabold text-base text-[#1C1C2E] mb-1">
              {user.majorLabel}
            </div>
            <div className="text-[#6B6A7A] text-sm">{user.majorFull}</div>
          </div>
        </div>
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold"
          style={{
            background: user.isInternal ? "#dcfce7" : "#f3f4f6",
            color: user.isInternal ? "#166534" : "#374151",
          }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: user.isInternal ? "#22c55e" : "#9ca3af",
            }}
          />
          {user.isInternal ? "Telkom Internal" : "Akun Eksternal"}
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-[#E8E6E1] p-7 dash-fadein">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-extrabold text-[#1C1C2E]">
            Proyek Anda
          </h2>
          <a
            href="#"
            className="font-semibold text-sm no-underline"
            style={{ color: roleColor }}
          >
            Lihat Semua →
          </a>
        </div>
        <div className="flex flex-col gap-3">
          {[
            {
              name: "E-Commerce Redesign",
              tag: "Web Dev",
              status: "In Progress",
              statusColor: "#dcfce7",
              statusText: "#166534",
              time: "Diperbarui 2 hari lalu",
            },
            {
              name: "Network Monitoring Setup",
              tag: "Infra",
              status: "Review",
              statusColor: "#fef3c7",
              statusText: "#92400e",
              time: "Diperbarui 5 hari lalu",
            },
          ].map((project, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-5 border border-[#E8E6E1] rounded-xl hover:border-[#6B6A7A]/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                  style={{ backgroundColor: ROLE_COLORS[role].tint }}
                >
                  🚀
                </div>
                <div>
                  <div className="font-bold text-[#1C1C2E]">{project.name}</div>
                  <div className="text-[#6B6A7A] text-xs mt-1 flex items-center gap-2">
                    <span className="bg-[#F5F4F2] px-2 py-0.5 rounded text-[0.7rem] font-semibold text-[#6B6A7A]">
                      {project.tag}
                    </span>
                    {project.time}
                  </div>
                </div>
              </div>
              <span
                className="text-xs font-bold px-3.5 py-1.5 rounded-full"
                style={{
                  backgroundColor: project.statusColor,
                  color: project.statusText,
                }}
              >
                {project.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
