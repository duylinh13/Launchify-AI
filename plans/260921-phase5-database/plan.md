---
status: planning
title: Phase 5 - Database Integration (Save & Load)
date: 2026-09-21
---

# Phase 5: Database Integration

## 1. Pre-Analysis & Risk Assessment (ck:predict)
Before implementing database logic, we conducted a multi-persona risk assessment:
- **Security (Devil's Advocate):** If we allow client-side saving, malicious users might inject XSS into the JSON payload. 
  - *Mitigation:* Before updating Supabase, the Server Action MUST re-validate the incoming payload using `WebsiteSchema.safeParse()`.
- **Performance (Architect):** Saving on every keystroke in the Editor will hammer the Supabase DB and hit rate limits.
  - *Mitigation:* The "Save" action must be explicit (a Save Button) or debounced heavily (e.g., auto-save every 10 seconds if dirty). We will implement a manual "Save" button first to guarantee data integrity.
- **UX (Designer):** The user needs to know if their changes are saved or pending.
  - *Mitigation:* The "Save" button must show a spinner (`isPending`) and trigger a Toast notification upon success or failure.

## 2. Requirements & Tasks
Connect the AI output and the Visual Editor to the PostgreSQL database (Supabase) using our Multi-tenant architecture.

### Task 5.1: The Generate Flow (Save to DB)
- **Goal:** After the AI finishes streaming the website in `GenerateForm`, provide a way to save it as a new Project in the database.
- **Implementation:** Create a Server Action `createProject(workspaceId, contentJson)`.

### Task 5.2: The Editor Fetch Flow (Load from DB)
- **Goal:** Replace `MOCK_INITIAL_DATA` in `src/app/(dashboard)/project/[id]/editor/page.tsx`.
- **Implementation:** Use Supabase SSR client to fetch `SELECT * FROM projects WHERE id = [id]`.
- **Security:** RLS will automatically reject the query if the user doesn't have access to the project's workspace.

### Task 5.3: The Editor Save Flow (Update DB)
- **Goal:** Allow the user to save changes made in the Zustand store back to the database.
- **Implementation:** 
  1. Add a "Save" button in the Editor header.
  2. Create a Server Action `updateProjectContent(projectId, contentJson)`.
  3. Validate `contentJson` via `WebsiteSchema` before executing the SQL update.

## 3. Success Criteria (DoD)
- [ ] User can generate a website and save it to their Workspace.
- [ ] User can navigate to `/project/[id]/editor` and see their saved website, not mock data.
- [ ] User can edit text or drag-and-drop sections, click "Save", and refresh the page to see changes persisted.
- [ ] Attempting to save invalid JSON throws an error and does not corrupt the DB.
