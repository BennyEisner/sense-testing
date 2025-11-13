# AI E2E Testing Lab - Complete Team Onboarding Guide

## Table of Contents

1. [Project Overview](#project-overview)
2. [What Problem Does This Solve](#what-problem-does-this-solve)
3. [Architecture & Components](#architecture--components)
4. [Technology Stack Explained](#technology-stack-explained)
5. [The Sandbox Application](#the-sandbox-application)
6. [Testing Frameworks](#testing-frameworks)
7. [Test Organization](#test-organization)
8. [Configuration Files](#configuration-files)
9. [Running the Project](#running-the-project)
10. [Evaluation System](#evaluation-system)
11. [How to Contribute](#how-to-contribute)
12. [Appendix: Key Concepts](#appendix-key-concepts)

---

## Project Overview

### What Is This Project?

This is an **experimental testing laboratory** designed to:

1. **Compare two popular E2E testing frameworks**: Cypress vs Playwright
2. **Evaluate AI-generated tests**: See how AI (like ChatGPT, Claude, etc.) performs at writing automated tests
3. **Establish quality baselines**: Use human-written tests as the gold standard for comparison

## What Problem Does This Solve?

### The Challenge

Modern software teams face critical decisions:

1. **Which testing framework should we use?** (Cypress vs Playwright vs others)
2. **Can AI help us write tests faster?** (Without sacrificing quality)
3. **How do we measure test quality?** (Beyond "does it pass?")

### Our Approach

We created a **controlled sandbox environment** where:

- The same application is tested by both frameworks
- Human-written tests serve as the baseline
- AI-generated tests are compared against human tests
- Automated scripts measure success rates, flakiness, and reliability

---

## Architecture & Components

### High-Level Structure

```
sense-testing/
│
├── app/                    # The web application being tested (React + Vite)
├── configs/                # Configuration for Cypress & Playwright
├── tests/                  # All test suites organized by framework and author
│   ├── cypress/
│   │   ├── human/         # Human-written Cypress tests (baseline)
│   │   └── ai/            # AI-generated Cypress tests (empty for now)
│   └── playwright/
│       ├── human/         # Human-written Playwright tests (baseline)
│       └── ai/            # AI-generated Playwright tests (empty for now)
├── prompts/                # Templates for AI test generation (empty - future use)
├── evaluation/             # Scripts and metrics for automated comparison
│   ├── scripts/           # Automation scripts (run-matrix.ts)
│   ├── runs/              # Test execution results (generated)
│   └── metrics.md         # Definition of quality metrics
└── package.json           # Project dependencies and scripts
```

### Component Interaction Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     Developer Workflow                       │
└─────────────────────────────────────────────────────────────┘
                              ↓
        ┌─────────────────────────────────────────┐
        │  1. Start Sandbox App (npm run dev)     │
        │     → React app runs on localhost:4173  │
        └─────────────────────────────────────────┘
                              ↓
        ┌─────────────────────────────────────────┐
        │  2. Run Tests Against App               │
        │     → Cypress: npm run test:cypress     │
        │     → Playwright: npm run test:pw       │
        └─────────────────────────────────────────┘
                              ↓
        ┌─────────────────────────────────────────┐
        │  3. Evaluation Matrix (npm run eval)    │
        │     → Runs all test suites multiple     │
        │       times and collects metrics        │
        └─────────────────────────────────────────┘
                              ↓
        ┌─────────────────────────────────────────┐
        │  4. Review Results                      │
        │     → evaluation/runs/summary.json      │
        └─────────────────────────────────────────┘
```

---

## Tech Stack

### Core Technologies (No Prior Knowledge Needed)

#### 1. **Node.js** (Runtime Environment)

- **What**: JavaScript runtime that lets you run JavaScript outside a web browser
- **Why**: Powers all our development tools and testing frameworks
- **Version**: 20.19.0 (specified in `.nvmrc`)

#### 2. **TypeScript** (.ts files)

- **What**: JavaScript with type safety (catches errors before runtime)

#### 3. **npm** (Package Manager)

- **What**: Tool for installing and managing JavaScript libraries
- **Why**: Downloads Cypress, Playwright, React, and other dependencies
- **Usage**: `npm install`, `npm run dev`, etc.

---

### Frontend Application Stack

#### 1. **React** (UI Library)

- **What**: JavaScript library for building user interfaces
- **Purpose**: Powers our sandbox app
- **Key Concepts**:
  - **Components**: Reusable UI pieces (like Login, Catalog, Checkout)
  - **State**: Data that changes over time (like shopping cart contents)
  - **Props**: Data passed between components

#### 2. **Vite** (Build Tool)

- **What**: Fast development server and build tool
- **Why**: Provides instant hot-reload during development
- **Commands**:
  - `npm run dev` → Start development server
  - `npm run build` → Create production build
  - `npm run preview` → Preview production build

#### 3. **JSX/TSX** (Syntax)

- **What**: HTML-like syntax inside JavaScript/TypeScript
- **Example**:
  ```tsx
  <button onClick={handleClick}>Click Me</button>
  ```

---

### Testing Framework Stack

#### 1. **Cypress** (E2E Testing Framework)

**What It Is**:

- End-to-End (E2E) testing framework built specifically for web applications
- Runs tests in a real browser and simulates user interactions

**Example Test**:

```typescript
cy.visit("/");
cy.get("[data-testid=login-email]").type("test@example.com");
cy.get("[data-testid=login-submit]").click();
cy.get("[data-testid=page-catalog]").should("exist");
```

#### 2. **Playwright** (E2E Testing Framework)

**What It Is**:

- Modern E2E testing framework by Microsoft
- Can test across multiple browsers (Chrome, Firefox, Safari)

**Example Test**:

```typescript
await page.goto("/");
await page.getByTestId("login-email").fill("test@example.com");
await page.getByTestId("login-submit").click();
await expect(page.getByTestId("page-catalog")).toBeVisible();
```

#### 3. **start-server-and-test** (Utility)

- **What**: Starts the app, waits for it to be ready, then runs tests
- **Why**: Ensures tests don't run before the app is available
- **Usage**: `start-server-and-test dev http://127.0.0.1:4173 cypress:run`

---

## The Sandbox Application

A **simple e-commerce demo app** with four main pages:

1. **Login**: User authentication
2. **Catalog**: Product listing
3. **Checkout**: Shopping cart and purchase
4. **Profile**: User settings

### Technical Implementation

**File**: `app/src/App.tsx`

**Architecture**:

- Single-page application (SPA) using React
- Client-side routing (no backend server)
- In-memory state management (resets on page refresh)

### Application Features

#### 1. **Login Page**

```typescript
// Hard-coded credentials for testing
email: "test@example.com";
password: "Password123";
```

**Test Elements**:

- `data-testid="login-email"` → Email input field
- `data-testid="login-password"` → Password input field
- `data-testid="login-submit"` → Login button
- `data-testid="banner-message"` → Success/error message

**User Flows**:

- ✅ Valid login → Redirects to catalog
- ❌ Invalid login → Shows "Invalid credentials" error

#### 2. **Catalog Page**

```typescript
// Available products
products = [
  { id: 1, name: "Widget Alpha", price: 10 },
  { id: 2, name: "Widget Beta", price: 20 },
  { id: 3, name: "Widget Gamma", price: 30 },
];
```

**Test Elements**:

- `data-testid="page-catalog"` → Catalog container
- `data-testid="product-{id}-name"` → Product name
- `data-testid="product-{id}-price"` → Product price
- `data-testid="product-{id}-add"` → Add to cart button

**User Flow**:

- Click "Add to Cart" → Product added to cart (state)

#### 3. **Checkout Page**

**Test Elements**:

- `data-testid="page-checkout"` → Checkout container
- `data-testid="cart-count"` → Number of items in cart
- `data-testid="checkout-submit"` → Confirm purchase button

**User Flow**:

- View cart contents → Confirm checkout → Cart empties

#### 4. **Profile Page**

**Test Elements**:

- `data-testid="page-profile"` → Profile container
- `data-testid="profile-name"` → Name input field
- `data-testid="profile-save"` → Save button

**User Flow**:

- Edit name → Click save → Shows "Profile updated"

### Why This Design?

1. **Test-Friendly**:

   - All interactive elements have `data-testid` attributes
   - Predictable behavior (no random data)
   - No external dependencies (no API calls)

2. **Representative**:

   - Covers common web patterns (forms, navigation, state)
   - Realistic user workflows
   - Multiple interaction types

3. **Stable**:
   - No flaky network requests
   - Deterministic behavior
   - Fast execution

---

## Testing Frameworks

### Cypress Deep Dive

#### Installation & Setup

**Files**:

- `configs/cypress.config.ts` → Configuration
- `tests/cypress/human/smoke.cy.ts` → Test suite

#### Configuration Explained

```typescript
// configs/cypress.config.ts
export default defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:4173", // App URL
    specPattern: "tests/cypress/**/*.cy.ts", // Where to find tests
    supportFile: false, // No custom commands needed
    video: false, // Don't record videos
    screenshotOnRunFailure: true, // Screenshot on fail
    defaultCommandTimeout: 8000, // Wait up to 8s for elements
  },
});
```

#### Writing Cypress Tests

**Structure**:

```typescript
describe("Test Suite Name", () => {
  it("should do something", () => {
    // Test steps here
  });
});
```

**Common Commands**:

```typescript
cy.visit("/"); // Navigate to URL
cy.get("[data-testid=element]") // Find element
  .type("text") // Type into input
  .click() // Click element
  .should("exist") // Assert existence
  .should("contain", "text") // Assert text content
  .clear(); // Clear input
```

#### Running Cypress Tests

```bash
# Interactive mode (visual test runner)
npm run cypress:open

# Headless mode (CI/CD)
npm run cypress:run

# With app auto-start
npm run test:cypress:with-app
```

---

### Playwright Deep Dive

#### Installation & Setup

**Files**:

- `configs/playwright.config.ts` → Configuration
- `tests/playwright/human/smoke.spec.ts` → Test suite

#### Configuration Explained

```typescript
// configs/playwright.config.ts
export default defineConfig({
  testDir: "../tests/playwright", // Test location
  use: {
    baseURL: "http://127.0.0.1:4173", // App URL
    headless: true, // Run without UI
  },
  projects: [
    {
      name: "chromium", // Test in Chrome
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  reporter: [
    ["list"], // Console output
    [
      "html",
      {
        // HTML report
        outputFolder: "playwright-report",
        open: "never",
      },
    ],
  ],
});
```

#### Writing Playwright Tests

**Structure**:

```typescript
import { test, expect } from "@playwright/test";

test("should do something", async ({ page }) => {
  // Test steps here
});
```

**Common Commands**:

```typescript
await page.goto("/"); // Navigate
await page.getByTestId("element").fill("text"); // Type
await page.getByTestId("element").click(); // Click
await expect(page.getByTestId("element")).toBeVisible(); // Assert visible
await expect(page.getByTestId("element")).toContainText("text"); // Assert text
```

#### Key Differences from Cypress

| Feature       | Cypress             | Playwright           |
| ------------- | ------------------- | -------------------- |
| Syntax        | `cy.get()`          | `page.getByTestId()` |
| Async/Await   | No                  | Yes (required)       |
| Speed         | Moderate            | Fast                 |
| Debugging     | Excellent visual UI | Command line focused |
| Multi-browser | Limited             | Excellent            |

#### Running Playwright Tests

```bash
# Headless mode
npm run pw:test

# With app auto-start
npm run test:pw:with-app

# View HTML report
npx playwright show-report configs/playwright-report
```

---

## Test Organization

### Directory Structure

```
tests/
├── cypress/
│   ├── human/          # Baseline tests written by developers
│   │   └── smoke.cy.ts
│   └── ai/             # AI-generated tests (empty, to be filled)
└── playwright/
    ├── human/          # Baseline tests written by developers
    │   └── smoke.spec.ts
    └── ai/             # AI-generated tests (empty, to be filled)
```

### Human Test Suite Analysis

#### Cypress Human Tests (`tests/cypress/human/smoke.cy.ts`)

**Coverage**: 4 test scenarios

1. **Login Success**

   - Fill email and password
   - Click login
   - Assert catalog page visible
   - Assert success message

2. **Login Failure**

   - Fill wrong credentials
   - Assert error message

3. **Add to Cart & Checkout**

   - Login
   - Add product to cart
   - Navigate to checkout
   - Verify cart count
   - Complete checkout
   - Verify success message

4. **Update Profile**
   - Login
   - Navigate to profile
   - Change name
   - Save
   - Verify update message

**Code Quality**:

- ✅ Clear test names
- ✅ Uses `data-testid` selectors (stable)
- ✅ Proper assertions
- ✅ Follows Cypress best practices

#### Playwright Human Tests (`tests/playwright/human/smoke.spec.ts`)

**Coverage**: Same 4 scenarios as Cypress

**Key Differences**:

- Uses `async/await` syntax
- Uses `getByTestId()` instead of `cy.get()`
- Uses `fill()` instead of `type()`
- Uses `expect().toBeVisible()` instead of `should('exist')`

**Code Quality**:

- ✅ Modern async/await patterns
- ✅ Same stable selectors as Cypress
- ✅ Proper error handling
- ✅ Follows Playwright best practices

---

## Configuration Files

### Root `package.json`

**Purpose**: Main project configuration and scripts

**Key Scripts**:

```json
{
  "dev": "npm --prefix app run dev -- --host 0.0.0.0 --port 4173",
  "build": "npm --prefix app run build",
  "preview": "npm --prefix app run preview -- --port 4173",
  "cypress:open": "cypress open --config-file configs/cypress.config.ts",
  "cypress:run": "cypress run --config-file configs/cypress.config.ts",
  "pw:test": "playwright test --config=configs/playwright.config.ts",
  "test:cypress:with-app": "start-server-and-test dev http://127.0.0.1:4173 cypress:run",
  "test:pw:with-app": "start-server-and-test dev http://127.0.0.1:4173 pw:test",
  "eval:matrix": "ts-node evaluation/scripts/run-matrix.ts"
}
```

**Dependencies**:

- `@playwright/test`: Playwright testing framework
- `cypress`: Cypress testing framework
- `start-server-and-test`: Utility to start app before tests
- `typescript`: Type system
- `ts-node`: Run TypeScript files directly

### App `package.json`

**Purpose**: Sandbox app configuration

**Key Dependencies**:

- `react`: UI library
- `react-dom`: React rendering for web
- `vite`: Build tool and dev server

### TypeScript Configuration

**Root `tsconfig.json`**:

- Strict type checking enabled
- Modern ES modules
- React JSX support

**App `tsconfig.json`**:

- Inherits from root
- App-specific settings for Vite + React

---

## Running the Project

### Initial Setup (First Time Only)

```bash
# 1. Ensure Node.js 20.19.0 is installed
node --version  # Should show v20.19.0

# 2. Install dependencies (root level)
npm install

# 3. Install app dependencies
cd app && npm install && cd ..
```

### Development Workflow

#### Option 1: Manual Testing (Interactive)

```bash
# Terminal 1: Start the app
npm run dev
# App runs at http://127.0.0.1:4173

# Terminal 2: Open Cypress
npm run cypress:open
# Opens visual test runner, click tests to run
```

#### Option 2: Automated Testing (CI-Style)

```bash
# Run Cypress tests (app auto-starts)
npm run test:cypress:with-app

# Run Playwright tests (app auto-starts)
npm run test:pw:with-app
```

#### Option 3: Evaluation Matrix (Full Comparison)

```bash
# Runs all test suites multiple times
npm run eval:matrix
# Results saved to evaluation/runs/summary.json
```

### Understanding Test Output

#### Cypress Output

```
  Smoke: core flows
    ✓ login success and catalog visible (245ms)
    ✓ login failure shows error (156ms)
    ✓ can add to cart and checkout (412ms)
    ✓ can update profile (298ms)

  4 passing (1s)
```

#### Playwright Output

```
Running 4 tests using 1 worker

  ✓  [chromium] › human/smoke.spec.ts:3:1 › login success and catalog visible (234ms)
  ✓  [chromium] › human/smoke.spec.ts:15:1 › login failure shows error (145ms)
  ✓  [chromium] › human/smoke.spec.ts:26:1 › can add to cart and checkout (389ms)
  ✓  [chromium] › human/smoke.spec.ts:42:1 › can update profile (267ms)

  4 passed (1.0s)
```

---

## Evaluation System

### Purpose

Automatically measure and compare test quality across:

- Cypress vs Playwright
- Human-written vs AI-generated
- Multiple runs (detect flakiness)

### Evaluation Script

**File**: `evaluation/scripts/run-matrix.ts`

**What It Does**:

1. Runs each test suite N times (default: 3)
2. Tracks passes and failures
3. Generates JSON summary report

**Test Suites Evaluated**:

- `cypress-human`: Human Cypress tests
- `cypress-ai`: AI Cypress tests (when added)
- `pw-human`: Human Playwright tests
- `pw-ai`: AI Playwright tests (when added)

**Output**: `evaluation/runs/summary.json`

```json
[
  {
    "name": "cypress-human",
    "command": "start-server-and-test...",
    "runs": 3,
    "passes": 3,
    "failures": 0
  },
  ...
]
```

### Metrics Being Tracked

**File**: `evaluation/metrics.md`

**Planned Metrics**:

1. **compile_success**: Do tests run without syntax errors?
2. **first_run_pass_rate**: Pass rate on first execution
3. **run_pass_rate_n**: Pass rate over N runs (consistency)
4. **flakiness**: `1 - pass_rate` (lower is better)
5. **bug_detection**: Do tests fail when bugs are introduced?
6. **maintainability_score**: Manual 1-5 rating (selector quality, clarity)
7. **generation_metadata**: Which AI model, which prompt version

### How to Run Evaluation

```bash
# Run full evaluation
npm run eval:matrix

# View results
cat evaluation/runs/summary.json
```

---

## How to Contribute

### Adding Human Tests

1. **Choose framework**: Cypress or Playwright
2. **Create test file** in `tests/{framework}/human/`
3. **Follow existing patterns** (see smoke tests)
4. **Use `data-testid` selectors**
5. **Run tests** to verify
6. **Commit changes**

### Adding AI-Generated Tests

#### Step 1: Prepare a Prompt

Example prompt for AI:

```
Write Cypress E2E tests for the AI E2E Sandbox app.

The app has these pages:
- Login (email: test@example.com, password: Password123)
- Catalog (3 products with Add to Cart buttons)
- Checkout (shows cart count)
- Profile (editable name field)

All elements use data-testid attributes.
Write tests that cover:
1. Successful login flow
2. Failed login with wrong credentials
3. Adding product to cart and checking out
4. Updating profile information

Use modern Cypress best practices.
```

#### Step 2: Generate Tests

- Use ChatGPT, Claude, or other LLM
- Paste the prompt
- Review generated code

#### Step 3: Add to Repository

```bash
# Save AI-generated Cypress test
# File: tests/cypress/ai/smoke.cy.ts

# Save AI-generated Playwright test
# File: tests/playwright/ai/smoke.spec.ts
```

#### Step 4: Run Evaluation

```bash
npm run eval:matrix
```

#### Step 5: Analyze Results

Compare AI vs human test performance in `evaluation/runs/summary.json`

---

## Appendix: Key Concepts

### What is E2E Testing?

**End-to-End (E2E) Testing**:

- Tests the entire application from user's perspective
- Simulates real user interactions (click, type, navigate)
- Runs in actual browser
- Catches integration issues

**Example**: Instead of testing login function in isolation, E2E test:

1. Opens browser
2. Navigates to login page
3. Types email and password
4. Clicks submit button
5. Verifies user lands on dashboard

### What are `data-testid` Attributes?

**Purpose**: Stable selectors for testing

**Bad Approach** (fragile):

```typescript
cy.get(".btn-primary"); // Breaks if CSS class changes
cy.get("button:nth-child(2)"); // Breaks if order changes
cy.contains("Login"); // Breaks if text changes
```

**Good Approach** (stable):

```typescript
cy.get("[data-testid=login-submit]"); // Only breaks if removed intentionally
```

**In HTML**:

```html
<button data-testid="login-submit">Login</button>
```

### What is Flakiness?

**Flaky Test**: A test that sometimes passes and sometimes fails without code changes

**Common Causes**:

- Race conditions (element not ready)
- Network delays
- Animation timing
- Random data

**Why It Matters**:

- Flaky tests erode trust
- Wastes developer time
- Makes CI/CD unreliable

**How We Measure It**:

- Run same test N times
- `flakiness = failures / total_runs`
- Goal: 0% flakiness

### What is CI/CD?

**Continuous Integration / Continuous Deployment**:

- Automated testing on every code change
- Tests run in "headless" mode (no UI)
- Blocks broken code from reaching production

**This Project's Role**:

- Both Cypress and Playwright support headless mode
- Tests run fast enough for CI/CD
- JSON reports enable automated analysis

### Async/Await Explained

**Synchronous Code** (runs line by line):

```javascript
let data = fetchData(); // Waits for data
console.log(data); // Runs after data arrives
```

**Asynchronous Code** (doesn't wait):

```javascript
let promise = fetchData(); // Returns immediately
console.log(promise); // Logs promise object, not data
```

**Async/Await** (makes async code look sync):

```javascript
async function run() {
  let data = await fetchData(); // Waits for data
  console.log(data); // Logs actual data
}
```

**Why Playwright Uses It**:

- Browser interactions are asynchronous
- `await` ensures actions complete before moving on
- More explicit about timing

**Why Cypress Doesn't**:

- Cypress automatically chains commands
- Handles waiting internally
- Simpler syntax for beginners

---

## Quick Reference

### Essential Commands

```bash
# Development
npm run dev                    # Start app
npm run build                  # Build for production
npm run preview               # Preview production build

# Testing
npm run cypress:open          # Cypress interactive
npm run cypress:run           # Cypress headless
npm run pw:test               # Playwright headless
npm run test:cypress:with-app # Cypress + auto-start app
npm run test:pw:with-app      # Playwright + auto-start app

# Evaluation
npm run eval:matrix           # Run full comparison
```

### Test Credentials

```
Email: test@example.com
Password: Password123
```

### Important URLs

- App: http://127.0.0.1:4173
- Playwright Report: `npx playwright show-report configs/playwright-report`

### File Locations

- **App Source**: `app/src/App.tsx`
- **Cypress Tests**: `tests/cypress/human/smoke.cy.ts`
- **Playwright Tests**: `tests/playwright/human/smoke.spec.ts`
- **Configs**: `configs/cypress.config.ts`, `configs/playwright.config.ts`
- **Evaluation Results**: `evaluation/runs/summary.json`

---

## Next Steps

### Immediate Tasks

1. **Get Environment Running**:

   ```bash
   npm install
   cd app && npm install && cd ..
   npm run dev  # Verify app starts
   ```

2. **Run Existing Tests**:

   ```bash
   npm run test:cypress:with-app
   npm run test:pw:with-app
   ```

3. **Explore Interactively**:
   ```bash
   npm run cypress:open
   # Click through tests to see them run
   ```

### Short-Term Goals

1. **Add AI Tests**: Generate tests using LLMs and add to `tests/*/ai/` folders
2. **Run Evaluation**: Execute `npm run eval:matrix` and analyze results
3. **Document Findings**: Compare human vs AI test quality

### Long-Term Vision

1. **Expand App**: Add more complex features (authentication, API calls, etc.)
2. **More Metrics**: Implement all metrics from `evaluation/metrics.md`
3. **Framework Recommendation**: Use data to guide framework choice
4. **AI Prompt Templates**: Create reusable prompts in `prompts/` directory
5. **Continuous Monitoring**: Set up CI/CD to track test quality over time

---

## Questions & Troubleshooting

### Common Issues

**"Port 4173 already in use"**:

```bash
# Find and kill process using port
lsof -ti:4173 | xargs kill -9
```

**"Tests fail immediately"**:

- Ensure app is running first
- Use `*:with-app` scripts to auto-start

**"Module not found" errors**:

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Node version mismatch**:

```bash
# Install correct version
nvm install 20.19.0
nvm use 20.19.0
```

### Getting Help

1. Read this document thoroughly
2. Check existing test files for examples
3. Review framework documentation:
   - Cypress: https://docs.cypress.io
   - Playwright: https://playwright.dev
4. Ask team members or create issues in the repo

---

## Glossary

- **E2E**: End-to-End (full application testing)
- **CI/CD**: Continuous Integration/Continuous Deployment
- **Flaky**: Test that inconsistently passes/fails
- **Headless**: Running browser without visual UI
- **Selector**: Way to find elements (CSS, testid, etc.)
- **Assertion**: Verification that something is true
- **SPA**: Single-Page Application
- **TSX**: TypeScript + JSX (React syntax)
- **Vite**: Modern build tool for web apps
- **npm**: Node Package Manager

---

**Document Version**: 1.0
**Last Updated**: 2025-11-13
**Maintained By**: sense-testing team
