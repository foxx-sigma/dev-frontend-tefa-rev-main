# 🎨 TEFA SMK Telkom Malang — Design Guide

> Panduan gaya desain lengkap untuk website TEFA SMK Telkom Malang.
> Dokumen ini mencakup **seluruh aturan visual** yang digunakan di landing page, halaman auth, dan dashboard tiap role.

---

## 📋 Daftar Isi

1. [Tech Stack & Tools](#-tech-stack--tools)
2. [Typography](#-typography)
3. [Color System](#-color-system)
4. [Spacing & Radius](#-spacing--radius)
5. [Component Library](#-component-library)
6. [Layout Architecture](#-layout-architecture)
7. [Role-Based Theming](#-role-based-theming)
8. [Animation & Interaction](#-animation--interaction)
9. [Iconography](#-iconography)
10. [Cheat Sheet — Dashboard Redesign](#-cheat-sheet--dashboard-redesign)

---

## 🛠 Tech Stack & Tools

| Layer          | Teknologi                                                   |
|----------------|-------------------------------------------------------------|
| Framework      | **Next.js 16.2.4** (App Router, React 19)                   |
| Styling        | **Tailwind CSS v4** + CSS custom properties                 |
| UI Components  | **shadcn/ui** (`radix-nova` style) + Radix Primitives       |
| Form           | **React Hook Form** + **Zod** validation                    |
| Icons          | **Lucide React** + inline SVG + emoji                       |
| Font           | **Plus Jakarta Sans** (Google Fonts) — weight 400–800       |
| Animations     | `tw-animate-css` + custom `@keyframes` (scoped per komponen)|

---

## 🔤 Typography

### Font Family

```css
--font-heading: var(--font-plus-jakarta-sans), system-ui, sans-serif;
--font-sans:    var(--font-plus-jakarta-sans), system-ui, sans-serif;
```

**Plus Jakarta Sans** digunakan untuk **semua** teks — heading maupun body. Font ini di-load via `next/font/google` dengan weights: `400, 500, 600, 700, 800`.

### Skala Tipografi

| Elemen                  | Ukuran                         | Weight      | Tracking         |
|-------------------------|--------------------------------|-------------|------------------|
| H1 (Hero Landing)       | `text-3xl` → `text-[2.75rem]`  | `extrabold` | `-0.02em`        |
| H1 (Dashboard greeting) | `text-2xl` → `text-3xl`        | `bold`      | `tracking-tight` |
| H2 (Section heading)    | `text-2xl` → `text-[2rem]`     | `bold`      | `-0.02em`        |
| H2 (Card section title) | `text-lg`                      | `extrabold` | default          |
| Body paragraph           | `text-[0.95rem]` atau `text-sm`| `normal`    | default          |
| Label / Caption         | `text-xs`                      | `semibold`  | default          |
| Badge text              | `text-xs`                      | `semibold`  | `tracking-wide`  |
| Stat card value         | `text-3xl`                     | `bold`      | default          |
| Nav link                | `text-sm`                      | `medium`    | default          |

### Warna Teks

| Konteks            | Hex        | Deskripsi                    |
|--------------------|------------|------------------------------|
| Heading utama      | `#1C1C2E`  | Sangat gelap, hampir hitam   |
| Body text          | `#3B3B58`  | Abu gelap keunguan           |
| Secondary / muted  | `#6B6A7A`  | Abu medium                   |
| Placeholder        | `#9CA3AF`  | Abu terang                   |
| Primary accent     | `#C0272D`  | Merah TEFA                   |

---

## 🎨 Color System

### Palet Global (CSS Custom Properties)

Didefinisikan di [globals.css](file:///c:/Penting/MOKLET/Project/dev-frontend-tefa-rev-main/app/globals.css) di dalam `:root`:

```
┌─────────────────────────┬───────────┬──────────────────────────────────┐
│ Variable                │ Value     │ Penggunaan                       │
├─────────────────────────┼───────────┼──────────────────────────────────┤
│ --background            │ #F5F4F2   │ Background halaman utama         │
│ --foreground            │ #1C1C2E   │ Teks utama                       │
│ --card                  │ #FFFFFF   │ Background card                  │
│ --card-foreground       │ #1C1C2E   │ Teks di dalam card               │
│ --primary               │ #C0272D   │ Warna brand utama (Merah TEFA)   │
│ --primary-foreground    │ #FFFFFF   │ Teks di atas primary             │
│ --secondary             │ #FBF7F7   │ Background secondary (tint merah)│
│ --secondary-foreground  │ #C0272D   │ Teks secondary                   │
│ --muted                 │ #F5F4F2   │ Background muted                 │
│ --muted-foreground      │ #3B3B58   │ Teks muted                       │
│ --accent                │ #FBF7F7   │ Background aksen                 │
│ --accent-foreground     │ #C0272D   │ Teks aksen                       │
│ --destructive           │ #DC2626   │ Error / destructive              │
│ --border                │ #E8E6E1   │ Border default                   │
│ --input                 │ #E8E6E1   │ Border input                     │
│ --ring                  │ #C0272D   │ Focus ring                       │
│ --radius                │ 0.75rem   │ Base border-radius               │
├─────────────────────────┼───────────┼──────────────────────────────────┤
│ --sidebar               │ #FAFAF9   │ Background sidebar               │
│ --sidebar-foreground    │ #1C1C2E   │ Teks sidebar                     │
│ --sidebar-primary       │ #C0272D   │ Warna primary sidebar            │
│ --sidebar-border        │ #E8E6E1   │ Border sidebar                   │
│ --sidebar-accent        │ #FBF7F7   │ Nav item aktif bg                │
├─────────────────────────┼───────────┼──────────────────────────────────┤
│ --chart-1               │ #C0272D   │ Merah (grafik)                   │
│ --chart-2               │ #1E56A0   │ Biru (grafik)                    │
│ --chart-3               │ #6D28D9   │ Ungu (grafik)                    │
│ --chart-4               │ #374151   │ Abu gelap (grafik)               │
│ --chart-5               │ #6B7280   │ Abu medium (grafik)              │
└─────────────────────────┴───────────┴──────────────────────────────────┘
```

### Palet Warna Kunci

```
Merah TEFA        #C0272D  ██████  — Brand color, CTA, links
Merah Gelap       #991B1F  ██████  — Hover state
Biru TKJ          #1E56A0  ██████  — Jurusan TKJ
Biru Tua          #1A5276  ██████  — Portal TKJ / Pelanggan
Ungu PG           #6D28D9  ██████  — Jurusan PG
Ungu Gelap        #5B2C6F  ██████  — Portal PG / Marketing
Hijau Guru        #145A32  ██████  — Portal Guru
Abu Operator      #2E4057  ██████  — Portal Operator
Background        #F5F4F2  ██████  — Warm off-white
Card Surface      #FFFFFF  ██████  — Putih bersih
Surface Alt       #FAFAF9  ██████  — Sidebar, input bg
Tint Merah        #FBF7F7  ██████  — Secondary background
Border            #E8E6E1  ██████  — Border universal
Footer            #0d1117  ██████  — Footer gelap
```

---

## 📐 Spacing & Radius

### Radius System

Berbasis variable `--radius: 0.75rem` (12px):

| Token        | Formula                          | Hasil   | Penggunaan                   |
|--------------|----------------------------------|---------|------------------------------|
| `radius-sm`  | `calc(var(--radius) * 0.6)`      | ~7.2px  | Checkbox, small elements     |
| `radius-md`  | `calc(var(--radius) * 0.8)`      | ~9.6px  | Button small                 |
| `radius-lg`  | `var(--radius)`                  | 12px    | Button, card default         |
| `radius-xl`  | `calc(var(--radius) * 1.4)`      | ~16.8px | Large cards                  |
| `radius-2xl` | `calc(var(--radius) * 1.8)`      | ~21.6px | Modal, sheet                 |

### Radius dalam Praktik

| Elemen              | Radius yang Digunakan        |
|---------------------|------------------------------|
| Input               | `rounded-[10px]`             |
| Button CTA          | `rounded-[10px]` atau `rounded-xl` |
| Card                | `rounded-xl` (12px)          |
| Card besar          | `rounded-2xl` (16px)        |
| Avatar / Logo box   | `rounded-xl` (12px)          |
| Nav item aktif      | `rounded-xl`                 |
| Badge               | `rounded-full`               |
| Floating badge      | `rounded-xl`                 |

### Spacing Patterns

| Konteks                       | Nilai                          |
|-------------------------------|--------------------------------|
| Page padding (desktop)        | `px-8 pt-8 pb-8`              |
| Page padding (mobile)         | `px-4 pt-6`                   |
| Card internal padding         | `p-6` atau `p-7`              |
| Grid gap (stat cards)         | `gap-5`                        |
| Section margin bottom         | `mb-8`                         |
| Sidebar width (desktop)       | `w-[260px]`                    |
| Sidebar nav padding           | `px-3 py-2`                    |
| Nav item padding              | `px-4 py-2.5`                  |
| Max width (landing)           | `max-w-6xl` (72rem = 1152px)   |

---

## 🧩 Component Library

### Button

Menggunakan `shadcn/ui` Button dari [button.tsx](file:///c:/Penting/MOKLET/Project/dev-frontend-tefa-rev-main/components/ui/button.tsx) dengan variant CVA:

| Variant       | Visual                                                      |
|---------------|-------------------------------------------------------------|
| `default`     | `bg-primary text-white hover:bg-primary/80`                 |
| `outline`     | `border-border bg-background hover:bg-muted`                |
| `secondary`   | `bg-secondary text-secondary-foreground`                    |
| `ghost`       | Transparan, `hover:bg-muted`                                |
| `destructive` | `bg-destructive/10 text-destructive hover:bg-destructive/20`|
| `link`        | Underline on hover                                          |

**CTA Button Pattern (Custom)**:
```tsx
<button
  className="px-5 py-2.5 rounded-xl text-white font-semibold text-sm
             transition-all duration-200 hover:opacity-90 cursor-pointer"
  style={{
    backgroundColor: roleColor,
    boxShadow: `0 4px 14px ${roleColor}30`,
  }}
>
```

---

### Card

Dari [card.tsx](file:///c:/Penting/MOKLET/Project/dev-frontend-tefa-rev-main/components/ui/card.tsx):
- Background: `bg-card` (putih)
- Border: `ring-1 ring-foreground/10`
- Radius: `rounded-xl`
- Padding: `py-4`, content `px-4`

**Card Pattern di Dashboard**:
```tsx
<div className="bg-white rounded-2xl border border-[#E8E6E1] p-7">
```

---

### StatCard

Didefinisikan di [DashboardLayout.tsx](file:///c:/Penting/MOKLET/Project/dev-frontend-tefa-rev-main/components/DashboardLayout.tsx#L279-L317):

```
┌─────────────────────────────┐
│                      📊 (icon)│
│  Label text (muted)          │
│  42 (value, text-3xl bold)   │
│  +3 minggu ini (change)      │
└─────────────────────────────┘
```

- Background: `bg-white`
- Border: `border border-[#E8E6E1]`
- Radius: `rounded-xl`
- Padding: `p-6`
- Hover: `hover:-translate-y-0.5` + dynamic border color + box-shadow
- Icon: absolute positioned top-right, emoji `text-2xl`

---

### Input

```tsx
<Input
  className="h-11 rounded-[10px] border-[1.5px] bg-[#FAFAF9] px-4 text-sm
             placeholder:text-[#9CA3AF]
             focus-visible:border-[#C0272D] focus-visible:ring-[#C0272D]/10
             border-[#E8E6E1]"
/>
```

| Property        | Value                      |
|-----------------|----------------------------|
| Height          | `h-11` (44px)              |
| Border width    | `1.5px`                    |
| Background      | `#FAFAF9` (surface alt)    |
| Border (normal) | `#E8E6E1`                  |
| Border (focus)  | `#C0272D`                  |
| Focus ring      | `#C0272D` at 10% opacity   |
| Border (error)  | `border-red-500`           |

---

### Badge / Pill

```tsx
// Section badge (landing)
<Badge className="bg-[#FBF7F7] text-[#C0272D] border border-[#C0272D]/20
                  px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase">

// Department badge
<Badge className="text-xs font-semibold text-white"
       style={{ backgroundColor: "#C0272D" }}>

// Status badge (rounded-full)
<span className="text-xs font-bold px-3.5 py-1.5 rounded-full"
      style={{ backgroundColor: "#dcfce7", color: "#166534" }}>
  In Progress
</span>
```

**Status Badge Colors**:

| Status       | Background  | Text Color |
|--------------|-------------|------------|
| In Progress  | `#dcfce7`   | `#166534`  |
| Review       | `#fef3c7`   | `#92400e`  |
| Running      | `#dcfce7`   | `#166534`  |
| Draft        | `#F5F4F2`   | `#6B6A7A`  |
| Internal     | `#dcfce7`   | `#166534`  |
| Eksternal    | `#F5F4F2`   | `#6B6A7A`  |

---

### Sidebar Navigation Item

```tsx
// Active state
{
  backgroundColor: colors.tint,    // e.g. #FBF7F7
  color: colors.primary,           // e.g. #C0272D
  fontWeight: 600,
  border: `1px solid ${colors.primary}26`,
}

// Inactive state
{
  color: "#6B6A7A",
  border: "1px solid transparent",
}

// Hover (inactive)
{
  backgroundColor: "#F5F4F2",
  color: "#1C1C2E",
}
```

---

## 🏗 Layout Architecture

### 1. Landing Page

```
┌──────────────────────────────────────────┐
│  Navbar (sticky top, bg-white/90 blur)   │
├──────────────────────────────────────────┤
│  Hero (bg-white, 2-column grid)          │
├──────────────────────────────────────────┤
│  Services (bg-white, 3-column grid)      │
├──────────────────────────────────────────┤
│  Portfolio                               │
├──────────────────────────────────────────┤
│  About                                   │
├──────────────────────────────────────────┤
│  CTA Banner                             │
├──────────────────────────────────────────┤
│  Contact Form                            │
├──────────────────────────────────────────┤
│  Footer (bg-[#0d1117])                   │
└──────────────────────────────────────────┘
```

- Max width: `max-w-6xl` (1152px)
- Background: `bg-[#F5F4F2]` (warm off-white)
- Sections alternate between `bg-white` dan `bg-[#F5F4F2]`

### 2. Auth Pages (Sign-in / Sign-up)

```
┌──────────────────┬──────────────────┐
│                  │                  │
│   Form Panel     │   Branding Panel │
│   (bg-white)     │   (gradient red) │
│                  │                  │
│   Logo           │   Floating icon  │
│   Heading        │   Title          │
│   Google btn     │   Description    │
│   ── or ──       │   Stat strip     │
│   Email form     │                  │
│   Submit btn     │                  │
│   Footer link    │                  │
│                  │                  │
└──────────────────┴──────────────────┘
```

- Layout: `grid grid-cols-1 md:grid-cols-2 min-h-screen`
- Panel kiri: putih, max-w `480px`, `px-12 py-10`
- Panel kanan: gradient `135deg` dari `#C0272D` ke `#991B1F`
- Dekoratif: lingkaran `bg-white/8` dan `bg-white/5`

### 3. Dashboard (Semua Role)

```
┌──────────┬──────────────────────────────┐
│          │  Header                      │
│ Sidebar  │  ┌─ Badge [Internal/Ext]     │
│ 260px    │  ├─ H1: Greeting, Name       │
│          │  └─ Subtitle                 │
│ ┌──────┐ ├──────────────────────────────┤
│ │ Logo │ │  Content Area               │
│ ├──────┤ │                              │
│ │ User │ │  ┌── Stat Cards (3-col) ──┐  │
│ │ Card │ │  └────────────────────────┘  │
│ ├──────┤ │                              │
│ │ Nav  │ │  ┌── Info / Table Card ───┐  │
│ │ Items│ │  └────────────────────────┘  │
│ ├──────┤ │                              │
│ │Logout│ │                              │
│ └──────┘ │                              │
└──────────┴──────────────────────────────┘
```

**Layout component**: [DashboardLayout.tsx](file:///c:/Penting/MOKLET/Project/dev-frontend-tefa-rev-main/components/DashboardLayout.tsx)

- Sidebar: `w-[260px]`, `bg-white`, `border-r border-[#E8E6E1]`
- Main: `bg-[#F5F4F2]`, `flex-1`
- Mobile: Sheet (slide-in dari kiri, `w-[280px]`)
- Header: `px-4 sm:px-8 pt-6 sm:pt-8 pb-6`
- Content: `px-4 sm:px-8 pb-8`

---

## 🎭 Role-Based Theming

Setiap role memiliki **warna primary** dan **tint** yang unik.
Didefinisikan di [ROLE_COLORS](file:///c:/Penting/MOKLET/Project/dev-frontend-tefa-rev-main/components/DashboardLayout.tsx#L15-L24):

| Role          | Primary   | Tint      | Label              | Route                   |
|---------------|-----------|-----------|--------------------|-------------------------|
| `admin`       | `#C0272D` | `#FBF7F7` | Panel Admin        | `/admin/dashboard`      |
| `guru`        | `#145A32` | `#F0FDF4` | Portal Guru        | `/guru/dashboard`       |
| `student_rpl` | `#C0272D` | `#FBF7F7` | Portal RPL         | `/user/dashboard`       |
| `student_tkj` | `#1A5276` | `#EFF6FF` | Portal TKJ         | `/user/dashboard`       |
| `student_pg`  | `#5B2C6F` | `#F5F3FF` | Portal PG          | `/user/dashboard`       |
| `operator`    | `#2E4057` | `#F1F5F9` | Operator Station   | `/operator/dashboard`   |
| `pemasaran`   | `#5B2C6F` | `#F5F3FF` | Marketing Hub      | `/marketing/dashboard`  |
| `pelanggan`   | `#1A5276` | `#EFF6FF` | Customer Portal    | `/cust/dashboard`       |

### Bagaimana Warna Role Diterapkan

Warna role digunakan secara **dinamis** di:

1. **Sidebar logo box** — `backgroundColor: colors.primary`
2. **User card** — `backgroundColor: colors.tint`, border: `${colors.primary}33`
3. **User card badge** — `backgroundColor: ${colors.primary}1A`, `color: colors.primary`
4. **Nav item aktif** — `backgroundColor: colors.tint`, `color: colors.primary`
5. **Header greeting name** — `color: colors.primary`
6. **StatCard hover** — `borderColor: ${roleColor}4D`, `boxShadow: 0 8px 24px ${roleColor}15`
7. **CTA button** — `backgroundColor: roleColor`, `boxShadow: 0 4px 14px ${roleColor}30`
8. **Info card gradient** — `from ${roleColor}0D to ${roleColor}08`
9. **Project item icon bg** — `backgroundColor: colors.tint`
10. **"Lihat Semua" link** — `color: roleColor`

### Elemen yang TIDAK berubah per role (tetap konsisten)

| Elemen                  | Nilai Tetap     |
|-------------------------|-----------------|
| Background halaman      | `#F5F4F2`       |
| Sidebar background      | `bg-white`      |
| Card background         | `bg-white`      |
| Border semua komponen   | `#E8E6E1`       |
| Teks heading            | `#1C1C2E`       |
| Teks secondary          | `#6B6A7A`       |
| Teks body               | `#3B3B58`       |
| Logout button           | `text-red-600`  |

---

## ✨ Animation & Interaction

### Keyframes yang Digunakan

```css
/* Dashboard fade in */
@keyframes dashFadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.dash-fadein { animation: dashFadeIn 0.45s ease-out both; }

/* Landing hero float */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}

/* Landing fade in (left/right) */
@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-24px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(24px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* General fade-in (contact-supervisor) */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Sign-in page */
animate-in fade-in slide-in-from-bottom-3 duration-500
```

### Hover & Transition Patterns

| Komponen             | Efek Hover                                                         |
|----------------------|--------------------------------------------------------------------|
| StatCard             | `-translate-y-0.5` + dynamic border color + box-shadow             |
| Service Card         | `-translate-y-1` + `shadow-lg` + `border-[#C0272D]/20`            |
| Supervisor Card      | `-translate-y-[4px]` + `shadow 0 8px 32px rgba(0,0,0,.08)`        |
| CTA Button           | `-translate-y-px` + `shadow-lg` / `opacity-90`                    |
| Nav item (sidebar)   | `bg-[#F5F4F2]` + `color: #1C1C2E`                                |
| Nav item (navbar)    | `text-[#C0272D]` + `bg-[#FBF7F7]`                                |
| Project row          | `border-[#6B6A7A]/30`                                             |

**Transition duration standar**: `150ms` (nav), `200ms` (button/card), `300ms` (navbar scroll)

---

## 🖼 Iconography

### Pendekatan Campuran

Website ini menggunakan **3 sumber ikon**:

1. **Emoji** — Digunakan di sidebar nav items, stat cards, user cards, dan project icons
   - Contoh: `🏠 🚀 ✅ ⏳ 📁 📊 💬 👤 🚪 👨‍🏫 🛠️ 📣 🛍️ 💳 🎧`

2. **Lucide React** — Digunakan di form (Eye, EyeOff, Loader2, Menu)
   - Import: `from "lucide-react"`

3. **Inline SVG** — Digunakan di landing page untuk service icons, hero decorations, dan badge icons
   - `strokeWidth: 2` atau `2.5`
   - Warna mengikuti `iconColor` per layanan

### Icon Sizing

| Konteks                | Ukuran              |
|------------------------|---------------------|
| Sidebar nav emoji      | `text-lg`           |
| StatCard icon (emoji)  | `text-2xl`          |
| Project list icon      | `text-xl`           |
| Lucide icons (form)    | `size-[18px]`       |
| Landing service icon   | `w-12 h-12` container, `24x24` SVG |
| Hero floating badge    | `w-10 h-10` container |

---

## 📝 Cheat Sheet — Dashboard Redesign

### Quick Reference: Membuat Dashboard Baru untuk Sebuah Role

```tsx
import DashboardLayout, {
  StatCard,
  ROLE_COLORS,
} from "@/components/DashboardLayout";

export default function MyRoleDashboard() {
  const role = "admin"; // ganti sesuai role
  const roleColor = ROLE_COLORS[role].primary;

  return (
    <DashboardLayout
      role={role}
      user={{
        name: "Nama User",
        email: "email@example.com",
        icon: "🛡️",
        majorLabel: "Role Label",
        isInternal: true,
      }}
      navItems={[
        { icon: "📊", label: "Overview", href: "/role/dashboard", active: true },
        { icon: "👥", label: "Menu 2", href: "/role/menu2" },
      ]}
      headerTitle="Role Dashboard"
      headerSubtitle="Deskripsi singkat dashboard"
      headerAction={/* Optional button */}
    >
      {/* KONTEN DASHBOARD */}

      {/* 1. Stat Cards — selalu 3 kolom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 dash-fadein">
        <StatCard label="..." value="..." icon="📊" roleColor={roleColor} />
      </div>

      {/* 2. Info Card */}
      <div className="bg-white rounded-2xl border border-[#E8E6E1] p-7 dash-fadein">
        <h2 className="text-lg font-extrabold text-[#1C1C2E] mb-6">
          Section Title
        </h2>
        {/* content... */}
      </div>
    </DashboardLayout>
  );
}
```

### Patterns yang Harus Diikuti

> [!IMPORTANT]
> **Konsistensi wajib dijaga** untuk elemen-elemen berikut agar semua role terasa seperti satu aplikasi:

- ✅ Gunakan `DashboardLayout` sebagai wrapper
- ✅ Gunakan `ROLE_COLORS[role]` untuk warna dinamis
- ✅ Gunakan `StatCard` untuk stat cards
- ✅ Card content: `bg-white rounded-2xl border border-[#E8E6E1] p-7`
- ✅ Section title: `text-lg font-extrabold text-[#1C1C2E]`
- ✅ Grid stat cards: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5`
- ✅ Tambahkan `dash-fadein` class pada elemen konten untuk animasi masuk
- ✅ Status badge: `rounded-full` dengan warna semantik

### Patterns yang Bisa Dikustomisasi per Role

- 🎨 Konten utama di bawah stat cards (tabel, list, chart, dll)
- 🎨 `headerAction` (tombol/badge di header kanan)
- 🎨 `navItems` (menu navigasi sidebar)
- 🎨 Jumlah dan jenis StatCard
- 🎨 Section tambahan (activity log, project list, campaign list, dll)

---

## 📂 Struktur File Terkait

```
app/
├── globals.css                      ← CSS variables, theme tokens
├── layout.tsx                       ← Root layout, font loading
├── page.tsx                         ← Landing page
├── admin/dashboard/page.tsx         ← Admin dashboard
├── user/dashboard/page.tsx          ← User dashboard (multi-role)
├── guru/dashboard/page.tsx          ← Guru dashboard
├── operator/dashboard/page.tsx      ← Operator dashboard
├── marketing/dashboard/page.tsx     ← Marketing dashboard
├── cust/dashboard/page.tsx          ← Customer dashboard
├── sign-in/page.tsx                 ← Login page
├── sign-up/page.tsx                 ← Register page
├── contact-supervisor/page.tsx      ← Contact page (inline styles)
│
components/
├── DashboardLayout.tsx              ← Shared layout + StatCard + ROLE_COLORS
├── landing/                         ← Landing page components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Portfolio.tsx
│   ├── About.tsx
│   ├── CtaBanner.tsx
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   └── TickerBar.tsx
├── ui/                              ← shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── badge.tsx
│   ├── alert.tsx
│   ├── checkbox.tsx
│   ├── select.tsx
│   ├── separator.tsx
│   ├── sheet.tsx
│   └── textarea.tsx
│
components.json                      ← shadcn config (radix-nova style)
```

---

> [!TIP]
> Saat mengubah desain dashboard untuk role tertentu, **jangan mengubah `DashboardLayout.tsx`** kecuali perubahan tersebut berlaku untuk semua role. Setiap kustomisasi spesifik role harus dilakukan di file `page.tsx` masing-masing.
