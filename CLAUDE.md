# Launchify AI - Project Guidelines

## Project Overview
Launchify AI is a multi-tenant AI-powered Website & Landing Page Builder SaaS. Users can generate structured website JSON using Gemini API and visually edit the rendered React components.

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Database & Auth:** Supabase (PostgreSQL, RLS)
- **Validation:** Zod
- **AI Integration:** Vercel AI SDK + Google Gemini

## Architecture & Code Rules

### 1. Server vs Client Components
- **Default to Server Components (RSC):** All page layouts, data fetching, and static UI must be Server Components.
- **Client Components (`'use client'`):** Use strictly for interactive elements (forms, editors, buttons with state). Keep them as low in the component tree as possible to minimize JS bundle size.
- **Data Fetching:** Fetch data server-side using Supabase server client. Avoid `useEffect` for data fetching.

### 2. State Management & Re-renders (Critical for Visual Editor)
- **Do not put massive objects in root React Contexts** if they update frequently.
- For text inputs that update global state, **always use local state + debouncing** before syncing to the global Context to prevent cascading re-renders across the visual editor.
- Use `useFormState` and `useFormStatus` for form submissions via Server Actions.

### 3. AI & Data Validation
- The LLM **does not** generate HTML/React code. It generates structured JSON.
- **Strict Validation:** Every AI generation and every user Save action MUST pass through `WebsiteSchema` (Zod) before being processed or saved to the database.
- Handle API rate limits, timeouts, and Zod parsing errors gracefully using Next.js Error Boundaries and Toast notifications.

### 4. Database & Security
- **Multi-tenancy:** Enforced via `workspace_members`. Every table (except `users`, `profiles`) relies on a workspace-level or project-level relationship.
- **Row Level Security (RLS):** Do not bypass RLS. Always pass the authenticated user's session from the server client.
- **Secrets:** Never expose `GEMINI_API_KEY` or `SUPABASE_SERVICE_ROLE_KEY` to the client. Keep them in Server Actions or Route Handlers.

### 5. Git & Commit Convention
- Follow conventional commits: `feat:`, `fix:`, `perf:`, `refactor:`, `docs:`, `chore:`.
- Ensure tests and linting pass before committing.

## Commands
- **Dev:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`

## Component Structure
- `src/app`: App Router pages and API routes.
- `src/components/ui`: shadcn/ui base components.
- `src/components/website`: Domain-specific components (SectionRenderer, GenerateForm).
- `src/components/website/sections`: Individual dynamic sections (Hero, About, FAQ).
- `src/lib/supabase`: Supabase clients and middleware.
- `src/lib/validations`: Zod schemas.
