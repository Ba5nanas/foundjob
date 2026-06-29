import { expect, test } from "@playwright/test";

test.describe("FoundJob critical flows", () => {
  test("landingpage is reachable", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("FoundJob").first()).toBeVisible();
  });

  test.skip("job seeker registers and logs in", async () => {
    // Implement after public auth API and session persistence are wired.
  });

  test.skip("company creates permanent job", async () => {
    // Implement after company auth, package limits, and job service create flow are wired.
  });

  test.skip("company creates contract job", async () => {
    // Implement after contract duration validation is wired through the job service API.
  });

  test.skip("company hires applicant from application workflow", async () => {
    // Implement after application status transitions and appointment flow are wired.
  });

  test.skip("public image route serves public files", async () => {
    // Implement after file upload metadata and Nginx public file serving are wired end to end.
  });

  test.skip("private resume download requires permission", async () => {
    // Implement after resume ownership checks and protected file routes are wired.
  });
});
