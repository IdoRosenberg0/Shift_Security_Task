# TodoMVC E2E Tests with Playwright

This project is a complete end-to-end (E2E) test suite for the [TodoMVC](https://demo.playwright.dev/todomvc/) application, built using [Playwright](https://playwright.dev/). It was developed as part of the CO-OP home assignment for Shift Security.

---

# Setup Instructions

# 1. Install dependencies
npm install

# 2. Run all tests
npx playwright test

# 3. View test report
npx playwright show-report

Playwright will launch an interactive HTML report of the latest run.

---

# Test Structure
todo-management.spec.ts: Add, edit, complete, delete, and count todos

filtering.spec.ts: Validate filters (All, Active, Completed)

batch-operations.spec.ts: Test "Mark all as complete" and "Clear completed"

persistence.spec.ts: Ensure todos persist across page reloads

---

# Challanges & Edge Cases
Interacting with hidden elements (e.g. delete button only appears on hover)

UI cleanup when deleting the last item

Deleting a todo by editing to an empty string

Adding a todo with long text


---

# Submission
This project was created by Ido Rosenberg as part of the Shift CO-OP Home Assignment.

GitHub repo: https://github.com/IdoRosenberg0/Shift_Security_Task






