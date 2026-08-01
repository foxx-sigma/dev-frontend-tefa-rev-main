"use client";

import React, { useState, useMemo } from "react";
import AdminShell from "@/components/admin/AdminShell";
import DataTable, { type Column } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import type { StatusType } from "@/components/admin/StatusBadge";
import Pagination from "@/components/admin/Pagination";
import { Search } from "lucide-react";

// ─── TYPES ──────────────────────────────────────────────────────────────────
interface Project {
  id: string;
  name: string;
  category: string;
  categoryColor: string;
  team: string;
  status: StatusType;
  date: string;
}

// ─── MOCK DATA ──────────────────────────────────────────────────────────────
const MOCK_PROJECTS: Project[] = [
  { id: "1",  name: "Aplikasi Kasir Digital",     category: "RPL", categoryColor: "#C0272D", team: "Tim Alpha — Budi, Rina",          status: "Running",   date: "28 Jul 2026" },
  { id: "2",  name: "Network Monitoring Tool",    category: "TKJ", categoryColor: "#1E56A0", team: "Tim Bravo — Dian, Ahmad",         status: "Review",    date: "27 Jul 2026" },
  { id: "3",  name: "Sistem Inventory Sekolah",   category: "RPL", categoryColor: "#C0272D", team: "Tim Charlie — Mega, Yoga",        status: "Draft",     date: "26 Jul 2026" },
  { id: "4",  name: "Company Profile Web",        category: "RPL", categoryColor: "#C0272D", team: "Tim Delta — Lina, Sari",          status: "Completed", date: "25 Jul 2026" },
  { id: "5",  name: "LMS Platform",               category: "PG",  categoryColor: "#6D28D9", team: "Tim Echo — Reza, Fitri",          status: "Running",   date: "24 Jul 2026" },
  { id: "6",  name: "IoT Dashboard",              category: "TKJ", categoryColor: "#1E56A0", team: "Tim Foxtrot — Andi, Dewi",        status: "Running",   date: "23 Jul 2026" },
  { id: "7",  name: "E-Commerce Prototype",       category: "RPL", categoryColor: "#C0272D", team: "Tim Golf — Hadi, Nisa",           status: "Review",    date: "22 Jul 2026" },
  { id: "8",  name: "Video Editing Portfolio",     category: "PG",  categoryColor: "#6D28D9", team: "Tim Hotel — Putri, Adi",          status: "Draft",     date: "21 Jul 2026" },
  { id: "9",  name: "Firewall Config Automation",  category: "TKJ", categoryColor: "#1E56A0", team: "Tim India — Bayu, Citra",         status: "Completed", date: "20 Jul 2026" },
  { id: "10", name: "Booking System",              category: "RPL", categoryColor: "#C0272D", team: "Tim Juliet — Toni, Mira",         status: "Running",   date: "19 Jul 2026" },
  { id: "11", name: "Motion Graphics Showcase",    category: "PG",  categoryColor: "#6D28D9", team: "Tim Kilo — Eko, Vina",            status: "Review",    date: "18 Jul 2026" },
  { id: "12", name: "Server Monitoring App",       category: "TKJ", categoryColor: "#1E56A0", team: "Tim Lima — Fajar, Gita",          status: "Draft",     date: "17 Jul 2026" },
];

// ─── STATUS FILTER OPTIONS ──────────────────────────────────────────────────
const STATUS_OPTIONS: StatusType[] = ["Running", "Review", "Draft", "Completed"];

// ─── PAGE ───────────────────────────────────────────────────────────────────
export default function AdminProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // ─── FILTERED DATA ──────────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = MOCK_PROJECTS;

    if (statusFilter !== "all") {
      result = result.filter((p) => p.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.team.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [statusFilter, searchQuery]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  // ─── COLUMNS ────────────────────────────────────────────────────
  const columns: Column<Project>[] = [
    {
      key: "name",
      label: "Nama Proyek",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 bg-[#FBF7F7]">
            📁
          </div>
          <span className="font-semibold text-[#1C1C2E] truncate">
            {row.name}
          </span>
        </div>
      ),
    },
    {
      key: "category",
      label: "Jurusan",
      render: (row) => (
        <span
          className="text-xs font-semibold text-white px-2.5 py-1 rounded-full"
          style={{ backgroundColor: row.categoryColor }}
        >
          {row.category}
        </span>
      ),
    },
    {
      key: "team",
      label: "Tim / Siswa",
      render: (row) => (
        <span className="text-[#6B6A7A] text-sm truncate block max-w-[200px]">
          {row.team}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "date",
      label: "Tanggal",
      render: (row) => (
        <span className="text-[#6B6A7A] whitespace-nowrap">{row.date}</span>
      ),
    },
  ];

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
    <AdminShell pageTitle="Projects">
      {/* Page header */}
      <div className="mb-6 dash-fadein">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-[2rem] font-bold text-[#1C1C2E] tracking-tight leading-tight">
              Proyek
            </h2>
            <p className="text-[#6B6A7A] text-[0.95rem] mt-1">
              Kelola dan telusuri semua proyek siswa dan mitra
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
              <input
                type="text"
                placeholder="Cari proyek..."
                onChange={(e) => handleSearch(e.target.value)}
                className="h-11 pl-10 pr-4 w-full sm:w-64 rounded-[10px] border-[1.5px] border-[#E8E6E1] bg-[#FAFAF9] text-sm placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C0272D] focus:ring-2 focus:ring-[#C0272D]/10 transition-colors"
              />
            </div>
            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="h-11 px-4 rounded-[10px] border-[1.5px] border-[#E8E6E1] bg-white text-sm font-medium text-[#1C1C2E] focus:outline-none focus:border-[#C0272D] focus:ring-2 focus:ring-[#C0272D]/10 transition-colors cursor-pointer appearance-none"
            >
              <option value="all">Semua Status</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table card */}
      <div
        className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm overflow-hidden dash-fadein"
        style={{ animationDelay: "0.1s" }}
      >
        <DataTable
          columns={columns}
          data={paginated}
          keyExtractor={(row) => row.id}
          emptyMessage="Tidak ada proyek yang ditemukan"
          emptyIcon="📁"
        />
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
