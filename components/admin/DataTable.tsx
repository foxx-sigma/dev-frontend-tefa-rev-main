"use client";

import React from "react";

// ─── TYPES ──────────────────────────────────────────────────────────────────
export interface Column<T> {
  key: string;
  label: string;
  /** Custom render for the cell */
  render?: (row: T, index: number) => React.ReactNode;
  /** Right-align the column (for action columns) */
  align?: "left" | "center" | "right";
  /** Width hint */
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  /** Unique key extractor */
  keyExtractor: (row: T) => string;
  /** Show skeleton loader */
  loading?: boolean;
  /** Skeleton row count */
  skeletonRows?: number;
  /** Empty state message */
  emptyMessage?: string;
  /** Empty state icon (emoji) */
  emptyIcon?: string;
}

// ─── SKELETON ROW ───────────────────────────────────────────────────────────
function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-5 py-4">
          <div className="h-4 bg-[#E8E6E1] rounded-md w-3/4" />
        </td>
      ))}
    </tr>
  );
}

// ─── DATA TABLE ─────────────────────────────────────────────────────────────
export default function DataTable<T>({
  columns,
  data,
  keyExtractor,
  loading = false,
  skeletonRows = 5,
  emptyMessage = "Tidak ada data ditemukan",
  emptyIcon = "📭",
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        {/* Header */}
        <thead>
          <tr className="border-b border-[#E8E6E1]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-5 py-3.5 text-sm font-medium text-[#6B6A7A] whitespace-nowrap ${
                  col.align === "right"
                    ? "text-right"
                    : col.align === "center"
                    ? "text-center"
                    : "text-left"
                }`}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-[#E8E6E1]">
          {/* Loading skeleton */}
          {loading &&
            Array.from({ length: skeletonRows }).map((_, i) => (
              <SkeletonRow key={`skel-${i}`} cols={columns.length} />
            ))}

          {/* Data rows */}
          {!loading &&
            data.map((row, idx) => (
              <tr
                key={keyExtractor(row)}
                className="group transition-colors duration-150 hover:bg-[#F5F4F2]/50"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-5 py-4 text-sm text-[#1C1C2E] ${
                      col.align === "right"
                        ? "text-right"
                        : col.align === "center"
                        ? "text-center"
                        : "text-left"
                    }`}
                  >
                    {col.render
                      ? col.render(row, idx)
                      : String((row as Record<string, unknown>)[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}

          {/* Empty state */}
          {!loading && data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-5 py-16 text-center"
              >
                <div className="flex flex-col items-center gap-3">
                  <span className="text-4xl">{emptyIcon}</span>
                  <p className="text-sm text-[#6B6A7A]">{emptyMessage}</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
