import AxeBuilder from "@axe-core/playwright";
import { expect, test as base } from "@playwright/test";

const test = base.extend({
  page: async ({ page }, runTest) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (["warning", "error"].includes(message.type())) errors.push(message.text());
    });
    await runTest(page);
    expect(errors, "browser warnings and errors").toEqual([]);
  },
});

test("the portfolio renders with working section and social links", async ({ page }) => {
  const response = await page.goto("./");
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Abhijith\s+SD/i);
  await expect(page.getByRole("main")).toContainText("UKFCET");

  const navigation = page.getByRole("navigation", { name: "Primary" });
  for (const id of ["about", "journal", "playground", "contact", "home"]) {
    await navigation.locator(`a[href$="#${id}"]`).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeAttached();
  }

  for (const [name, href] of [
    [/github/i, "https://github.com/abh-11"],
    [/linkedin/i, "https://www.linkedin.com/in/abhijith-sd-a92a37336/"],
  ] as const) {
    const links = page.getByRole("link", { name });
    expect(await links.count()).toBeGreaterThan(0);
    for (const link of await links.all()) await expect(link).toHaveAttribute("href", href);
  }
});

test("keyboard users can skip directly to the main content", async ({ page }) => {
  await page.goto("./");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: /skip/i });
  await expect(skip).toBeFocused();
  const destination = await skip.getAttribute("href");
  expect(destination).toMatch(/^#.+/);
  await page.keyboard.press("Enter");
  expect(new URL(page.url()).hash).toBe(destination);
});

test("theme follows the system until an explicit choice, then survives reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("./");
  const html = page.locator("html");
  const theme = page.getByRole("button", { name: "Dark theme" });
  await expect(html).toHaveAttribute("data-theme", "dark");
  await expect(theme).toHaveAttribute("aria-pressed", "true");
  await theme.click();
  await expect(html).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "light");
  await expect(theme).toHaveAttribute("aria-pressed", "false");
});

test("calm music starts silent, responds to a gesture and stays silent on reload", async ({ page }) => {
  await page.goto("./");
  const off = page.getByRole("button", { name: "Calm music: Off" });
  const on = page.getByRole("button", { name: "Calm music: On" });
  await expect(off).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator("audio")).toHaveJSProperty("paused", true);
  await off.click();
  await expect(on).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("audio")).toHaveJSProperty("paused", false);
  await on.click();
  await expect(off).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator("audio")).toHaveJSProperty("paused", true);
  await off.click();
  await expect(on).toBeVisible();
  await page.reload();
  await expect(page.locator("audio")).toHaveJSProperty("paused", true);
  await expect(off).toHaveAttribute("title", "Resume calm music");
  await expect(off).toHaveAttribute("aria-pressed", "false");
});

test("music stays off if the browser rejects playback", async ({ page }) => {
  await page.addInitScript(() => {
    HTMLMediaElement.prototype.play = () =>
      Promise.reject(new DOMException("Playback declined", "NotAllowedError"));
  });
  await page.goto("./");
  const off = page.getByRole("button", { name: "Calm music: Off" });
  await off.click();
  await expect(page.getByRole("status").filter({hasText: "Audio is unavailable"})).toBeVisible();
  await expect(off).toHaveAttribute("aria-pressed", "false");
});

test("a seed can be planted and grown by keyboard at the visitor's own pace", async ({ page }) => {
  await page.goto("./#playground");
  const garden = page.getByRole("article").filter({ has: page.getByRole("heading", { name: "Seed Garden" }) });
  await garden.getByRole("button", { name: "Plant a seed" }).focus();
  await page.keyboard.press("Enter");
  const water = garden.getByRole("button", { name: "Water seed" });
  await expect(water).toBeFocused();
  await expect(garden.getByRole("status")).toContainText("1/5");
  for (let stage = 2; stage <= 5; stage++) {
    await page.keyboard.press("Space");
    await expect(garden.getByRole("status")).toContainText(`${stage}/5`);
  }
  await expect(garden.getByRole("status")).toContainText(/bloom/i);
});

test("fireflies can be caught, paused, resumed and reset by keyboard", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./#playground");
  const game = page.getByRole("article").filter({ has: page.getByRole("heading", { name: "Firefly Catch" }) });
  await game.getByRole("button", { name: "Start catching" }).focus();
  await page.keyboard.press("Enter");
  const target = game.getByRole("button", { name: "Catch firefly 1" });
  await expect(target).toBeFocused();
  await page.keyboard.press("Space");
  await expect(game.getByRole("status")).toContainText("Score: 1");
  await game.getByRole("button", { name: "Pause" }).press("Enter");
  await game.getByRole("button", { name: "Resume" }).press("Enter");
  await game.getByRole("button", { name: "Reset" }).press("Enter");
  await expect(game.getByRole("status")).toContainText("Score: 0");
  await expect(target).toBeFocused();
});

for (const colorScheme of ["light", "dark"] as const) {
  test(`homepage meets automated WCAG A/AA checks in ${colorScheme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
    await page.goto("./");
    await page.locator("#playground").scrollIntoViewIfNeeded();
    await expect(page.getByRole("button", { name: "Plant a seed" })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations.map(({ id, nodes }) => ({
      id, elements: nodes.map(({ target, failureSummary }) => ({ target, failureSummary })),
    }))).toEqual([]);
  });
}

test("mobile navigation works and the page fits a narrow viewport", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 760 });
  await page.goto("./");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("button", { name: "Open navigation" }).click();
  const navigation = page.getByRole("navigation", { name: "Primary" });
  await navigation.getByRole("link", { name: "Playground" }).click();
  await expect(page).toHaveURL(/#playground$/);
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Plant a seed" })).toBeVisible();
  const overflows = await page.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflows).toBe(false);
});

test("the field journal and gallery support keyboard exploration", async ({ page }) => {
  await page.goto("./#journal");
  const journal = page.locator("#journal");
  const skills = journal.locator("details").filter({ has: page.locator("summary", { hasText: "Skills" }) });
  await skills.locator("summary").press("Enter");
  await expect(skills).toHaveAttribute("open", "");
  const picture = page.getByRole("link", { name: "View Fern fronds" });
  await picture.press("Enter");
  const viewer = page.getByRole("dialog");
  await expect(viewer).toHaveAccessibleName("Fern fronds");
  await page.keyboard.press("ArrowRight");
  await expect(viewer).toHaveAccessibleName("Under the canopy");
  await page.keyboard.press("Escape");
  await expect(viewer).not.toBeVisible();
  await expect(picture).toBeFocused();
});
