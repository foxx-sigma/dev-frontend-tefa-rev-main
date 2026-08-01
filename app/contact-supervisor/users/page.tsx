"use client";

import React, { useState, useMemo, useCallback } from "react";
import AdminShell from "@/components/admin/AdminShell";
import DataTable, { type Column } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import type { StatusType } from "@/components/admin/StatusBadge";
import Pagination from "@/components/admin/Pagination";
import { Search, SlidersHorizontal, CheckCircle, XCircle, Eye } from "lucide-react";

// ─── TYPES ──────────────────────────────────────────────────────────────────
type EntityType = "user" | "project";

interface ApprovalEntry {
  id: string;
  entityType: EntityType;
  name: string;
  avatar: string;
  category: string;
  date: string;
  status: StatusType;
}

// ─── MOCK DATA (14 entries: 8 user, 6 project) ─────────────────────────────
const MOCK_DATA: ApprovalEntry[] = [
  { id: "1",  entityType: "user",    name: "Budi Santoso",         avatar: "BS", category: "Siswa RPL",        date: "28 Jul 2026", status: "Review" },
  { id: "2",  entityType: "user",    name: "Sari Amalia",          avatar: "SA", category: "Guru PG",          date: "27 Jul 2026", status: "Review" },
  { id: "3",  entityType: "project", name: "Aplikasi Kasir Digital",avatar: "AK", category: "Proyek RPL",       date: "27 Jul 2026", status: "Running" },
  { id: "4",  entityType: "user",    name: "Dian Pratama",         avatar: "DP", category: "Siswa TKJ",        date: "26 Jul 2026", status: "Review" },
  { id: "5",  entityType: "project", name: "Network Monitoring",   avatar: "", category: "Proyek TKJ",       date: "26 Jul 2026", status: "Review" },
  { id: "6",  entityType: "user",    name: "Rina Wati",            avatar: "RW", category: "Siswa RPL",        date: "25 Jul 2026", status: "Running" },
  { id: "7",  entityType: "project", name: "Sistem Inventory",     avatar: "", category: "Proyek RPL",       date: "25 Jul 2026", status: "Review" },
  { id: "8",  entityType: "user",    name: "Ahmad Fauzi",          avatar: "AF", category: "Siswa PG",         date: "24 Jul 2026", status: "Review" },
  { id: "9",  entityType: "project", name: "Company Profile Web",  avatar: "", category: "Partner Industri", date: "24 Jul 2026", status: "Running" },
  { id: "10", entityType: "user",    name: "Mega Putri",           avatar: "MP", category: "Siswa TKJ",        date: "23 Jul 2026", status: "Running" },
  { id: "11", entityType: "project", name: "LMS Platform",         avatar: "", category: "Proyek PG",        date: "23 Jul 2026", status: "Review" },
  { id: "12", entityType: "user",    name: "Yoga Saputra",         avatar: "YS", category: "Guru RPL",         date: "22 Jul 2026", status: "Review" },
  { id: "13", entityType: "project", name: "IoT Dashboard",        avatar: "", category: "Proyek TKJ",       date: "22 Jul 2026", status: "Running" },
  { id: "14", entityType: "user",    name: "Lina Marlina",         avatar: "LM", category: "Siswa RPL",        date: "21 Jul 2026", status: "Review" },
];

// ─── TABS ───────────────────────────────────────────────────────────────────
type TabKey = "all" | "user" | "project";

const TAB_LABELS: Record<TabKey, string> = {
  all: "Semua",
  user: "User",
  project: "Proyek",
};

// ─── PAGE ───────────────────────────────────────────────────────────────────
export default function AdminUsersPage() {
  const [data, setData] = useState<ApprovalEntry[]>(MOCK_DATA);
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const pageSize = 10;

  // ─── COUNTS ─────────────────────────────────────────────────────
  const counts = useMemo(() => ({
    all: data.length,
    user: data.filter((d) => d.entityType === "user").length,
    project: data.filter((d) => d.entityType === "project").length,
  }), [data]);

  // ─── FILTERED DATA ──────────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = data;

    // Tab filter
    if (activeTab !== "all") {
      result = result.filter((d) => d.entityType === activeTab);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [data, activeTab, searchQuery]);

  // ─── PAGINATED DATA ─────────────────────────────────────────────
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  // ─── ACTIONS ────────────────────────────────────────────────────
  const handleApprove = useCallback((id: string) => {
    setProcessingId(id);
    // Simulate API call
    setTimeout(() => {
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "Running" as StatusType } : item
        )
      );
      setProcessingId(null);
    }, 500);
  }, []);

  const handleReject = useCallback((id: string) => {
    if (!confirm("Apakah Anda yakin ingin menolak entitas ini?")) return;
    setProcessingId(id);
    setTimeout(() => {
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "Rejected" as StatusType } : item
        )
      );
      setProcessingId(null);
    }, 500);
  }, []);

  // ─── COLUMNS ────────────────────────────────────────────────────
  const columns: Column<ApprovalEntry>[] = useMemo(
    () => [
      {
        key: "name",
        label: "Entitas",
        render: (row) => (
          <div className="flex items-center gap-3">
            {row.entityType === "user" ? (
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#FBF7F7] text-[#C0272D]">
                {row.avatar}
              </div>
            ) : (
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 bg-[#FBF7F7]">
                {row.avatar}
              </div>
            )}
            <span className="font-semibold text-[#1C1C2E] truncate">
              {row.name}
            </span>
          </div>
        ),
      },
      {
        key: "category",
        label: "Kategori",
        render: (row) => (
          <span className="text-[#6B6A7A]">{row.category}</span>
        ),
      },
      {
        key: "date",
        label: "Tanggal",
        render: (row) => (
          <span className="text-[#6B6A7A] whitespace-nowrap">{row.date}</span>
        ),
      },
      {
        key: "status",
        label: "Status",
        render: (row) => <StatusBadge status={row.status} />,
      },
      {
        key: "actions",
        label: "Aksi",
        align: "right" as const,
        render: (row) => {
          const isProcessing = processingId === row.id;
          if (row.status === "Review") {
            return (
              <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => handleApprove(row.id)}
                  disabled={isProcessing}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-green-600 hover:bg-green-50 transition-colors cursor-pointer disabled:opacity-40"
                  title="Approve"
                  aria-label="Approve"
                >
                  <CheckCircle className="w-[18px] h-[18px]" />
                </button>
                <button
                  onClick={() => handleReject(row.id)}
                  disabled={isProcessing}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-40"
                  title="Reject"
                  aria-label="Reject"
                >
                  <XCircle className="w-[18px] h-[18px]" />
                </button>
              </div>
            );
          }
          if (row.status === "Running") {
            return (
              <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-[#6B6A7A] hover:bg-[#F5F4F2] transition-colors cursor-pointer"
                  title="View Details"
                  aria-label="View Details"
                >
                  <Eye className="w-[18px] h-[18px]" />
                </button>
              </div>
            );
          }
          return null;
        },
      },
    ],
    [processingId, handleApprove, handleReject]
  );

  // ─── DEBOUNCED SEARCH ───────────────────────────────────────────
  const searchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const handleSearch = (value: string) => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setSearchQuery(value);
      setPage(1);
    }, 300);
  };

  return (
    <AdminShell pageTitle="Users">
      {/* Page header */}
      <div className="mb-6 dash-fadein">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-[2rem] font-bold text-[#1C1C2E] tracking-tight leading-tight">
              Persetujuan Antrean
            </h2>
            <p className="text-[#6B6A7A] text-[0.95rem] mt-1">
              Verifikasi pendaftaran pengguna dan pengajuan proyek baru
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
              <input
                type="text"
                placeholder="Cari entitas..."
                onChange={(e) => handleSearch(e.target.value)}
                className="h-11 pl-10 pr-4 w-full sm:w-64 rounded-[10px] border-[1.5px] border-[#E8E6E1] bg-[#FAFAF9] text-sm placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C0272D] focus:ring-2 focus:ring-[#C0272D]/10 transition-colors"
              />
            </div>
            {/* Filter button */}
            <button className="h-11 px-4 flex items-center gap-2 rounded-[10px] border-[1.5px] border-[#E8E6E1] bg-white text-sm font-medium text-[#1C1C2E] hover:bg-[#F5F4F2] transition-colors cursor-pointer">
              <SlidersHorizontal className="w-4 h-4 text-[#6B6A7A]" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main card */}
      <div
        className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm overflow-hidden dash-fadein"
        style={{ animationDelay: "0.1s" }}
      >
        {/* Tabs */}
        <div className="flex border-b border-[#E8E6E1]">
          {(["all", "user", "project"] as TabKey[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setPage(1);
              }}
              className={`relative px-6 py-4 text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === tab
                  ? "text-[#C0272D]"
                  : "text-[#6B6A7A] hover:text-[#1C1C2E]"
              }`}
            >
              {TAB_LABELS[tab]}{" "}
              <span
                className="ml-1 text-xs px-2 py-0.5 rounded-full font-bold"
                style={{
                  backgroundColor:
                    activeTab === tab ? "#FBF7F7" : "#F5F4F2",
                  color: activeTab === tab ? "#C0272D" : "#6B6A7A",
                }}
              >
                {counts[tab]}
              </span>
              {/* Active underline */}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C0272D] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={paginated}
          keyExtractor={(row) => row.id}
          emptyMessage="Tidak ada entitas yang cocok dengan pencarian Anda"
          emptyIcon=""
        />

        {/* Pagination */}
        <div className="px-5 pb-5">
          <Pagination
            page={page}
            pageSize={pageSize}
            total={filtered.length}
            onPageChange={setPage}
          />
        </div>
      </div>
    </AdminShell>
  );
}
