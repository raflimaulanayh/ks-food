# Kertasari Sejahtera Food (KS Food)

Application to manage and showcase food products for Kertasari Sejahtera. Built with modern web technologies for a premium user experience.

## 🚀 Technologi Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Directory)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) / Shadcn-like architecture
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **PWA:** Next-PWA support

## ✨ Features

- **Modern Splash Screen**: Elegant, animated entrance using Framer Motion.
- **Responsive Design**: Mobile-first approach.
- **Dark/Light Mode**: (If applicable, based on codebase).
- **Smooth Animations**: Page transitions and interactive elements.

## 🛠️ Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```bash
src/
├── app/              # Next.js App Directory (Routes)
├── components/       # React Components
│   ├── atoms/        # Basic UI elements (Buttons, Inputs)
│   ├── molecules/    # Composite components
│   ├── organisms/    # Complex sections (Splash Screen, Headers)
│   └── templates/    # Page layouts
├── hooks/            # Custom React Hooks
├── shared/           # Shared utilities and styles
│   └── styles/       # Global CSS and Tailwind config
└── utils/            # Helper functions
```

## 📝 License

[MIT](LICENSE)
