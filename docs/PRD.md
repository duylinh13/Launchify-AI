# Product Requirements Document (PRD)
**Project Name:** Launchify AI
**Version:** 1.0.0
**Date:** September 2026

## 1. Product Vision
To provide a seamless, AI-powered website builder that allows non-technical users to generate, preview, and edit high-converting landing pages strictly tailored to their business goals.

## 2. Target Audience
- Solopreneurs and small business owners needing a quick online presence.
- Marketers needing to spin up landing pages for campaigns quickly.
- Designers looking for rapid layout bootstrapping.

## 3. Core Value Propositions
- **Speed:** From a single text prompt to a fully laid out website in under 60 seconds.
- **Safety:** Unlike generic AI chatbots, the AI cannot break the UI. Content is heavily structured and validated.
- **Editability:** The user retains full control to modify the generated content via a No-Code Visual Editor.

## 4. User Flows
### 4.1 Onboarding & Workspace
1. User signs up via Email/Password (Supabase Auth).
2. User is assigned a default Workspace.
3. User navigates to the Dashboard.

### 4.2 Website Generation
1. User clicks "Create Project".
2. User fills out the Business context form (Name, Target Audience, Tone, Color).
3. System calls Gemini API (streaming JSON).
4. System validates streamed chunks and renders the UI in real-time.

### 4.3 Visual Editor
1. Generated layout is presented in a split-pane editor.
2. User selects a section in the left sidebar (e.g., "Hero Section").
3. User edits the "Headline".
4. Changes reflect instantly on the right Preview pane (debounced state).
5. User drags and drops sections to reorder them.
6. User clicks "Save".

## 5. Non-Functional Requirements
- **Performance:** Editing text in the sidebar must not cause recursive re-renders of the entire page layout. (Target: < 16ms render cycle for inputs).
- **Security:** Complete data isolation between workspaces using PostgreSQL Row Level Security (RLS).
- **Reliability:** The AI integration must handle partial timeouts and parse errors gracefully without crashing the React tree.
