# 🚀 Launchify AI

<div align="center">
  <h3>AI-powered Website & Landing Page Builder SaaS</h3>
  <p>A flagship Next.js application demonstrating advanced AI integrations, strict schema validation, and multi-tenant SaaS architecture.</p>
</div>

---

## 📖 Overview

**Launchify AI** is a professional-grade SaaS platform that allows users to generate fully functional, responsive websites from natural language descriptions. 

Unlike basic AI chatbots that generate raw, unmaintainable HTML, Launchify AI uses a **Structured Output Pipeline**. It leverages the Gemini API to generate strictly typed JSON configurations validated by **Zod**, which are then mapped to scalable, reusable React components via a Dynamic Renderer.

## ✨ Core Features

- 🤖 **AI-Driven Generation:** Describe your business, target audience, and goals, and watch the AI build a tailored website structure.
- ⚡ **Live Streaming Preview:** Watch your landing page render section-by-section in real-time using Vercel AI SDK.
- 🛡️ **Bulletproof Architecture:** The LLM cannot break the UI. All AI outputs are intercepted, validated, and normalized using strict Zod discriminated unions before rendering.
- 🏢 **Multi-tenant SaaS:** Complete Workspace and Project data isolation using Supabase Auth and PostgreSQL Row Level Security (RLS).
- 🎨 **Visual Editor (WIP):** A real-time split-pane editor to modify copy, reorder sections (drag-and-drop), and customize generated results without touching code.

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Actions)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL)
- **AI Provider:** Google Gemini API (via `@ai-sdk/google`)
- **Validation:** [Zod](https://zod.dev/)

## 🧠 Architectural Highlights (For Tech Interviews)

1. **AI ↔ UI Separation:** LLMs are restricted to returning JSON adhering to `WebsiteSchema`. The `SectionRenderer` dynamically mounts components (`Hero`, `About`, `FAQ`) based on the `type` field, ensuring 100% type safety and consistent design systems.
2. **Optimized React Rendering:** To prevent the visual editor from crashing or lagging during text input, the app utilizes localized state debouncing before syncing to the global Context, avoiding expensive recursive re-renders.
3. **Robust Streaming:** Handles partial JSON chunks gracefully during AI streaming to ensure a smooth, crash-free loading UX.
4. **Security:** Enforces strict Row Level Security (RLS) on PostgreSQL. Users can only fetch and edit projects belonging to their authorized workspaces.

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/duylinh13/Launchify-AI.git
cd Launchify-AI
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file based on `.env.example`:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Gemini AI Configuration
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📄 License
MIT License
