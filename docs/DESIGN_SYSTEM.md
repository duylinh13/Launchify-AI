# UI/UX & Design System Guidelines
**Project:** Launchify AI

## 1. Core Philosophy
The UI must feel like a modern, premium SaaS application. 
- **Minimalist & Functional:** Content is the priority. Eliminate unnecessary borders, excessive shadows, and clutter.
- **Accessible (a11y):** Radix UI (via shadcn/ui) ensures keyboard navigation and screen reader support.
- **Responsive:** Mobile-first for the generated websites, Desktop-first for the SaaS Dashboard/Editor.

## 2. Tech Stack & Theming
- **CSS Framework:** Tailwind CSS
- **Component Library:** shadcn/ui
- **Icons:** Lucide React
- **Typography:** Geist Sans (Inter-alternative) & Geist Mono

## 3. The 4 Golden UI States
Every data-fetching component or user-flow MUST handle the following 4 states. Do not leave the user guessing.

### A. Loading State
- Use **Skeletons** (`<Skeleton />` from shadcn) for initial data fetching (e.g., loading the Dashboard projects).
- Use **Spinners/Pulsing** for micro-interactions (e.g., clicking the "Generate" button).

### B. Empty State
- Never show a blank screen if an array is empty (e.g., 0 projects).
- Always show a friendly graphic/icon, a description ("You haven't created any websites yet"), and a clear **Call to Action (CTA)** ("Create your first project").

### C. Error State
- **Critical Errors (API down):** Full-page or component-level Error Boundary with a "Try Again" button.
- **Form/Input Errors:** Inline red text below the input field (handled via Zod + React Hook Form).
- **Toast Notifications:** For non-blocking errors (e.g., "Failed to save layout"), use `toast.error()`.

### D. Success State
- Provide immediate visual feedback.
- Use `toast.success()` for background actions (e.g., "Website saved successfully").

## 4. Visual Editor Layout (Phase 4)
The Editor is a split-pane interface:
- **Left Sidebar (300px):** Fixed width, scrollable. Contains configuration panels, section reordering (Drag & Drop), and text inputs.
- **Right Preview (Flex-1):** Takes up the remaining space. Wraps the generated React components in a centered canvas (simulating a browser window).

## 5. Animation Guidelines
- Keep animations purposeful.
- Use Tailwind's `animate-in`, `fade-in`, `slide-in-from-bottom` for modals and dropdowns.
- Do not overuse heavy framer-motion animations unless necessary for Drag & Drop (`@dnd-kit`).
