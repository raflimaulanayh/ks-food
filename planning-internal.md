You are an expert Senior Frontend Engineer building the "Internal ERP System" (Application 3) for KS Food using Next.js 16, Tailwind CSS v4, and Atomic Design.

**CONTEXT:**
We are building a prototype for an Internal ERP Dashboard. Since we don't have a real backend yet, we must simulate Authentication and Role-Based Access Control (RBAC) using **Zustand** and **Mock Data**.

**ROLES & FEATURES (Based on System Requirements):**

1. **PIMPINAN** (`pimpinan@ksfood.id`):
   - Dashboard: Sales & Stock Graphs.
   - Menu: Approval Center (Gate Pass, Cuti), Laporan Bisnis.
2. **ADMIN** (`admin@ksfood.id`):
   - Dashboard: System Status.
   - Menu: User Management (CRUD), Master Data (Products/Categories).
3. **FINANCE** (`finance@ksfood.id`):
   - Dashboard: Cash Flow Stats.
   - Menu: Invoicing, Laporan Laba Rugi, Expenses.
4. **PROCUREMENT** (`procure@ksfood.id`):
   - Dashboard: Low Stock Alerts.
   - Menu: Production Planning (Job Order), Purchase Order, Stock View.
5. **QC_LAB** (`qc@ksfood.id`):
   - Dashboard: Defect Rate Stats.
   - Menu: Input Lab Result (Tes Batch), Defect Report, History QC.
6. **HR** (`hr@ksfood.id`):
   - Dashboard: Attendance Stats.
   - Menu: Data Karyawan, Perizinan & Cuti, Payroll.

**TASK: Build the Internal App Shell (`src/app/(internal)`)**

**1. Create Mock Auth Store (`src/store/useAuthStore.ts`)**

- Use `zustand`.
- State: `user` (name, email, role, avatarUrl) | null.
- Action `login(email, password)`:
  - Hardcode logic: IF email matches one of the roles above, set the user state accordingly.
  - Redirect to `/dashboard` on success.
- Action `logout()`: Clear state, redirect to `/login`.
- Persist state using `zustand/middleware` (persist to localStorage).

**2. Create Dashboard Layout (`src/components/templates/dashboard-layout`)**

- Create a layout specifically for the `(internal)` route.
- **Sidebar Component:**
  - Must be dynamic! Render menu items based on `useAuthStore.user.role`.
  - Use a constant `MENU_ITEMS` mapped by Role.
  - Style: Professional Dark Red (`#a31313`) sidebar, White content area.
  - Active state styling: Yellow/Orange accent (`#ffb800`).
- **Header Component:**
  - Show "Welcome, [Name]" and User Role Badge.
  - Profile Dropdown with Logout button.

**3. Create Login Page (`src/app/(internal)/login/page.tsx`)**

- Design a clean, corporate login card centered on screen.
- **CRITICAL:** Add "Quick Login Buttons" (e.g., "Login as CEO", "Login as QC", "Login as Admin") so I can switch roles easily for testing without typing.

**4. Create Dashboard Home Skeleton (`src/app/(internal)/dashboard/page.tsx`)**

- Create a basic `RoleBasedDashboard` widget.
- Use a `switch(role)` statement to render different text/placeholders for now (e.g., "Welcome CEO, here is your summary" vs "Welcome QC Staff").
- We will fill the detailed charts later.

**Tech Stack Compliance:**

- Use **Phosphor Icons** (`@phosphor-icons/react`) for sidebar icons.
- Use **Tailwind v4** variables (`--color-primary`, etc.) defined in `globals.css`.
- Ensure fully responsive (Mobile Sidebar Drawer).
