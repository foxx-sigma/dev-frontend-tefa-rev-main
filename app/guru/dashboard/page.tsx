"use client";

import { useState, useEffect } from "react";
import DashboardLayout, {
  StatCard,
  ROLE_COLORS,
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
  name: "Teacher",
  email: "teacher@smktelkom-mlg.sch.id",
  userType: "internal",
  category: "guru",
  majorLabel: "Guru",
  majorFull: "Guru — SMK Telkom Malang",
  color: "#16a34a",
  icon: "👨‍🏫",
  isInternal: true,
};

export default function GuruDashboard() {
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

  const roleColor = ROLE_COLORS.guru.primary;

  return (
    <DashboardLayout
      role="guru"
      user={{
        name: user.name,
        email: user.email,
        icon: user.icon,
        majorLabel: user.majorLabel,
        isInternal: user.isInternal,
      }}
      navItems={[
        { icon: "🏠", label: "Dashboard", href: "/guru/dashboard", active: true },
        { icon: "👨‍🎓", label: "Siswa", href: "/guru/students" },
        { icon: "📚", label: "Proyek", href: "/guru/projects" },
        { icon: "📊", label: "Penilaian", href: "/guru/grades" },
      ]}
      headerTitle={`Guru Dashboard`}
      headerSubtitle="Kelola siswa dan proyek industri secara efektif."
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 dash-fadein">
        <StatCard
          label="Proyek Dibimbing"
          value="8"
          icon="📚"
          roleColor={roleColor}
        />
        <StatCard
          label="Siswa Aktif"
          value="42"
          icon="👨‍🎓"
          change="+3 minggu ini"
          roleColor={roleColor}
        />
        <StatCard
          label="Laporan Pending"
          value="3"
          icon="📄"
          change="Menunggu review"
          roleColor={roleColor}
        />
      </div>
    </DashboardLayout>
  );
}
