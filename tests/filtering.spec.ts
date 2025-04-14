import { test, expect } from '@playwright/test';

test.describe('Filtering Todos', () => {
    //beforeEach hook, add two todos to the list and mark one as completed
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Buy milk');
        await page.keyboard.press('Enter');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Solve Shift Securitys home assignment');
        await page.keyboard.press('Enter');
        await page.getByRole('listitem').filter({ hasText: 'Solve Shift Securitys home assignment' }).getByLabel('Toggle Todo').check();
    });
  
    test('should show all todos under "All" filter', async ({ page }) => {
        // Click on the "All" filter link
        await page.getByRole('link', { name: 'All' }).click();
        // Verify that all todos are displayed
        await expect(page.locator('.todo-list li')).toHaveCount(2);
    });
  
    test('should show only active todos under "Active" filter', async ({ page }) => {
        // Click on the "Active" filter link
        await page.getByRole('link', { name: 'Active' }).click();
        const items = page.locator('.todo-list li');
        // Verify that only active todos are displayed, and matches the expected text
        await expect(items).toHaveCount(1);
        await expect(items.first()).toContainText('Buy milk');
    });
  
    test('should show only completed todos under "Completed" filter', async ({ page }) => {
        // Click on the "Completed" filter link
        await page.getByRole('link', { name: 'Completed' }).click();
        const items = page.locator('.todo-list li');
        // Verify that only completed todos are displayed, and matches the expected text
        await expect(items).toHaveCount(1);
        await expect(items.first()).toContainText('Solve Shift Securitys home assignment');
    });

  });
  
