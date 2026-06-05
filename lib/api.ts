/**
 * lib/api.ts
 * 
 * Sentralisasi semua API call ke backend.
 * Letakkan file ini di: app/lib/api.ts  ATAU  lib/api.ts
 */

// ─── Base URL dengan fallback yang aman ──────────────────────────────────────

// SEMENTARA untuk test — ganti dengan URL ngrok kamu
const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_API_URL;

// ─── Cookie Helper ────────────────────────────────────────────────────────────
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

// ─── Helper fetch wrapper ─────────────────────────────────────────────────────
async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  if (!API_BASE) {
    throw new Error(
      "API URL tidak dikonfigurasi. Tambahkan NEXT_PUBLIC_API_URL atau NEXT_PUBLIC_BASE_API_URL di .env"
    );
  }

  const url = `${API_BASE}${path}`;
  const token = getCookie("accessToken");

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  // Coba parse JSON apapun status-nya
  let data: unknown;
  try {
    data = await res.json();
  } catch {
    throw new Error(`Server error: ${res.status} ${res.statusText}`);
  }

  if (!res.ok) {
    // Lempar error dengan pesan dari backend
    const msg =
      (data as { message?: string })?.message ||
      `Request gagal: ${res.status}`;
    const err = new Error(msg) as Error & { code?: string; status?: number };
    err.code = (data as { code?: string })?.code;
    err.status = res.status;
    throw err;
  }

  return data as T;
}

// ─── Auth API ─────────────────────────────────────────────────────────────────

export interface RegisterPayload {
  email: string;
  password: string;
  full_name: string;
  phone: string;
  address: string;
  postal_code: string;
}

export interface RegisterResponse {
  message: string;
}

export interface VerifyEmailPayload {
  token: string;
}

export interface VerifyEmailResponse {
  message: string;
  user?: { name: string; email: string };
}

export interface ResendVerificationPayload {
  email: string;
}

export const authApi = {
  register: (payload: RegisterPayload) =>
    apiFetch<RegisterResponse>("/user-client", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  /**
   * POST /auth/verify-email
   * Verifikasi token dari link email
   */
  verifyEmail: (payload: VerifyEmailPayload) =>
    apiFetch<VerifyEmailResponse>("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  /**
   * POST /auth/resend-verification
   * Kirim ulang email verifikasi
   */
  resendVerification: (payload: ResendVerificationPayload) =>
    apiFetch<{ message: string }>("/auth/resend-verification", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};