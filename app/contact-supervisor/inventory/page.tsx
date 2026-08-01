"use client";

import React, { useState, useMemo } from "react";
import AdminShell from "@/components/admin/AdminShell";
import DataTable, { type Column } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import type { StatusType } from "@/components/admin/StatusBadge";
import Pagination from "@/components/admin/Pagination";
import { Search, Plus } from "lucide-react";

// ─── TYPES ──────────────────────────────────────────────────────────────────
interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  status: StatusType;
  updatedAt: string;
}

// ─── MOCK DATA ──────────────────────────────────────────────────────────────
const MOCK_INVENTORY: InventoryItem[] = [
  { id: "1",  name: "Laptop ASUS VivoBook",     category: "Komputer",    quantity: 24, status: "In Stock",     updatedAt: "28 Jul 2026" },
  { id: "2",  name: "Router Mikrotik RB951",    category: "Jaringan",    quantity: 8,  status: "In Stock",     updatedAt: "27 Jul 2026" },
  { id: "3",  name: "Kabel UTP Cat-6 (box)",    category: "Jaringan",    quantity: 3,  status: "Low Stock",    updatedAt: "26 Jul 2026" },
  { id: "4",  name: "Monitor LG 24\" IPS",      category: "Komputer",    quantity: 15, status: "In Stock",     updatedAt: "25 Jul 2026" },
  { id: "5",  name: "Crimping Tool",            category: "Alat",        quantity: 12, status: "In Stock",     updatedAt: "24 Jul 2026" },
  { id: "6",  name: "Switch Cisco 2960",        category: "Jaringan",    quantity: 0,  status: "Out of Stock", updatedAt: "23 Jul 2026" },
  { id: "7",  name: "Keyboard Mechanical",       category: "Aksesoris",   quantity: 30, status: "In Stock",     updatedAt: "22 Jul 2026" },
  { id: "8",  name: "Mouse Wireless Logitech",  category: "Aksesoris",   quantity: 2,  status: "Low Stock",    updatedAt: "21 Jul 2026" },
  { id: "9",  name: "Obeng Set Phillips",       category: "Alat",        quantity: 6,  status: "In Stock",     updatedAt: "20 Jul 2026" },
  { id: "10", name: "Access Point TP-Link",     category: "Jaringan",    quantity: 0,  status: "Out of Stock", updatedAt: "19 Jul 2026" },
  { id: "11", name: "Kamera Canon EOS M50",     category: "Multimedia",  quantity: 4,  status: "In Stock",     updatedAt: "18 Jul 2026" },
  { id: "12", name: "Tripod Video",             category: "Multimedia",  quantity: 1,  status: "Low Stock",    updatedAt: "17 Jul 2026" },
  { id: "13", name: "Drawing Tablet Wacom",     category: "Multimedia",  quantity: 6,  status: "In Stock",     updatedAt: "16 Jul 2026" },
  { id: "14", name: "Solder Station",           category: "Alat",        quantity: 0,  status: "Out of Stock", updatedAt: "15 Jul 2026" },
];

const CATEGORIES = ["Komputer", "Jaringan", "Alat", "Aksesoris", "Multimedia"];

// ─── PAGE ───────────────────────────────────────────────────────────────────
export default function AdminInventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // ─── FILTERED DATA ──────────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = MOCK_INVENTORY;

    if (categoryFilter !== "all") {
      result = result.filter((item) => item.category === categoryFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [categoryFilter, searchQuery]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  // ─── SUMMARY STATS ─────────────────────────────────────────────
  const stats = useMemo(() => {
    const inStock = MOCK_INVENTORY.filter((i) => i.status === "In Stock").length;
    const lowStock = MOCK_INVENTORY.filter((i) => i.status === "Low Stock").length;
    const outOfStock = MOCK_INVENTORY.filter((i) => i.status === "Out of Stock").length;
    return { total: MOCK_INVENTORY.length, inStock, lowStock, outOfStock };
  }, []);

  // ─── COLUMNS ────────────────────────────────────────────────────
  const columns: Column<InventoryItem>[] = [
    {
      key: "name",
      label: "Nama Item",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 bg-[#FBF7F7]">
            
          </div>
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
      key: "quantity",
      label: "Stok",
      render: (row) => (
        <span className="font-semibold text-[#1C1C2E]">{row.quantity}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "updatedAt",
      label: "Terakhir Diperbarui",
      render: (row) => (
        <span className="text-[#6B6A7A] whitespace-nowrap">{row.updatedAt}</span>
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
    <AdminShell pageTitle="Inventory">
      {/* Page header */}
      <div className="mb-6 dash-fadein">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-[2rem] font-bold text-[#1C1C2E] tracking-tight leading-tight">
              Inventaris
            </h2>
            <p className="text-[#6B6A7A] text-[0.95rem] mt-1">
              Kelola peralatan dan material proyek TEFA
            </p>
          </div>
          <button
            className="h-11 px-5 flex items-center gap-2 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:opacity-90 cursor-pointer shrink-0"
            style={{
              backgroundColor: "#C0272D",
              boxShadow: "0 4px 14px #C0272D30",
            }}
          >
            <Plus className="w-4 h-4" />
            Tambah Item
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 dash-fadein"
        style={{ animationDelay: "0.05s" }}
      >
        {[
          { label: "Total Item", value: stats.total, icon: "", color: "#C0272D" },
          { label: "In Stock", value: stats.inStock, icon: "", color: "#166534" },
          { label: "Low Stock", value: stats.lowStock, icon: "", color: "#92400E" },
          { label: "Out of Stock", value: stats.outOfStock, icon: "", color: "#991B1B" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-[#E8E6E1] p-5 flex items-center gap-4 transition-all duration-200 hover:-translate-y-0.5"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${stat.color}4D`;
              e.currentTarget.style.boxShadow = `0 8px 24px ${stat.color}15`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#E8E6E1";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span className="text-2xl">{stat.icon}</span>
            <div>
              <p className="text-xs text-[#6B6A7A] font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-[#1C1C2E]">{stat.value}</p>
            </div>
          </div>
        ))}
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
              placeholder="Cari item..."
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-[10px] border-[1.5px] border-[#E8E6E1] bg-[#FAFAF9] text-sm placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C0272D] focus:ring-2 focus:ring-[#C0272D]/10 transition-colors"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
            className="h-10 px-3 rounded-[10px] border-[1.5px] border-[#E8E6E1] bg-white text-sm font-medium text-[#1C1C2E] focus:outline-none focus:border-[#C0272D] focus:ring-2 focus:ring-[#C0272D]/10 transition-colors cursor-pointer"
          >
            <option value="all">Semua Kategori</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <DataTable
          columns={columns}
          data={paginated}
          keyExtractor={(row) => row.id}
          emptyMessage="Tidak ada item inventaris yang ditemukan"
          emptyIcon=""
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
