"use client";

import React from "react";

// ─── STATUS CONFIG ──────────────────────────────────────────────────────────
export type StatusType =
  | "Review"
  | "Running"
  | "Draft"
  | "Rejected"
  | "Completed"
  | "In Stock"
  | "Low Stock"
  | "Out of Stock"
  | "Income"
  | "Expense";

const STATUS_STYLES: Record<
  StatusType,
  { bg: string; text: string }
> = {
  Review:         { bg: "#FEF3C7", text: "#92400E" },
  Running:        { bg: "#DCFCE7", text: "#166534" },
  Draft:          { bg: "#F5F4F2", text: "#6B6A7A" },
  Rejected:       { bg: "#FEE2E2", text: "#991B1B" },
  Completed:      { bg: "#DBEAFE", text: "#1E40AF" },
  "In Stock":     { bg: "#DCFCE7", text: "#166534" },
  "Low Stock":    { bg: "#FEF3C7", text: "#92400E" },
  "Out of Stock": { bg: "#FEE2E2", text: "#991B1B" },
  Income:         { bg: "#DCFCE7", text: "#166534" },
  Expense:        { bg: "#FEE2E2", text: "#991B1B" },
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? { bg: "#F5F4F2", text: "#6B6A7A" };

  return (
    <span
      className={`inline-flex items-center text-xs font-bold px-3.5 py-1.5 rounded-full whitespace-nowrap ${className}`}
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {status}
    </span>
  );
}
