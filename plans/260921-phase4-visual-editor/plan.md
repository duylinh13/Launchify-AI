# Phase 4: Visual Website Editor - Implementation Plan

## 1. Context & Objective
The Visual Editor is the most critical feature of Launchify AI. It allows users to modify the AI-generated website layout, edit text, reorder sections, and save the final result.

**Goal:** Build a performant, split-pane visual editor (Sidebar + Preview) that allows real-time edits without lagging the browser.

## 2. Pre-Analysis (ck:predict)

### Personas Debate
- **Architect**: If we put the entire `sections` array in a single React Context at the root, every single keystroke in a sidebar input will re-render the entire preview pane and all components. This violates `ck:react-best-practices`.
- **Performance**: We must debounce text inputs. When a user types, it should update local component state immediately, and only sync to the global context after a 300ms pause or on blur.
- **UX**: Drag and Drop (dnd) for reordering sections must have visual indicators. We should use `@dnd-kit/core` for accessibility and smooth animations.
- **Security**: The AI generates JSON, but the user is now editing it. Before saving to Supabase, we MUST re-validate the final JSON against our `SectionSchema` using Zod to prevent malicious data injection.

### Resolutions & Architecture
1. **State Management**: We will use a dedicated `EditorContext` but specifically separate `useEditorActions()` from `useEditorState()` to minimize re-renders. 
2. **Debounced Inputs**: All text fields in the sidebar will be wrapped in a `<DebouncedInput>` component.
3. **Zod Validation on Save**: The Save action will run `WebsiteSchema.parse()` before hitting the database.

## 3. Detailed Task Breakdown

### Task 4.1: Editor Layout & State Management
- **Files**: `src/app/(dashboard)/project/[id]/editor/page.tsx`, `src/components/editor/EditorProvider.tsx`
- **Implementation**: 
  - Create the `EditorProvider` wrapping the page.
  - State: `sections: Section[]`, `activeSectionIndex: number | null`.
  - Actions: `updateSection`, `reorderSections`, `setActiveSection`.
- **Review**: Ensure state separation. 

### Task 4.2: Sidebar Controls & Debounced Inputs
- **Files**: `src/components/editor/Sidebar.tsx`, `src/components/ui/debounced-input.tsx`
- **Implementation**: 
  - Render a list of accordion items for each section.
  - Inside each accordion, dynamically render input fields based on `section.type`.
  - Use `DebouncedInput` (local `useState` tracking `onChange`, syncing to Context via `useEffect` with a timer).

### Task 4.3: Drag and Drop Reordering
- **Files**: `src/components/editor/SortableSectionList.tsx`
- **Implementation**:
  - Install `@dnd-kit/core`, `@dnd-kit/sortable`.
  - Implement a drag overlay and strict sortable context.

### Task 4.4: Save & Publish Pipeline
- **Files**: `src/app/actions/project.ts`
- **Implementation**:
  - Server Action `saveProject(projectId, data)`.
  - Validate `data` with `WebsiteSchema.safeParse`.
  - If valid, `UPDATE projects SET content_json = ...`.

## 4. Acceptance Criteria (DoD)
- User can select a section in the sidebar.
- User can edit text; the preview updates instantly but without lag.
- User can drag to reorder sections.
- Saving correctly updates the Supabase DB and respects RLS.
