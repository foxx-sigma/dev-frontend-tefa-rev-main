"use client";

import DashboardLayout, {
  StatCard,
  ROLE_COLORS,
} from "@/components/DashboardLayout";

export default function AdminDashboard() {
  const roleColor = ROLE_COLORS.admin.primary;

  return (
    <DashboardLayout
      role="admin"
      user={{
        name: "Admin",
        email: "admin@smktelkom-mlg.sch.id",
        icon: "🛡️",
        majorLabel: "Administrator",
        isInternal: true,
      }}
      navItems={[
        { icon: "📊", label: "Overview", href: "/admin/dashboard", active: true },
        { icon: "👥", label: "Pengguna", href: "/admin/users" },
        { icon: "⚙️", label: "Pengaturan", href: "/admin/settings" },
      ]}
      headerTitle="Admin Dashboard"
      headerSubtitle="Berikut yang terjadi di platform Anda hari ini."
      headerAction={
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-[#E8E6E1] rounded-xl font-semibold text-sm text-[#1C1C2E] hover:bg-[#F5F4F2] transition-colors cursor-pointer">
            Buat Laporan
          </button>
          <button
            className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white hover:opacity-90 transition-all cursor-pointer"
            style={{
              backgroundColor: roleColor,
            }}
          >
            Kampanye Baru
          </button>
        </div>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 dash-fadein">
        <StatCard
          label="Total Pengguna"
          value="24.593"
          icon="👥"
          change="+12%"
          roleColor={roleColor}
        />
        <StatCard
          label="Proyek Aktif"
          value="1.204"
          icon="📁"
          change="+5%"
          roleColor={roleColor}
        />
        <StatCard
          label="Pendapatan"
          value="Rp 680jt"
          icon="💰"
          change="+18%"
          roleColor={roleColor}
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-[#E8E6E1] p-7 dash-fadein">
        <h2 className="text-lg font-extrabold text-[#1C1C2E] mb-6">
          Aktivitas Terbaru
        </h2>
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between pb-4"
              style={{
                borderBottom: i < 4 ? "1px solid #E8E6E1" : "none",
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    backgroundColor: ROLE_COLORS.admin.tint,
                    color: roleColor,
                  }}
                >
                  U
                </div>
                <div>
                  <div className="font-semibold text-[#1C1C2E] text-sm">
                    Pengguna baru terdaftar
                  </div>
                  <div className="text-[#6B6A7A] text-xs mt-0.5">
                    user{i}@example.com bergabung ke platform
                  </div>
                </div>
              </div>
              <div className="text-[#6B6A7A] text-xs font-medium shrink-0 ml-4">
                {i * 2} jam lalu
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
