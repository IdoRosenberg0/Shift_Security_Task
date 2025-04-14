import { test, expect } from '@playwright/test';

test.describe('Persistence', () => {
  test('todos should persist after page reload', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/');

    // Add two todos
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Buy milk');
    await page.keyboard.press('Enter');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Solve Shift Securitys home assignment');
    await page.keyboard.press('Enter');
    await page.getByRole('listitem').filter({ hasText: 'Buy milk' }).getByLabel('Toggle Todo').check();

    // Verify they're added
    const todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(2);

    // Reload the page
    await page.reload();

    // Verify they're still there after reload
    const reloadedItems = page.locator('.todo-list li');
    await expect(reloadedItems).toHaveCount(2);
    await expect(reloadedItems.nth(0)).toContainText('Buy milk');
    await expect(reloadedItems.nth(1)).toContainText('Solve Shift Securitys home assignment');

    // Verify the completed item is still marked as completed
    const reloadedCompletedItems = page.locator('.todo-list li.completed');
    await expect(reloadedCompletedItems).toHaveCount(1);
    await expect(reloadedItems.nth(0)).toContainText('Buy milk');
  });
});
