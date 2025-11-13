import { execSync } from "child_process";
import fs from "fs";

type SuiteResult = {
  name: string;
  command: string;
  runs: number;
  passes: number;
  failures: number;
};

function run(cmd: string) {
  try {
    execSync(cmd, { stdio: "inherit" });
    return true;
  } catch {
    return false;
  }
}

function runSuite(name: string, command: string, times: number): SuiteResult {
  let passes = 0;
  for (let i = 0; i < times; i++) {
    const ok = run(command);
    if (ok) passes++;
  }
  return { name, command, runs: times, passes, failures: times - passes };
}

function main() {
  const repeats = 3; // increase when stable
  const results: SuiteResult[] = [];

  // Cypress human
  results.push(
    runSuite(
      "cypress-human",
      "start-server-and-test dev http://127.0.0.1:4173 \"cypress:run -- --spec 'tests/cypress/human/**/*.cy.ts'\"",
      repeats,
    ),
  );

  // Cypress AI
  results.push(
    runSuite(
      "cypress-ai",
      "start-server-and-test dev http://127.0.0.1:4173 \"cypress:run -- --spec 'tests/cypress/ai/**/*.cy.ts'\"",
      repeats,
    ),
  );

  // Playwright human
  results.push(
    runSuite(
      "pw-human",
      "start-server-and-test dev http://127.0.0.1:4173 \"pw:test -- --project=chromium --grep '@ai-e2e-lab|@all'\"",
      repeats,
    ),
  );

  // Playwright AI
  results.push(
    runSuite(
      "pw-ai",
      "start-server-and-test dev http://127.0.0.1:4173 \"pw:test --config=configs/playwright.config.ts --grep '@ai'\"",
      repeats,
    ),
  );

  fs.mkdirSync("evaluation/runs", { recursive: true });
  fs.writeFileSync(
    "evaluation/runs/summary.json",
    JSON.stringify(results, null, 2),
  );
  console.log("Summary written to evaluation/runs/summary.json");
}

main();
