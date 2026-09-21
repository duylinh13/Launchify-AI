# Launchify AI - Standard Operating Procedure (SOP)

To maintain the highest level of engineering rigor and to ensure the project remains portfolio-ready, every new feature or phase MUST follow this strict 5-step development workflow.

## The 5-Step Feature Pipeline

### Step 1: Pre-Analysis & Risk Assessment (`ck:predict`)
Before any code is written or architecture finalized, major features undergo a multi-persona debate.
- **Goal:** Identify architectural bottlenecks, React re-render traps, and security flaws.
- **Output:** A clear GO/CAUTION/STOP verdict with mitigations.

### Step 2: Formal Planning (`ck:plan` & `ck:project-organization`)
Once risks are mitigated, a formal plan is documented.
- **Goal:** Break the feature down into atomic, testable tasks.
- **Action:** Create a `<date>-<feature-name>/plan.md` inside the `plans/` directory.
- **Output:** A checklist of files to modify and Acceptance Criteria (DoD).

### Step 3: Implementation (`ck:cook` & `ck:react-best-practices`)
Code is written methodically following Next.js 14 App Router standards.
- **Rule 1:** Strict separation of Server Components (RSC) and Client Components (`'use client'`).
- **Rule 2:** Local state is preferred for high-frequency updates (e.g., debouncing) over global Contexts to avoid `ck:react-best-practices` violations.
- **Rule 3:** All external data (including LLM output) MUST be validated via Zod.

### Step 4: Adversarial Code Review (`ck:code-review` & `ck:scout`)
Before a feature is marked "Done", it must survive an adversarial review.
- **Action:** Run a lint check (`npm run lint`) and type check.
- **Action:** Scout for edge cases (e.g., Streaming JSON crashes, missing optional fields).
- **Goal:** Ensure no implicit `any`, no unescaped entities, and absolute Type Safety.

### Step 5: Git & Documentation Update
- **Action:** Stage and commit changes using Conventional Commits (`feat:`, `fix:`, `refactor:`).
- **Action:** Push to GitHub.
- **Action:** Update `README.md` or `ARCHITECTURE.md` if systemic changes were introduced.

---
*Note for AI Agents: Do not bypass this workflow. Quality and architecture explanation are the primary goals of this project.*
