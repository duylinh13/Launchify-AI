---
status: completed
title: Phase 3B - Quality Assurance & Automated Testing
date: 2026-09-21
---

# Phase 3B: QA & Testing Framework

## Overview
Before moving forward with complex visual features (Phase 4), we must establish a rock-solid QA pipeline. Since the AI's output is unpredictable, testing the Zod Validation layer is the absolute highest priority.

## Requirements
- Install `vitest`, `jsdom`, and `@testing-library/react`.
- Configure `vitest.config.ts`.
- Write unit tests for `WebsiteSchema` (proving it correctly rejects bad structures and validates good ones).
- Write unit tests for `GenerateWebsiteParamsSchema` (proving the API endpoint is secure from malformed POST bodies).
- Document a high-level `docs/TESTING_STRATEGY.md`.

## Implementation Steps
1. Create `TESTING_STRATEGY.md` outlining the Test Pyramid.
2. Install test runner dependencies with `--legacy-peer-deps` due to `babel/core` conflicts in Next.js 14 ecosystem.
3. Write `src/lib/validations/section.test.ts`.
4. Write `src/lib/validations/generate.test.ts`.
5. Run the tests.
6. Commit & Push to GitHub.

## Success Criteria
- [x] Vitest framework is active.
- [x] Test suite executes without environment errors.
- [x] All 6 test cases for AI Validation schemas pass.
- [x] QA Pipeline is formally documented.
