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
  name: "Customer",
  email: "customer@example.com",
  userType: "external",
  category: "customer",
  majorLabel: "Customer",
  majorFull: "External Customer",
  color: "#3b82f6",
  icon: "👤",
  isInternal: false,
};

export default function CustDashboard() {
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

  const roleColor = ROLE_COLORS.pelanggan.primary;

  return (
    <DashboardLayout
      role="pelanggan"
      user={{
        name: user.name,
        email: user.email,
        icon: user.icon,
        majorLabel: user.majorLabel,
        isInternal: user.isInternal,
      }}
      navItems={[
        { icon: "🏠", label: "Overview", href: "/cust/dashboard", active: true },
        { icon: "🛍️", label: "Pesanan Saya", href: "/cust/orders" },
        { icon: "💳", label: "Tagihan", href: "/cust/billing" },
        { icon: "🎧", label: "Bantuan", href: "/cust/support" },
      ]}
      headerTitle="Customer Dashboard"
      headerSubtitle="Pantau pesanan proyek Anda dan komunikasi dengan tim TEFA."
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 dash-fadein">
        <StatCard
          label="Pesanan Aktif"
          value="1"
          icon="🛍️"
          roleColor={roleColor}
        />
        <StatCard
          label="Total Pengeluaran"
          value="Rp 6,3jt"
          icon="💳"
          change="+Rp 2,1jt bulan ini"
          roleColor={roleColor}
        />
        <StatCard
          label="Tiket Bantuan"
          value="0"
          icon="🎧"
          change="Tidak ada tiket terbuka"
          roleColor={roleColor}
        />
      </div>
    </DashboardLayout>
  );
}
