For each suite (Cypress human, Cypress AI, Playwright human, Playwright AI), we will record:

- compile_success: did the tests run without syntax errors
- first_run_pass_rate: passed / total on first run
- run_pass_rate_n: passed / total over N runs (e.g. N = 10)
- flakiness: 1 - run_pass_rate_n
- bug_detection: did tests fail when known bug branches are used
- maintainability_score: 1-5 manual score (selectors, clarity, duplication)
- generation_metadata: model, prompt version, scenario list
