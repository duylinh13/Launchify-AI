---
status: completed
title: Phase 3 - AI Integration & Streaming
date: 2026-09-21
---

# Phase 3: AI Integration & Streaming

## Overview
Connect the Gemini AI API to generate the structured JSON payload, stream it to the client, and render it in real-time.

## Requirements
- Integrate `@ai-sdk/google` and `ai` (Vercel AI SDK).
- Write a prompt that forces the LLM to adhere to the Zod `WebsiteSchema`.
- Build a Route Handler `/api/generate` to stream the response.
- Build a UI Form to collect business details and trigger the generation.
- Ensure the React components don't crash when receiving partial/incomplete JSON chunks during the stream.

## Implementation Steps
1. Create `src/lib/validations/generate.ts` to strictly validate user input before sending to the LLM (preventing prompt injection/empty payloads).
2. Create `src/lib/ai/generate.ts` containing the core prompt engineering.
3. Build `src/app/api/generate/route.ts` using `streamObject()`.
4. Create `GenerateForm.tsx` using `useObject()` from `ai/react` to consume the stream.
5. **CRITICAL FIX:** Refactor `SectionRenderer` and all section components to accept `DeepPartial<Section>` and use optional chaining (`?.`), because streaming JSON is incomplete until finished.

## Success Criteria
- [x] User can submit the form.
- [x] API validates the payload with Zod.
- [x] LLM streams JSON matching `WebsiteSchema`.
- [x] UI updates in real-time smoothly without throwing `undefined` React crashes.
