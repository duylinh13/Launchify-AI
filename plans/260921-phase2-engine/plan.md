---
status: completed
title: Phase 2 - Website Builder Engine
date: 2026-09-21
---

# Phase 2: Website Builder Engine

## Overview
Build the foundational typing, validation, and rendering engine that will safely bridge the gap between AI JSON output and React DOM.

## Requirements
- Enforce strict typing for website sections using Discriminated Unions.
- Create Zod schemas to validate AI output at runtime.
- Build a dynamic `SectionRenderer` that loops through an array of objects and renders the correct component without `if/else` hell.

## Implementation Steps
1. Create `src/types/website.ts` and `src/lib/validations/section.ts`.
2. Define `HeroSectionSchema`, `AboutSectionSchema`, `FAQSectionSchema` using `z.object()`.
3. Combine them using `z.discriminatedUnion('type', [...])`.
4. Create dummy React components (`Hero`, `About`, `FAQ`).
5. Build `SectionRegistry` (an object mapping string keys to React components).
6. Build `SectionRenderer.tsx` that consumes `WebsiteSchema` and renders the components dynamically.
7. Create a Mock `/preview` page to verify the renderer works perfectly with valid JSON.

## Success Criteria
- [x] Zod validation enforces types correctly.
- [x] Dynamic Renderer maps `type: "hero"` to `<Hero />` without crashing.
- [x] TypeScript provides full autocompletion for `Section` discriminated unions.
