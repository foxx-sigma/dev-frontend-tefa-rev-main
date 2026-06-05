/**
 * Email Classifier Utility for TEFA SMK Telkom Malang
 *
 * Classifies user emails into categories based on domain patterns:
 * - @student.smktelkom-mlg.sch.id with "rpl" → Siswa RPL
 * - @student.smktelkom-mlg.sch.id with "tkj" → Siswa TKJ
 * - @student.smktelkom-mlg.sch.id with "pg"  → Siswa PG
 * - @guru.smktelkom-mlg.sch.id              → Guru (Teacher)
 * - @smktelkom-mlg.sch.id (other)            → Staff
 * - Any other domain                         → External (Customer)
 */

export interface EmailClassification {
  /** "internal" for @smktelkom-mlg.sch.id, "external" for others */
  userType: "internal" | "external";
  /** Specific category: student_rpl, student_tkj, student_pg, guru, staff, customer */
  category: "student_rpl" | "student_tkj" | "student_pg" | "guru" | "staff" | "customer";
  /** Human-readable label for the major/role */
  majorLabel: string;
  /** Full description shown on dashboard */
  majorFull: string;
  /** Whether email belongs to smktelkom-mlg.sch.id domain */
  isInternal: boolean;
  /** Theme color for the category */
  color: string;
  /** Icon emoji */
  icon: string;
}

export function classifyEmail(email: string): EmailClassification {
  const lowerEmail = email.toLowerCase().trim();

  // Check if email belongs to smktelkom-mlg.sch.id domain
  const isTelkomDomain = lowerEmail.endsWith("@smktelkom-mlg.sch.id") ||
    lowerEmail.includes("@student.smktelkom-mlg.sch.id") ||
    lowerEmail.includes("@guru.smktelkom-mlg.sch.id") ||
    lowerEmail.includes(".smktelkom-mlg.sch.id");

  if (!isTelkomDomain) {
    return {
      userType: "external",
      category: "customer",
      majorLabel: "External User",
      majorFull: "Customer — External User",
      isInternal: false,
      color: "#64748b",
      icon: "👤",
    };
  }

  // Check for student emails
  const localPart = lowerEmail.split("@")[0];
  const domainPart = lowerEmail.split("@")[1] || "";
  const isStudent = domainPart.startsWith("student.") || domainPart.includes("student");

  if (isStudent) {
    if (localPart.includes("rpl")) {
      return {
        userType: "internal",
        category: "student_rpl",
        majorLabel: "Siswa RPL",
        majorFull: "Rekayasa Perangkat Lunak",
        isInternal: true,
        color: "#e63946",
        icon: "💻",
      };
    }

    if (localPart.includes("tkj")) {
      return {
        userType: "internal",
        category: "student_tkj",
        majorLabel: "Siswa TKJ",
        majorFull: "Teknik Komputer & Jaringan",
        isInternal: true,
        color: "#2563eb",
        icon: "🔌",
      };
    }

    if (localPart.includes("pg")) {
      return {
        userType: "internal",
        category: "student_pg",
        majorLabel: "Siswa PG",
        majorFull: "Produksi & Grafika",
        isInternal: true,
        color: "#7c3aed",
        icon: "🎨",
      };
    }

    // Student but no major detected
    return {
      userType: "internal",
      category: "staff",
      majorLabel: "Siswa",
      majorFull: "Siswa — SMK Telkom Malang",
      isInternal: true,
      color: "#f59e0b",
      icon: "🎓",
    };
  }

  // Check for guru (teacher) emails
  const isGuru = domainPart.startsWith("guru.") || domainPart.includes("guru");

  if (isGuru) {
    return {
      userType: "internal",
      category: "guru",
      majorLabel: "Guru",
      majorFull: "Guru — SMK Telkom Malang",
      isInternal: true,
      color: "#16a34a",
      icon: "👨‍🏫",
    };
  }

  // Other smktelkom-mlg.sch.id domain (staff)
  return {
    userType: "internal",
    category: "staff",
    majorLabel: "Staff",
    majorFull: "Staff — SMK Telkom Malang",
    isInternal: true,
    color: "#f59e0b",
    icon: "🏫",
  };
}
