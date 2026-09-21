<div align="center">
  <img src="public/cover.png" alt="Launchify AI Banner" width="100%" />

  # ?? Launchify AI

  **An AI-powered Website & Landing Page Builder generating structured, editable React components in real-time.**

  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-Auth_%7C_DB-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
  [![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI_SDK-Gemini_1.5_Pro-black?style=flat-square&logo=vercel)](https://sdk.vercel.ai/)
</div>

---

## ?? Overview

**Launchify AI** is not just another wrapper around ChatGPT. It is a portfolio-grade, full-stack application designed to showcase **Frontend Engineering Excellence**. 

Instead of generating raw, unpredictable HTML, Launchify AI uses a strict **Generative UI pipeline**. The AI evaluates user requirements and streams a rigorously typed JSON configuration (validated via Zod), which is mapped dynamically to highly polished, reusable React components. 

Users can then visually edit, reorder, and save their generated websites using a high-performance drag-and-drop editor.

---

## ?? The "Anti-Slop" Design Philosophy

Built with a deep appreciation for premium aesthetics, Launchify AI strictly avoids generic "AI slop" designs:
- **Semantic Token Architecture**: Colors and spacing are strictly tokenized using HSL CSS variables and Tailwind.
- **Living Design System**: Includes a dedicated \/design-system\ route serving as the source of truth for typography hierarchy, component states, and motion primitives.
- **VIP Pro UI**: Incorporates glassmorphism, subtle glowing gradients, smooth micro-interactions, and meticulously balanced whitespace.

---

## ??? Core Features & Architecture

### 1. ?? Generative UI & Streaming
- **Vercel AI SDK (useObject)**: Streams chunked JSON responses from Google Gemini 1.5 Pro.
- **Zod Validation**: Enforces strict schema constraints (WebsiteSchema) to ensure the AI never breaks the UI.
- **Dynamic Component Mapping**: The SectionRenderer acts as a polymorphic engine, matching AI data layers to physical React UI components (Hero, About, FAQ).

### 2. ? High-Performance Visual Editor
- **Zustand State Management**: Chosen specifically over React Context to prevent cascading re-renders across the entire canvas when editing deep UI layers.
- **dnd-kit Integration**: Accessible, smooth drag-and-drop functionality to reorder page sections.
- **Debounced Inputs**: Live text editing is locally debounced before committing to the global store to guarantee 60fps typing performance.

### 3. ?? Authentication & Multi-Tenancy
- **Supabase Auth**: Secure email/password login integrated seamlessly with Next.js App Router.
- **Row Level Security (RLS)**: PostgreSQL policies guarantee strict workspace isolation. Users can only query, mutate, or delete their own website configurations.

---

## ?? Project Structure

\\\	ext
launchify-ai/
+-- src/
¦   +-- app/                    # Next.js App Router
¦   ¦   +-- (auth)/             # Login & Signup routes
¦   ¦   +-- (dashboard)/        # Protected dashboard, generator, and editor routes
¦   ¦   +-- api/                # Edge API routes (AI Generation)
¦   ¦   +-- actions/            # React Server Actions (DB Mutations)
¦   ¦   +-- design-system/      # Living design guidelines
¦   +-- components/             
¦   ¦   +-- auth/               # Auth UI forms
¦   ¦   +-- editor/             # Zustand-powered interactive editor
¦   ¦   +-- ui/                 # shadcn/ui base components
¦   ¦   +-- website/            # Dynamic Generative UI components
¦   +-- lib/
¦   ¦   +-- supabase/           # SSR and Client DB clients
¦   ¦   +-- store/              # Zustand global state management
¦   ¦   +-- validations/        # Zod schemas (WebsiteSchema)
¦   +-- globals.css             # HSL Semantic Token Definitions
+-- supabase/
¦   +-- migrations/             # SQL schemas, RLS policies, Auth triggers
+-- tailwind.config.ts          # Tailwind configurations & animations
\\\

---

## ?? Getting Started

### Prerequisites
- Node.js 18.x or later
- A Supabase Project
- A Google Gemini API Key

### 1. Installation
Clone the repository and install dependencies using --legacy-peer-deps (required for specific React 18 / shadcn compatibility):

\\\ash
git clone https://github.com/yourusername/launchify-ai.git
cd launchify-ai
npm install --legacy-peer-deps
\\\

### 2. Environment Variables
Copy the example environment file:
\\\ash
cp .env.example .env.local
\\\
Fill in your credentials in \.env.local\:
\\\env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
\\\

### 3. Database Setup
Execute the SQL migrations found in \supabase/migrations/\ in your Supabase SQL Editor to create the \projects\ table, set up RLS policies, and configure the new user trigger.

### 4. Run Locally
Start the development server:
\\\ash
npm run dev
\\\
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ????? Author & Interview Context

**Launchify AI** was built to demonstrate proficiency in:
- React Rendering Lifecycle & Reconciliation.
- State Management architectural decisions (Zustand vs. Context).
- Safe integration of Large Language Models into production user interfaces.
- Modern Next.js patterns (Server Components vs. Client Components, Server Actions).

*Ready for technical deep-dives.*
