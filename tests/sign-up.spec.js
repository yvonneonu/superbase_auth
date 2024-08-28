import { test, expect } from "@playwright/test";

test.describe("Sign Up Page", () => {
  test("should render the sign-up form", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    await page.waitForSelector('input[name="email"]');

    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');
    const submitButton = page.locator('button[type="submit"]');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeDisabled(); // Initially disabled
  });
  test("should sign up successfully with valid credentials", async ({
    page,
    browserName,
  }) => {
    await page.goto("http://localhost:3000/");

    await page.fill('input[name="email"]', "yvonneonuorah@gmail.com");
    await page.fill('input[name="password"]', "08100642038");

    const submitButton = page.locator('button[type="submit"]');
    // Adding a brief wait before checking if the button is enabled
    await page.waitForTimeout(browserName === "webkit" ? 2000 : 1000);

    console.log("Checking if the submit button is enabled");
    await expect(submitButton).toBeEnabled({ timeout: 10000 });

    await page.route("**/auth/v1/signup", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ user: { id: "123" }, session: null }),
      });
    });

    await page.click('button[type="submit"]');

    // Capture screenshot for debugging
    await page.screenshot({ path: "signup-success.png" });

    await page.waitForSelector("text=Login successful!");
    await expect(page.locator("text=Login successful!")).toBeVisible();
  });

  test("should show error message on signup failure", async ({
    page,
    browserName,
  }) => {
    await page.goto("http://localhost:3000/");
    console.log("Filling email and password", browserName);

    await page.fill('input[name="email"]', "yvonneonuorah@gmail.com");
    await page.fill('input[name="password"]', "12345678");

    await page.route("**/auth/v1/signup", (route) => {
      route.fulfill({
        status: 400,
        body: JSON.stringify({
          error: { message: "Invalid login credentials" },
        }),
      });
    });

    await page.click('button[type="submit"]');

    await page.waitForSelector("text=Invalid login credentials");
    await expect(page.locator("text=Invalid login credentials")).toBeVisible();
  });

  test("should not submit the form with empty fields", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    await page.fill('input[name="email"]', "");
    await page.fill('input[name="password"]', "");

    // Locate the button with the correct text
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();

    // Attempt to click to confirm no submission occurs, should not actually submit
    await expect(submitButton).not.toBeEnabled();

    const successMessage = page.locator("text=Login successful!");
    await expect(successMessage).not.toBeVisible();
  });
});
