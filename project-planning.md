You are a Senior Frontend Engineer expert in Next.js 16, Tailwind CSS v4, and Atomic Design principles.

**Project Context:**
We are building "KS Food", a corporate & e-commerce website for a sauce/condiment manufacturer.
The project is already set up with:

- **Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Shadcn UI, Frammer Motion.
- **Design Pattern:** Atomic Design (`src/components/atoms`, `molecules`, `organisms`, `templates`).
- **Icons:** @phosphor-icons/react & react-icons.
- **State:** Zustand.
- **Form:** React Hook Form + Zod.

**Current State (DO NOT RECREATE THESE):**

- Global styles & CSS variables are set in `src/shared/styles/globals.css`.
- `Navbar` organism is ready.
- `Footer` organism is ready.
- `GeneralLayout` template is ready.

**Design System Tokens (Use these CSS variables):**

- Primary (Red): `var(--color-primary)` / `#a31313`
- Secondary (Yellow): `var(--color-secondary)` / `#ffb800`
- Accent (Orange): `var(--color-accent)` / `#ff6900`
- Font: `Poppins` (ensure `font-sans` is applied).

**TASK: Build the Landing Page (`src/app/(public)/page.tsx`)**
Create a modern, elegant, and high-performance landing page using the existing Atomic Design structure.

**Required Sections & Implementation Details:**

1.  **Hero Section (Organism):**
    - Use `embla-carousel-react` for a full-width image slider.
    - Images: Use placeholders for now (or assets from `public/` if available).
    - Content: Large H1 Headline with `framer-motion` fade-in text (e.g., "Cita Rasa Asli, Kualitas Terjaga").
    - CTA Buttons: "Jelajahi Produk" (Primary) and "Mitra B2B" (Outline/Secondary).

2.  **Trusted By (Molecule/Organism):**
    - A grayscale logo slider (marquee effect) showing partners (use dummy logos for Mayora, Gokana, Indofood).
    - Title: "Dipercaya oleh Brand Terkemuka".

3.  **Product Highlights (Organism):**
    - Display 3-4 top products cards.
    - **Card Molecule:** Image (top), Title (middle), Badges (Halal/BPOM), Price, and "Add to Cart" button (icon only or text).
    - Hover effect: Card lifts up slightly (`scale-105` transition).

4.  **Value Proposition (Organism):**
    - 3 Columns with Icons (Phosphor Icons).
    - Topics: "Bahan Alami", "Proses Higienis", "Bersertifikat Halal & BPOM".

5.  **CTA Split Section (Organism):**
    - Left side (Red bg): "Butuh untuk Dapur Rumah?" -> CTA to `/b2c`.
    - Right side (Yellow bg): "Butuh Pasokan Restoran?" -> CTA to `/b2b`.

**Coding Rules:**

- **Strictly** use Tailwind v4 semantics.
- Use `framer-motion` for subtle entrance animations (fade-up).
- Ensure specific components are broken down into atoms/molecules if they are reusable (e.g., `SectionHeader`, `ProductCard`).
- Use `shadcn` components if available in `src/components/atoms/ui` (like buttons), otherwise create new atoms.
- Ensure responsive design (mobile-first).

Let's start by creating the necessary atoms and molecules for the Hero and Product sections first, then assemble the page.
