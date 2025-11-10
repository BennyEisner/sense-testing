# AI E2E Testing Lab

This repository is an experimental environment for comparing **Cypress** and **Playwright** frameworks and testing how **AI can assist in automated test generation**.  
The setup allows us to evaluate AI-generated tests against human-written ones for reliability, maintainability, and accuracy.

---

## Project Overview

We will aim to:

1. Compare Cypress vs. Playwright for automated UI testing.
2. Explore how AI models can generate or refactor tests from plain-English descriptions.
3. Measure test quality and selector stability using a simple web app sandbox.

---

## Directory Structure

ai-e2e-lab/
│
├── app/ # Simple React/Vite web app (sandbox under test)
│
├── configs/ # Framework configuration files
│ ├── cypress.config.ts
│ └── playwright.config.ts
│
├── tests/ # All test suites
│ ├── cypress/
│ │ ├── human/ # Handwritten Cypress tests (baseline)
│ │ └── ai/ # AI-generated Cypress tests
│ └── playwright/
│ ├── human/ # Handwritten Playwright tests
│ └── ai/ # AI-generated Playwright tests
│
├── prompts/ # AI prompt templates for generating or fixing tests
│
├── evaluation/ # Scripts and data for running test comparisons
│ ├── scripts/ # Automation (run matrix, result collection)
│ └── runs/ # Output logs and JSON summaries
│
├── .nvmrc # Node version (20.x)
├── package.json # Scripts and dependencies
├── tsconfig.json # TypeScript configuration
└── README.md

---

## Current Progress

**Completed**

- Repository structure
- Node/TypeScript environment
- Installed Cypress, Playwright, and supporting packages
- Created `configs/` and test directories
- Added scripts to run Cypress and Playwright with the dev server

  **To Do Next**

1. **Add the minimal sandbox app** inside `/app` (React/Vite sample provided in setup guide).
2. **Write baseline human tests** in both `/tests/cypress/human` and `/tests/playwright/human`.
3. **Create AI-generated tests** using the templates in `/prompts`.
4. **Run evaluation** using scripts in `/evaluation/scripts`.
5. **Document results** in `/evaluation/runs/summary.json`.

---

## How It All Works Together

1. The **sandbox app** (`/app`) provides a small, stable web application to test against (login, catalog, checkout, etc.).
2. **Cypress** and **Playwright** are configured independently in `/configs` but share the same app and test IDs.
3. **Human tests** define the baseline behavior for comparison.
4. **AI-generated tests** (in `/tests/.../ai/`) are created from prompt templates in `/prompts/`.
5. **Evaluation scripts** automatically run both human and AI tests and log performance, reliability, and pass rates.
6. The resulting data helps assess how effective AI is at writing usable E2E tests.

---

## Running the Project

Once the sandbox app is added:

```bash
# Install dependencies
npm install

# Start the sandbox app
npm run dev

# Run Cypress tests
npm run test:cypress:with-app

# Run Playwright tests
npm run test:pw:with-app

# Run evaluation matrix (automated runs)
npm run eval:matrix
```
