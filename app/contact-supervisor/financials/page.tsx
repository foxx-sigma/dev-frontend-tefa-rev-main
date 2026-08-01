"use client";

import React, { useState, useMemo } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { StatCard, ROLE_COLORS } from "@/components/DashboardLayout";
import DataTable, { type Column } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import type { StatusType } from "@/components/admin/StatusBadge";
import Pagination from "@/components/admin/Pagination";
import { Search, Plus } from "lucide-react";

// ─── TYPES ──────────────────────────────────────────────────────────────────
interface FinancialRecord {
  id: string;
  date: string;
  description: string;
  category: string;
  type: "Income" | "Expense";
  amount: number;
  project: string;
}

// ─── MOCK DATA ──────────────────────────────────────────────────────────────
const MOCK_RECORDS: FinancialRecord[] = [
  { id: "1",  date: "28 Jul 2026", description: "Pembayaran proyek Kasir Digital",       category: "Proyek",     type: "Income",  amount: 15000000, project: "Aplikasi Kasir Digital" },
  { id: "2",  date: "27 Jul 2026", description: "Pembelian kabel UTP 3 box",             category: "Material",   type: "Expense", amount: 1500000,  project: "Network Monitoring" },
  { id: "3",  date: "26 Jul 2026", description: "Kontrak mitra PT Maju Jaya",            category: "Kemitraan",  type: "Income",  amount: 25000000, project: "Company Profile Web" },
  { id: "4",  date: "25 Jul 2026", description: "Service laptop laboratorium",            category: "Perawatan",  type: "Expense", amount: 3200000,  project: "-" },
  { id: "5",  date: "24 Jul 2026", description: "Pembayaran proyek LMS Platform",        category: "Proyek",     type: "Income",  amount: 18000000, project: "LMS Platform" },
  { id: "6",  date: "23 Jul 2026", description: "Pembelian router Mikrotik 2 unit",      category: "Material",   type: "Expense", amount: 4800000,  project: "IoT Dashboard" },
  { id: "7",  date: "22 Jul 2026", description: "Workshop fee — pelatihan React.js",      category: "Pelatihan",  type: "Expense", amount: 2000000,  project: "-" },
  { id: "8",  date: "21 Jul 2026", description: "Pembayaran proyek IoT Dashboard",       category: "Proyek",     type: "Income",  amount: 12000000, project: "IoT Dashboard" },
  { id: "9",  date: "20 Jul 2026", description: "Biaya sertifikasi Mikrotik",            category: "Pelatihan",  type: "Expense", amount: 5000000,  project: "-" },
  { id: "10", date: "19 Jul 2026", description: "Kontrak PT Karya Solusi",               category: "Kemitraan",  type: "Income",  amount: 30000000, project: "Booking System" },
  { id: "11", date: "18 Jul 2026", description: "Pembelian kamera Canon",                category: "Material",   type: "Expense", amount: 8500000,  project: "-" },
  { id: "12", date: "17 Jul 2026", description: "Pembayaran proyek E-Commerce",          category: "Proyek",     type: "Income",  amount: 20000000, project: "E-Commerce Prototype" },
];

// ─── HELPERS ────────────────────────────────────────────────────────────────
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ─── PAGE ───────────────────────────────────────────────────────────────────
export default function AdminFinancialsPage() {
  const roleColor = ROLE_COLORS.admin.primary;
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // ─── SUMMARY ────────────────────────────────────────────────────
  const summary = useMemo(() => {
    const totalIncome = MOCK_RECORDS.filter((r) => r.type === "Income").reduce(
      (sum, r) => sum + r.amount,
      0
    );
    const totalExpense = MOCK_RECORDS.filter((r) => r.type === "Expense").reduce(
      (sum, r) => sum + r.amount,
      0
    );
    return { totalIncome, totalExpense, net: totalIncome - totalExpense };
  }, []);

  // ─── FILTERED DATA ──────────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = MOCK_RECORDS;

    if (typeFilter !== "all") {
      result = result.filter((r) => r.type === typeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.description.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.project.toLowerCase().includes(q)
      );
    }

    return result;
  }, [typeFilter, searchQuery]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  // ─── COLUMNS ────────────────────────────────────────────────────
  const columns: Column<FinancialRecord>[] = [
    {
      key: "date",
      label: "Tanggal",
      render: (row) => (
        <span className="text-[#6B6A7A] whitespace-nowrap">{row.date}</span>
      ),
    },
    {
      key: "description",
      label: "Deskripsi",
      render: (row) => (
        <span className="font-medium text-[#1C1C2E] truncate block max-w-[280px]">
          {row.description}
        </span>
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
      key: "type",
      label: "Tipe",
      render: (row) => <StatusBadge status={row.type as StatusType} />,
    },
    {
      key: "amount",
      label: "Jumlah",
      align: "right" as const,
      render: (row) => (
        <span
          className="font-semibold whitespace-nowrap"
          style={{ color: row.type === "Income" ? "#166534" : "#991B1B" }}
        >
          {row.type === "Income" ? "+" : "-"}
          {formatCurrency(row.amount)}
        </span>
      ),
    },
    {
      key: "project",
      label: "Proyek Terkait",
      render: (row) => (
        <span className="text-[#6B6A7A] text-sm">{row.project}</span>
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
    <AdminShell pageTitle="Financials">
      {/* Page header */}
      <div className="mb-6 dash-fadein">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-[2rem] font-bold text-[#1C1C2E] tracking-tight leading-tight">
              Keuangan
            </h2>
            <p className="text-[#6B6A7A] text-[0.95rem] mt-1">
              Lacak pemasukan dan pengeluaran proyek TEFA
            </p>
          </div>
          <button
            className="h-11 px-5 flex items-center gap-2 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:opacity-90 cursor-pointer shrink-0"
            style={{
              backgroundColor: roleColor,
              boxShadow: `0 4px 14px ${roleColor}30`,
            }}
          >
            <Plus className="w-4 h-4" />
            Catat Transaksi
          </button>
        </div>
      </div>

      {/* Summary StatCards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6 dash-fadein"
        style={{ animationDelay: "0.05s" }}
      >
        <StatCard
          label="Total Pemasukan"
          value={formatCurrency(summary.totalIncome)}
          icon="💰"
          roleColor="#166534"
        />
        <StatCard
          label="Total Pengeluaran"
          value={formatCurrency(summary.totalExpense)}
          icon="💸"
          roleColor="#991B1B"
        />
        <StatCard
          label="Saldo Bersih"
          value={formatCurrency(summary.net)}
          icon="📊"
          change={summary.net >= 0 ? "Surplus" : "Defisit"}
          roleColor={roleColor}
        />
      </div>

      {/* Filters + Table */}
      <div
        className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm overflow-hidden dash-fadein"
        style={{ animationDelay: "0.15s" }}
      >
        {/* Filter bar */}
        <div className="flex items-center gap-3 p-5 border-b border-[#E8E6E1]">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
            <input
              type="text"
              placeholder="Cari transaksi..."
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-[10px] border-[1.5px] border-[#E8E6E1] bg-[#FAFAF9] text-sm placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C0272D] focus:ring-2 focus:ring-[#C0272D]/10 transition-colors"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(1);
            }}
            className="h-10 px-3 rounded-[10px] border-[1.5px] border-[#E8E6E1] bg-white text-sm font-medium text-[#1C1C2E] focus:outline-none focus:border-[#C0272D] focus:ring-2 focus:ring-[#C0272D]/10 transition-colors cursor-pointer"
          >
            <option value="all">Semua Tipe</option>
            <option value="Income">Pemasukan</option>
            <option value="Expense">Pengeluaran</option>
          </select>
        </div>

        <DataTable
          columns={columns}
          data={paginated}
          keyExtractor={(row) => row.id}
          emptyMessage="Tidak ada transaksi yang ditemukan"
          emptyIcon="💰"
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
