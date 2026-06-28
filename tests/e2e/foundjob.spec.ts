import { expect, test } from "@playwright/test";

test.describe("FoundJob critical flows", () => {
  test("landingpage is reachable", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("FoundJob").first()).toBeVisible();
  });

  test.skip("company creates contract job and hires applicant", async () => {
    // Implement after auth, job service, application service, and company service are wired.
  });
});
