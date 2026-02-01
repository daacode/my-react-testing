import { test, expect } from "@playwright/test";

test("user can add and remove a todo", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await page.fill(
    'input[placeholder="What needs to be done?"]',
    "Learn Playwright"
  );
  await page.click('button:text("Add")');

  await expect(page.getByText("Learn Playwright")).toBeVisible();

  const deleteButton = page
    .getByText("Learn Playwright")
    .locator("..")
    .getByRole("button", { name: "Delete" });

  await deleteButton.click();

  await expect(page.getByText("Learn Playwright")).not.toBeVisible();
});
