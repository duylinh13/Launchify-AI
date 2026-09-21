# ?? Launchify AI

> An AI-powered Website & Landing Page Builder generating structured, editable React components in real-time.

![Launchify AI Cover](public/cover.png)
*Live Demo: [https://launchify-ai-demo.vercel.app](https://launchify-ai-demo.vercel.app)*

Launchify AI allows users to generate, edit, and publish professional business websites in seconds without writing code. 

Built with a strict focus on **Frontend Engineering Excellence**, it demonstrates modern React patterns (composition, memoization, lifecycle), Next.js App Router optimization, strictly typed AI structured outputs, and a custom interactive visual editor.

## ? Key Features

- **Generative UI Architecture**: AI doesn't return raw HTML. It returns structured JSON validated by Zod, which is mapped to strongly-typed, reusable React components (Hero, About, FAQ).
- **Real-time Streaming**: Uses @ai-sdk/react to stream AI object generation chunk-by-chunk for an instant, engaging user experience.
- **Visual Editor (Zustand + dnd-kit)**: High-performance visual editor allowing users to drag-and-drop sections and edit copy. Uses Zustand to avoid unnecessary React Context re-renders on the canvas.
- **Strict Design System**: Built on a semantic token architecture (Tailwind CSS variables). Features a internal live documentation route (/design-system) for typography and component variants.
- **Authentication & RBAC**: Fully integrated with Supabase Auth, with server-side protected routes and Row Level Security (RLS) in PostgreSQL.

## ??? Architecture & AI Flow

### The AI Generation Flow
1. **Input**: User fills out the GenerateForm with business requirements.
2. **Streaming & Validation**: Request is sent to a Next.js Edge API Route. Vercel AI SDK streams back a structured JSON object.
3. **Type-Safety (Zod)**: The stream is strictly constrained by a Zod schema (WebsiteSchema), guaranteeing the AI returns exact keys (e.g., primaryColor, sections).
4. **Dynamic Rendering**: The frontend consumes the stream and dynamically renders React components (SectionRenderer) on-the-fly as the AI "types" the JSON.

### Tech Stack
- **Core:** Next.js 14 (App Router, Server & Client Components)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS, shadcn/ui, Custom Design System
- **State Management:** Zustand, React Server Actions
- **AI Integration:** Google Gemini 1.5 Pro via Vercel AI SDK
- **Backend/Database:** Supabase (PostgreSQL, Auth, RLS)

## ?? Local Setup

1. Clone the repository:
   \\\ash
   git clone https://github.com/yourusername/launchify-ai.git
   cd launchify-ai
   \\\

2. Install dependencies:
   \\\ash
   npm install --legacy-peer-deps
   \\\

3. Set up environment variables:
   Copy \.env.example\ to \.env.local\ and fill in your Supabase and Gemini keys.
   \\\ash
   cp .env.example .env.local
   \\\

4. Run the development server:
   \\\ash
   npm run dev
   \\\

## ?? Security
- **No API keys in frontend:** All AI calls are proxied through Next.js Route Handlers.
- **Database Protection:** Supabase Row Level Security ensures users can only read/write their own projects.

---
*Developed as a portfolio project showcasing Fullstack capabilities with an emphasis on advanced React & Next.js architecture.*
