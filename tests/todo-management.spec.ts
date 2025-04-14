import { test, expect } from '@playwright/test';

test.describe('Todo Management', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('https://demo.playwright.dev/todomvc/');
    });
  
    test('should create a new todo item', async ({ page }) => {
      // Fill in the input field with a new todo item and press Enter
      await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Buy milk');
      await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

      // Verify that the new todo item is displayed in the list, and the count is correct
      const todoItems = page.locator('.todo-list li');
      await expect(todoItems).toHaveCount(1);
      await expect(todoItems.first()).toContainText('Buy milk'); 
    });
    
    test('should edit an existing todo item', async ({ page }) => {
      
      // Fill in the input field with a new todo item and press Enter
      await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Buy milk');
      await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

      const todoItems = page.locator('.todo-list li');

      // Click on the first todo item and edit it
      await page.getByTestId('todo-title').dblclick();
      await page.getByRole('textbox', { name: 'Edit' }).fill('Buy bread');  
      await page.getByRole('textbox', { name: 'Edit' }).press('Enter');
        
      // Verify that the todo item has been updated, and the count is still correct
      await expect(todoItems.first()).toContainText('Buy bread');
      await expect(todoItems).toHaveCount(1);
    });

    test('should mark a todo as complete/incomplete', async ({ page }) => {
      // Fill in the input field with a new todo item and press Enter
      await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Buy milk');
      await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

      const todoItems = page.locator('.todo-list li');

      // Mark the first todo item as completed
      await page.getByRole('listitem').filter({ hasText: 'Buy milk' }).getByLabel('Toggle Todo').check();
      // Verify that the todo item is marked as completed and the "Clear completed" button is visible
      await expect(todoItems.first()).toHaveClass(/completed/);
      await page.getByRole('button', { name: 'Clear completed' }).isVisible()

      // Uncheck the checkbox to mark the todo item as incomplete
      await page.getByRole('listitem').filter({ hasText: 'Buy milk' }).getByLabel('Toggle Todo').uncheck();
      // Verify that the todo item is marked as incomplete and the "Clear completed" button is not visible
      await expect(todoItems.first()).not.toHaveClass(/completed/);
      await page.getByRole('button', { name: 'Clear completed' }).isHidden()
    });

    test('should delete a todo item', async ({ page }) => {
      // Fill in the input field with a new todo item and press Enter
      await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Buy milk');
      await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
      await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Buy bread');
      await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
      await page.getByRole('listitem').filter({ hasText: 'Buy bread' }).getByLabel('Toggle Todo').check();

      const todoItems = page.locator('.todo-list li');

      // Delete the incomplete todo item
      await todoItems.first().hover();
      await todoItems.first().locator('.destroy').click();
      // Verify that the incomplete todo item has been removed from the list, and the count is correct
      await expect(todoItems).toHaveCount(1);
      // Delete the second completed item
      await todoItems.first().hover();
      await todoItems.first().locator('.destroy').click();

      // Verify that the complete todo item has been removed from the list,
      // and the footer and main sections are hidden since there are no items left
      await expect(todoItems).toHaveCount(0);
      await expect(page.locator('section.main')).toHaveCount(0);
      await expect(page.locator('footer.footer')).toHaveCount(0);

      // Another way to delete an item is by editing it to an empty string
      await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Buy milk');
      await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
      await page.getByTestId('todo-title').dblclick();
      await page.getByRole('textbox', { name: 'Edit' }).fill('');
      await page.getByRole('textbox', { name: 'Edit' }).press('Enter');

      // Verify that the todo item has been removed from the list
      await expect(todoItems).toHaveCount(0);
    });

    test('verify item count updates correctly', async ({ page }) => {
      // Fill in the input field with a new todo item and press Enter
      await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Buy milk');
      await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

      const todoItems = page.locator('.todo-list li');
      const todoCount = page.locator('.todo-count');

      // Verify that the item count is updated correctly
      await expect(todoCount).toHaveText('1 item left');

      //Add another item
      await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Buy meat');
      await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

      // Verify that the item count is updated correctly
      await expect(todoCount).toHaveText('2 items left');

      // Mark the todo items as completed and verify the count
      await page.getByRole('listitem').filter({ hasText: 'Buy milk' }).getByLabel('Toggle Todo').check();
      await expect(todoCount).toHaveText('1 item left');
      await page.getByRole('listitem').filter({ hasText: 'Buy meat' }).getByLabel('Toggle Todo').check();
      await expect(todoCount).toHaveText('0 items left');
      await page.getByRole('listitem').filter({ hasText: 'Buy milk' }).getByLabel('Toggle Todo').uncheck();
      await page.getByRole('listitem').filter({ hasText: 'Buy meat' }).getByLabel('Toggle Todo').uncheck();
      await expect(todoCount).toHaveText('2 items left');

      //Delete first item and verify the count
      await todoItems.first().hover();
      await page.getByRole('button', { name: 'Delete' }).click();
      await expect(todoCount).toHaveText('1 item left');
    });
  });
