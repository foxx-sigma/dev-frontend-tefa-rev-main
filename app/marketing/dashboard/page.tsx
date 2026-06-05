"use client";

import DashboardLayout, {
  StatCard,
  ROLE_COLORS,
} from "@/components/DashboardLayout";

export default function MarketingDashboard() {
  const roleColor = ROLE_COLORS.pemasaran.primary;

  return (
    <DashboardLayout
      role="pemasaran"
      user={{
        name: "Marketing",
        email: "marketing@smktelkom-mlg.sch.id",
        icon: "📣",
        majorLabel: "Pemasaran",
        isInternal: true,
      }}
      navItems={[
        { icon: "📈", label: "Kampanye", href: "/marketing/dashboard", active: true },
        { icon: "🎯", label: "Leads", href: "/marketing/leads" },
        { icon: "📣", label: "Media Sosial", href: "/marketing/social" },
      ]}
      headerTitle="Marketing Dashboard"
      headerSubtitle="Pantau performa kampanye dan jangkauan Anda."
      headerAction={
        <button
          className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white hover:opacity-90 transition-all cursor-pointer"
          style={{ backgroundColor: roleColor }}
        >
          Buat Kampanye
        </button>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 dash-fadein">
        <StatCard
          label="Total Jangkauan"
          value="842K"
          icon="👁️"
          change="+24%"
          roleColor={roleColor}
        />
        <StatCard
          label="Rasio Konversi"
          value="4.8%"
          icon="⚡"
          change="+1.2%"
          roleColor={roleColor}
        />
        <StatCard
          label="Lead Baru"
          value="1.249"
          icon="👥"
          change="+340"
          roleColor={roleColor}
        />
      </div>

      {/* Active Campaigns */}
      <div className="bg-white rounded-2xl border border-[#E8E6E1] p-7 dash-fadein">
        <h2 className="text-lg font-extrabold text-[#1C1C2E] mb-6">
          Kampanye Aktif
        </h2>
        <div className="flex flex-col gap-4">
          {[
            {
              name: "Summer Sale 2026",
              status: "Running",
              budget: "Rp 67,5jt",
            },
            {
              name: "B2B Outreach",
              status: "Draft",
              budget: "Rp 18jt",
            },
          ].map((c, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-5 border border-[#E8E6E1] rounded-xl hover:border-[#6B6A7A]/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{
                    backgroundColor: ROLE_COLORS.pemasaran.tint,
                  }}
                >
                  🔥
                </div>
                <div>
                  <div className="font-bold text-[#1C1C2E]">{c.name}</div>
                  <div className="text-[#6B6A7A] text-xs mt-1">
                    Budget: {c.budget}
                  </div>
                </div>
              </div>
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor:
                    c.status === "Running" ? "#dcfce7" : "#F5F4F2",
                  color:
                    c.status === "Running" ? "#166534" : "#6B6A7A",
                }}
              >
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
