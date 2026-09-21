# Quality Assurance & Testing Strategy
**Project:** Launchify AI

## 1. Testing Philosophy
In an AI-driven application, testing the exact UI pixel-by-pixel is difficult due to the dynamic nature of generated content. Therefore, our testing pyramid focuses on:
1. **Core Business Logic (Unit Tests):** Strict validation of AI Input/Output schemas (Zod).
2. **Component Rendering (Integration Tests):** Ensuring the Dynamic Renderer does not crash when given partial or valid JSON.
3. **Critical User Flows (E2E Tests):** Authentication, Project Creation, and Saving flows.

## 2. Frameworks
- **Unit & Integration:** Vitest + React Testing Library (Fast, native ESM support).
- **End-to-End (Future Scope):** Playwright.

## 3. Core Test Cases (Phase 1-3)

### Phase 1: Authentication & Database
- `TC-01`: Unauthenticated users attempting to access `/dashboard` must be redirected to `/login`.
- `TC-02`: Supabase `login` Server Action must return an error if credentials are invalid.
- `TC-03`: `signup` Server Action must successfully create a user and redirect to `/dashboard`.

### Phase 2: Engine & Zod Validation (UNIT TESTS INCLUDED)
- `TC-04`: `WebsiteSchema` MUST reject payload missing a `site.name`.
- `TC-05`: `WebsiteSchema` MUST successfully parse a valid payload with multiple `sections`.
- `TC-06`: `SectionSchema` MUST correctly discriminate types (e.g., `"hero"` vs `"faq"`) and enforce respective content structures.
- `TC-07`: `SectionRenderer` MUST safely ignore/skip invalid or missing section types without throwing a React crash.

### Phase 3: AI Payload Security
- `TC-08`: `GenerateWebsiteParamsSchema` MUST reject POST payloads missing critical business contexts (Business Name, Target Audience).
- `TC-09`: `GenerateWebsiteParamsSchema` MUST strictly enforce Hex Color regex for `primaryColor` to prevent CSS injection.

## 4. Phase 4: Visual Editor (Planned Test Cases)
- `TC-10`: Typing in `<DebouncedInput>` must NOT trigger an immediate Context state update (debounce timer = 300ms).
- `TC-11`: Dragging a section to a new index must correctly mutate the `sections` array order.
- `TC-12`: Clicking "Save" must run `WebsiteSchema.parse()` before calling the Supabase update action.
