import { test, expect } from '@playwright/test'; 

test.describe('Batch Operations', () => {
    //beforeEach hook, add three todos to the list
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Buy milk');
        await page.keyboard.press('Enter');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Solve Shift Securitys home assignment');
        await page.keyboard.press('Enter');
        await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Score 100 at Machine Learning course');
        await page.keyboard.press('Enter');
    });

  test('should mark all items as complete', async ({ page }) => {
    // Mark all as completed (there's a hidden checkbox for this)
    await page.locator('.toggle-all').check(); 
    // Verify that all items are marked as completed
    const completedItems = page.locator('.todo-list li.completed');
    await expect(completedItems).toHaveCount(3);
  });

  test('should clear completed items', async ({ page }) => {
    // Mark all as completed (there's a hidden checkbox for this)
    await page.locator('.toggle-all').check(); 
    // Click 'Clear completed'
    await page.getByRole('button', { name: 'Clear completed' }).click();
    // Expect the list to be empty, footer and main sections to be gone
    await expect(page.locator('.todo-list li')).toHaveCount(0);
    await expect(page.locator('footer.footer')).toHaveCount(0);
    await expect(page.locator('section.main')).toHaveCount(0);
  });
});



  

