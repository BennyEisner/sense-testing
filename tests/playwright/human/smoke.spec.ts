import { test, expect } from "@playwright/test";

test("login success and catalog visible", async ({ page }) => {
  await page.goto("/"); // uses baseURL from config
  await page.getByTestId("login-email").fill("test@example.com");
  await page.getByTestId("login-password").fill("Password123");
  await page.getByTestId("login-submit").click();

  await expect(page.getByTestId("page-catalog")).toBeVisible();
  await expect(page.getByTestId("banner-message")).toContainText(
    "Login successful",
  );
});

test("login failure shows error", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("login-email").fill("wrong@example.com");
  await page.getByTestId("login-password").fill("Wrong");
  await page.getByTestId("login-submit").click();

  await expect(page.getByTestId("banner-message")).toContainText(
    "Invalid credentials",
  );
});

test("can add to cart and checkout", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("login-email").fill("test@example.com");
  await page.getByTestId("login-password").fill("Password123");
  await page.getByTestId("login-submit").click();

  await page.getByTestId("product-1-add").click();
  await page.getByTestId("nav-checkout").click();

  await expect(page.getByTestId("cart-count")).toContainText("1");
  await page.getByTestId("checkout-submit").click();
  await expect(page.getByTestId("banner-message")).toContainText(
    "Checkout complete",
  );
});

test("can update profile", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("login-email").fill("test@example.com");
  await page.getByTestId("login-password").fill("Password123");
  await page.getByTestId("login-submit").click();

  await page.getByTestId("nav-profile").click();
  const nameField = page.getByTestId("profile-name");

  await nameField.fill("");
  await nameField.fill("New Name");
  await page.getByTestId("profile-save").click();

  await expect(page.getByTestId("banner-message")).toContainText(
    "Profile updated",
  );
});
