# PRD — TEFA Admin Dashboard (Redesign: "TEFA Command")

**Status:** Draft v1.0
**Target consumer:** AI coding agent (implementation on existing TEFA Next.js + NestJS codebase)
**Source design:** Google Stitch export — `TEFA Command` design system (DESIGN.md + code.html mockup, screen: *Persetujuan Antrean / Admin Approval*)
**Prepared for:** SMK Telkom Malang — TEFA (Teaching Factory) platform

---

## 1. Background

TEFA is a web platform that bridges SMK Telkom Malang students with industry/external partners: students submit completed projects, department teachers review and approve them for public listing, approved projects are shown publicly, and interested industry parties contact the responsible teacher as the official point of contact.

The platform already has:
- Next.js 14 frontend, NestJS backend, MySQL/MariaDB + Prisma
- Auth & profile UI (`useSignIn`, `useSignUp`, `useProfileSetup` hooks), two-step email verification, multipart form handling
- Role-based routing across 5 roles
- shadcn/ui components with an institutional color palette (color tokens currently defined **locally per file**, not in global CSS)

This PRD covers a **redesign + build-out of the Admin role's dashboard shell and its 6 core sections**, using the new "TEFA Command" visual design system produced in Stitch. Only one screen (Admin → Users → *Persetujuan Antrean*) was fully mocked up; the rest of the sections are specified here at requirements level so the agent can build consistent, on-brand pages even without a mockup for every screen.

## 2. Goals

1. Ship a reusable **Admin dashboard shell** (sidebar + top bar + content frame) matching the TEFA Command design system.
2. Ship a fully working **Users → Persetujuan Antrean (Approval Queue)** page — the only page with a pixel-level mockup — including real approve/reject actions against the backend.
3. Ship functional (if visually simpler) **Dashboard, Projects, Inventory, Financials, Settings** pages that share the same shell, tokens, and component library.
4. Migrate the color/typography/spacing tokens from "defined locally per file" into a shared, global design-token source so all Admin pages stay consistent.
5. Keep everything role-gated to `admin`, reusing existing auth/session logic — no new auth system.

## 3. Non-goals / Out of scope

- Pemasaran, Operator, and Pelanggan dashboards (their brand colors — `pemasaran #5B2C6F`, `operator #2E4057`, `pelanggan #1A5276` — are reserved in the token set for future PRDs, but **no screens for those roles are built in this PRD**).
- Public-facing project listing pages (existing feature, not touched here).
- Payment gateway integration for Financials (this PRD covers the Financials **view/record UI** only, not a payment processor integration).
- Dark mode is only a token toggle; dark-specific QA is not required this iteration (Tailwind config already carries some `dark:` classes — keep them working, but don't design new dark states).

## 4. Users & permissions

| Role | Access in this PRD |
|---|---|
| `admin` | Full access to all 6 sidebar sections described below |
| `guru` / `pemasaran` / `operator` / `pelanggan` / `siswa` | No access — route guard redirects away from `/admin/*` |

Use the existing role-based routing/middleware already in the codebase; add `admin` guard to every route under `/admin`.

## 5. Information architecture

Sidebar (fixed, 260px desktop / drawer on mobile), in this order:

1. **Dashboard** — `dashboard` icon — overview/home
2. **Projects** — `work` icon
3. **Inventory** — `inventory_2` icon
4. **Financials** — `payments` icon
5. **Users** — `group` icon — *(this PRD's fully-specified screen: Persetujuan Antrean)*
6. **Settings** — `settings` icon

Footer of sidebar: primary **"New Project"** button, then **Help Center** and **Logout** links.

Top bar (sticky, glassmorphic `bg-white/90` + backdrop blur): page context title, global search ("Search across dashboard..."), notifications bell, apps grid icon, user avatar.

---

## 6. Design system spec

Source of truth: `DESIGN.md` (attached) — implement as shared tokens, not per-file constants.

### 6.1 Color tokens
Migrate every value below into a global token file (e.g. Tailwind `theme.extend.colors` in `tailwind.config.ts`, or CSS variables in `globals.css` consumed by Tailwind) so no page re-declares its own colors.

```
surface: #faf9f7            surface-dim: #dbdad8
surface-bright: #faf9f7     surface-container-lowest: #ffffff
surface-container-low: #f4f3f1    surface-container: #efeeec
surface-container-high: #e9e8e6   surface-container-highest: #e3e2e0
on-surface: #1a1c1b         on-surface-variant: #5a403e
inverse-surface: #2f3130    inverse-on-surface: #f1f1ef
outline: #8f706d            outline-variant: #e3bebb
surface-tint: #b72028
primary: #9d0518            on-primary: #ffffff
primary-container: #c0272d  on-primary-container: #ffdad7
inverse-primary: #ffb3ae
secondary: #5f5e5e          on-secondary: #ffffff
secondary-container: #e5e2e2      on-secondary-container: #656464
tertiary: #4b4a5f           on-tertiary: #ffffff
tertiary-container: #636277 on-tertiary-container: #e2dff8
error: #ba1a1a               on-error: #ffffff
error-container: #ffdad6     on-error-container: #93000a
primary-fixed: #ffdad7       primary-fixed-dim: #ffb3ae
on-primary-fixed: #410004    on-primary-fixed-variant: #930015
secondary-fixed: #e5e2e2     secondary-fixed-dim: #c9c6c6
on-secondary-fixed: #1c1b1c  on-secondary-fixed-variant: #484647
tertiary-fixed: #e2e0f9      tertiary-fixed-dim: #c6c4dc
on-tertiary-fixed: #1a1a2c   on-tertiary-fixed-variant: #454559
background: #faf9f7          on-background: #1a1c1b
surface-variant: #e3e2e0

# role accents (reserved; only "admin" is used by pages in this PRD)
admin: #C0272D
pemasaran: #5B2C6F
operator: #2E4057
pelanggan: #1A5276

# semantic
success-bg: #DCFCE7   success-text: #166534
warning-bg: #FEF3C7   warning-text: #92400E
footer-bg: #0D1117
border-default: #E8E6E1
```

Primary system accent = **Admin Red `#C0272D`** (button/CTA primary is `#9d0518`/`#c0272d` per token — implement exactly as listed above, don't invent new reds). Status colors follow **background-tint / dark-text** pattern (never solid-fill badges).

### 6.2 Typography
Font: **Plus Jakarta Sans** (weights 400–800), loaded via Google Fonts as in the mockup.

| Token | Size | Weight | Line-height | Tracking |
|---|---|---|---|---|
| hero-h1 | 44px | 800 | 1.2 | -0.02em |
| dashboard-h1 | 30px | 700 | 36px | -0.02em |
| dashboard-h1-mobile | 24px | 700 | 32px | — |
| section-h2 | 32px | 700 | 40px | -0.02em |
| card-title | 18px | 800 | 24px | — |
| stat-metric | 30px | 700 | 36px | — |
| body-main | 15px | 400 | 24px | — |
| nav-link | 14px | 500 | 20px | — |
| label-sm | 12px | 600 | 16px | — |

### 6.3 Spacing / shape
- Sidebar width: `260px` desktop, drawer (Sheet) on mobile
- Container padding: `2rem` desktop / `1rem` mobile
- Grid gap: `1.25rem` · Card padding: `1.75rem` · Section gap: `2rem`
- Radius: `sm 0.25rem` · `DEFAULT 0.5rem` · `md 0.75rem` (base card/button radius = 12px) · `lg 1rem` · `xl 1.5rem` (modals/sheets) · `full 9999px` (badges/pills)
- Card borders: 1px, `#E8E6E1`
- Input borders: 1.5px, `#E8E6E1`; focus ring = `primary`
- StatCard hover shadow: `0 8px 24px [role-color]15`
- Primary button shadow: `0 4px 14px [role-color]30`
- Mount animation: `dash-fadein` — `opacity 0→1, translateY(10px→0)`, `0.45s ease-out`, usable with staggered `animation-delay` (e.g. header 0s, main card 0.1s)

---

## 7. Shared shell components

Build these once, reuse across all 6 pages.

### 7.1 `DashboardLayout`
Wraps every `/admin/*` page. Renders `SideNavBar` + `TopAppBar` + `<main>` content slot. Applies `dash-fadein` to its content on mount. Handles the mobile sidebar→drawer breakpoint.

### 7.2 `SideNavBar`
- Fixed left, `260px`, `bg-surface-container-low`, right border `border-default`
- Logo block: `school` icon in a `primary/10` rounded box + "TEFA SMK Telkom" / "Management System" wordmark
- Nav links: Dashboard, Projects, Inventory, Financials, Users, Settings — active link styled with `text-primary font-bold bg-primary/5 border-r-4 border-primary` (see mockup: "Users" is active)
- Footer: primary "New Project" CTA button, divider, "Help Center" link, "Logout" link (error-colored, red hover)
- Mobile: collapses into a Sheet/drawer triggered by the top bar's menu icon

### 7.3 `TopAppBar`
- Sticky, `z-30`, `bg-surface/90` + backdrop blur, bottom border, height `64px`
- Left: page title (desktop only, `dashboard-h1`), mobile menu button, global search input ("Search across dashboard...")
- Right: notification bell button, apps-grid button, user avatar (circular, ring on hover)

### 7.4 `StatCard`
Bold metric (`stat-metric` token) + semibold label + Lucide/Material icon housed in a 10%-opacity role-color background box. Used on Dashboard, and optionally Inventory/Financials summaries. Grid: 3-col desktop / 2-col tablet / 1-col mobile.

### 7.5 `StatusBadge`
Pill (`rounded-full`), `label-sm` text, background-tint/dark-text pairs:
- **Running** → `success-bg` / `success-text`
- **Review** → `warning-bg` / `warning-text`
- **Draft / neutral** → muted grey tint

### 7.6 `DataTable` (generic, used by Users/Projects/Inventory/Financials lists)
Column header row (`nav-link` token, `text-secondary`), row hover (`bg-surface-container-low/30`), row-action buttons that fade in on row hover (`opacity-0 group-hover:opacity-100`), divider rows (`divide-border-default`).

### 7.7 `Pagination`
"Showing X to Y of Z entries" label + numbered page buttons (active = solid `primary` bg, white text) + prev/next chevrons, disabled state at bounds.

---

## 8. Page specs

### 8.1 Users — Persetujuan Antrean (fully specified, has mockup)

**Route:** `/admin/users` (or `/admin/approvals` — confirm against existing routing convention)
**Purpose:** Verify user registrations and new project submissions awaiting approval.

**Layout:**
- Page header: title "Persetujuan Antrean" (`section-h2`) + subtitle "Verifikasi pendaftaran pengguna dan pengajuan proyek baru" (`body-main`, secondary color), right-aligned search input ("Cari entitas...") + Filter button (with `filter_list` icon)
- Main card (`surface-container-lowest`, `rounded-2xl`, 1px border, `shadow-sm`)
  - **Tabs:** `Semua (14)` [active/red underline] · `User (8)` · `Proyek (6)` — counts are live counts of pending+active entities, not hardcoded
  - **Table columns:** Entitas (avatar/icon + name) · Kategori · Tanggal · Status · Aksi (right-aligned)
  - **Entity row rendering:**
    - Person entities (student/teacher registrations) → circular avatar with initials (e.g. "BS", "SA")
    - Non-person entities (project/partner submissions) → square rounded icon (e.g. `build` icon for a school project, `domain` icon for an industry partner)
  - **Status → available actions:**
    - `Review` → show **Approve** (`check_circle`, success-colored, hover `success-bg`) and **Reject** (`cancel`, error-colored, hover `error/10`) icon buttons
    - `Running` (already approved/active) → show **View Details** (`visibility`) icon button only
  - **Pagination:** "Showing 1 to 4 of 14 entries" + numbered pages + chevrons

**Behavior / acceptance criteria:**
- [ ] Tab switch (`Semua` / `User` / `Proyek`) filters the table client-side or via query param without full page reload; counts on each tab badge always reflect the current total for that filter, not just the current page
- [ ] "Cari entitas..." search filters rows by entity name (debounced, ≥300ms)
- [ ] "Filter" button opens a filter panel/dropdown for Status and/or Kategori (exact filter fields: confirm with design, minimum viable = filter by Status)
- [ ] Clicking **Approve** on a `Review` row: calls the approve endpoint, optimistically updates the row's status to `Running`, shows a success toast, row loses Approve/Reject and gains View Details
- [ ] Clicking **Reject** on a `Review` row: opens a confirmation (and optionally a reason field) before calling the reject endpoint; on confirm, removes the row from the queue (or marks it `Rejected`) and shows a toast
- [ ] Clicking **View Details** opens a detail view/modal with the full submission (registration form data or project submission data)
- [ ] Empty state: when a tab/filter/search yields zero rows, show an empty-state message instead of an empty table
- [ ] Pagination is server-driven (page + pageSize query params) once entity count can exceed a single page's data cost; page size = 10 rows to match "Showing 1 to 4 of 14" pattern's implied grid (confirm final page size with product; mockup shows 4 rows visible, so at minimum support a configurable page size)
- [ ] All interactive elements keyboard-accessible; icon-only buttons have `title`/`aria-label` (mockup already uses `title="Approve"` etc. — keep them)
- [ ] Loading state: skeleton rows while fetching; disable action buttons while a request for that row is in flight

### 8.2 Dashboard (overview) — spec only, no mockup

**Route:** `/admin/dashboard` (or `/admin`)
**Purpose:** At-a-glance operational overview for the admin.

**Minimum requirements:**
- Row of `StatCard`s (3-col desktop) — suggested metrics: Total Pending Approvals, Active Projects, Total Users, Total Industry Partners (finalize exact metrics with stakeholder; wire to real counts, not placeholders)
- A recent-activity or recent-approvals list/table (can reuse `DataTable` in a condensed form) showing the latest items also visible on the Users approval queue, as a shortcut
- Uses the same `dash-fadein` staggered entrance as the mockup

### 8.3 Projects — spec only, no mockup

**Route:** `/admin/projects`
**Purpose:** Manage/browse all student and partner projects (not just pending ones — this is the full project catalog, vs. Users' approval-queue view which only shows pending items).

**Minimum requirements:**
- `DataTable` listing: project name, category (RPL/TKJ/etc.), submitting student(s)/team, status (`Draft`/`Review`/`Running`/`Completed` — confirm full status enum with backend), date
- Search + status filter
- Row click → project detail view
- "New Project" sidebar CTA should deep-link here (or open a create-project flow) — confirm target with design

### 8.4 Inventory — spec only, no mockup

**Route:** `/admin/inventory`
**Purpose:** Track equipment/materials used by TEFA projects (workshop tools, lab equipment, etc.).

**Minimum requirements:**
- `DataTable`: item name, category, quantity/stock, status (In Stock / Low Stock / Out of Stock — reuse `StatusBadge` tint pattern), last updated
- Search + category filter
- Create/edit item form (modal or dedicated page)
- Confirm with stakeholder whether Inventory needs stock in/out transaction history in this iteration, or a simple current-state table is sufficient for v1

### 8.5 Financials — spec only, no mockup

**Route:** `/admin/financials`
**Purpose:** Track TEFA project-related income/expenses (e.g., partner project fees, material costs).

**Minimum requirements:**
- Summary `StatCard`s: Total Income, Total Expense, Net (this period)
- `DataTable`: transaction date, description, category, type (income/expense), amount, linked project (optional)
- Filter by date range and type
- **No payment gateway integration in this PRD** — records are entered/tracked manually by admin, not processed as live payments

### 8.6 Settings — spec only, no mockup

**Route:** `/admin/settings`
**Purpose:** Admin-level configuration.

**Minimum requirements (confirm exact scope with stakeholder before build):**
- Institution profile fields (name, logo, contact info shown on public pages)
- User role management shortcut (link to Users) or an admin-management sub-section (invite/manage other admins)
- Notification preferences (optional for v1)

---

## 9. Data model (Prisma — additive to existing schema)

> Adjust names/fields to match existing schema conventions before implementing — this is a proposed shape, not a mandate to rename existing models.

```prisma
enum ApprovalEntityType {
  USER_REGISTRATION
  PROJECT_SUBMISSION
}

enum ApprovalStatus {
  REVIEW
  RUNNING   // approved / active
  REJECTED
}

model ApprovalRequest {
  id          String              @id @default(cuid())
  entityType  ApprovalEntityType
  entityId    String              // FK to User.id or Project.id depending on entityType
  category    String              // e.g. "Siswa RPL", "Proyek TKJ", "Partner Industri", "Guru PG"
  status      ApprovalStatus      @default(REVIEW)
  submittedAt DateTime            @default(now())
  reviewedAt  DateTime?
  reviewedBy  String?             // admin user id
  rejectReason String?
}

model InventoryItem {
  id          String   @id @default(cuid())
  name        String
  category    String
  quantity    Int
  status      String   // In Stock | Low Stock | Out of Stock (derive from quantity + threshold, or store explicitly)
  updatedAt   DateTime @updatedAt
}

enum FinancialType {
  INCOME
  EXPENSE
}

model FinancialRecord {
  id          String        @id @default(cuid())
  date        DateTime
  description String
  category    String
  type        FinancialType
  amount      Decimal
  projectId   String?
  createdAt   DateTime      @default(now())
}
```

## 10. API contract (NestJS — proposed)

All routes under `/admin`, guarded by the existing auth middleware + an `admin`-only role guard.

```
GET    /admin/approvals?tab=all|user|project&status=&search=&page=&pageSize=
       → { items: ApprovalRequest[], counts: { all, user, project }, total, page, pageSize }

POST   /admin/approvals/:id/approve
       → 200, updates status to RUNNING, sets reviewedAt/reviewedBy

POST   /admin/approvals/:id/reject
       body: { reason?: string }
       → 200, updates status to REJECTED, sets reviewedAt/reviewedBy/rejectReason

GET    /admin/approvals/:id
       → full detail payload for the "View Details" action

GET    /admin/dashboard/summary
       → { pendingApprovals, activeProjects, totalUsers, totalPartners }

GET    /admin/projects?search=&status=&page=&pageSize=
GET    /admin/projects/:id

GET    /admin/inventory?search=&category=&page=&pageSize=
POST   /admin/inventory
PATCH  /admin/inventory/:id

GET    /admin/financials?type=&dateFrom=&dateTo=&page=&pageSize=
POST   /admin/financials
```

All list endpoints: standard `{ items, total, page, pageSize }` envelope so `Pagination` can be a fully shared component across pages.

---

## 11. Non-functional requirements

- **Responsive:** Sidebar → drawer below `md` breakpoint; container padding drops `2rem → 1rem`; StatCard grid `3 → 2 → 1` columns.
- **Accessibility:** All icon-only buttons need `title`/`aria-label`; color contrast for status badges must meet WCAG AA (the tint/dark-text pattern in the tokens already does — don't override with lighter text).
- **Performance:** Table lists paginated server-side once data volume is non-trivial; debounce search inputs.
- **Consistency:** No page may hardcode a hex color or one-off font-size — everything pulls from the global token file described in §6.1–6.2.
- **Reuse existing auth:** Do not build a new session/guard system — extend the current role-based routing to add `admin`-only guards on `/admin/*`.

## 12. Open questions (resolve before/while building)

1. Exact route prefix convention — is it `/admin/...` or something else in the current app router structure?
2. Final field list for Filter panel on the Approval Queue (status only, or also category/date range?).
3. Confirmed page size for all paginated tables (mockup implies a small number like 4–10 rows per page).
4. Status enum for Projects page beyond `Review`/`Running` — is there a `Draft`, `Completed`, or `Rejected` state shown elsewhere?
5. Scope of Settings page — confirm minimum viable fields for v1.
6. Whether Inventory needs transaction history (stock in/out log) in v1 or just current-state table.
7. Whether "New Project" sidebar CTA opens a create form or navigates to `/admin/projects/new`.

---

## 13. Handoff notes for the AI coding agent

- Reference assets available alongside this PRD: `DESIGN.md` (full token spec) and `code.html` (working Tailwind mockup of the Users → Persetujuan Antrean screen) — treat `code.html` as the ground truth for exact class names/structure on that one screen, and this PRD as ground truth for behavior and the other 5 pages.
- Build the shared shell (§7) first, then the Users page (§8.1) since it's fully specified, then the remaining pages in whatever order the team prioritizes.
- Do not invent new brand colors — every color used must come from the token table in §6.1.
- Flag any of the open questions in §12 back to the team rather than guessing silently.