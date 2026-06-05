"use client";

import DashboardLayout, {
  StatCard,
  ROLE_COLORS,
} from "@/components/DashboardLayout";

export default function OperatorDashboard() {
  const roleColor = ROLE_COLORS.operator.primary;

  return (
    <DashboardLayout
      role="operator"
      user={{
        name: "Operator",
        email: "operator@smktelkom-mlg.sch.id",
        icon: "🛠️",
        majorLabel: "Operator",
        isInternal: true,
      }}
      navItems={[
        { icon: "🛠️", label: "Operasi", href: "/operator/dashboard", active: true },
        { icon: "📋", label: "Tugas", href: "/operator/tasks" },
        { icon: "⚠️", label: "Peringatan", href: "/operator/alerts" },
      ]}
      headerTitle="Operator Dashboard"
      headerSubtitle="Monitor layanan aktif dan tangani tugas yang sedang berjalan."
      headerAction={
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-[#E8E6E1] font-semibold text-sm text-green-600">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          Semua Sistem Operasional
        </div>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 dash-fadein">
        <StatCard
          label="Tugas Pending"
          value="14"
          icon="📋"
          change="Prioritas tinggi"
          roleColor={roleColor}
        />
        <StatCard
          label="Masalah Teratasi"
          value="102"
          icon="✅"
          change="Normal"
          roleColor={roleColor}
        />
        <StatCard
          label="Uptime"
          value="99.9%"
          icon="⚡"
          change="Optimal"
          roleColor={roleColor}
        />
      </div>

      {/* Recent Logs */}
      <div className="bg-white rounded-2xl border border-[#E8E6E1] p-7 dash-fadein">
        <h2 className="text-lg font-extrabold text-[#1C1C2E] mb-6">
          Log Terbaru
        </h2>
        <div className="flex flex-col gap-4">
          {[
            {
              msg: "Backup server berhasil diselesaikan",
              time: "10 menit lalu",
              type: "info",
            },
            {
              msg: "Penggunaan CPU tinggi terdeteksi di Node 3",
              time: "1 jam lalu",
              type: "warning",
            },
            {
              msg: "Deployment baru berhasil ke production",
              time: "3 jam lalu",
              type: "info",
            },
          ].map((log, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-5 border border-[#E8E6E1] rounded-xl transition-colors"
              style={{
                backgroundColor:
                  log.type === "warning" ? "#fffbeb" : "white",
              }}
            >
              <div className="flex items-center gap-4">
                <div className="text-xl">
                  {log.type === "warning" ? "⚠️" : "✅"}
                </div>
                <div className="font-semibold text-[#1C1C2E] text-sm">
                  {log.msg}
                </div>
              </div>
              <div className="text-[#6B6A7A] text-sm font-medium shrink-0 ml-4">
                {log.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
