import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Shows every scroll-revealed element at once, for checks that read the whole page.
async function revealAll(page: Page) {
  await page.evaluate(() => document.querySelectorAll("[data-reveal]").forEach((el) => el.setAttribute("data-in", "")));
}

// Scrolls through the page so lazily loaded photographs load, then back to the top.
async function loadAllPhotos(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  // A photograph hidden by the layout (the pinned scene's, on small screens) is never fetched.
  await page.waitForFunction(() =>
    [...document.images].filter((img) => img.getClientRects().length > 0).every((img) => img.complete && img.naturalWidth > 0),
  );
}

// Scrolls the pinned scene to progress p (0–1) of its hold, then lets its transitions settle.
async function scrollScene(page: Page, id: string, p: number) {
  await page.evaluate(
    ([id, p]) => {
      const s = document.getElementById(id as string)!;
      const stick = parseFloat(s.style.getPropertyValue("--stick")) || 0;
      const stageH = parseFloat(s.style.getPropertyValue("--stage-h")) || 0;
      const top = s.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - stick + (p as number) * (s.offsetHeight - stageH), behavior: "instant" });
    },
    [id, p] as const,
  );
  await page.waitForTimeout(500);
}

test.describe("first screen", () => {
  test("states the promise over a photograph and offers the call", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Ameliora: AI and automation for UK businesses/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("AI that pays for itself.");
    await expect(page.getByText("We find where your business loses time and money")).toBeVisible();
    const cta = page.locator("#hero-cta");
    await expect(cta).toBeInViewport();
    await expect(cta).toHaveText("Book a discovery call");
    await expect(cta).toHaveAttribute("href", /^mailto:hello@ameliora\.co\.uk\?subject=Discovery%20call/);
    const photo = page.locator(".hero-photo img");
    await expect(photo).toBeInViewport();
    expect(await photo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  });

  test("headline sits on two lines or fewer", async ({ page }) => {
    await page.goto("/");
    const lines = await page.getByRole("heading", { level: 1 }).evaluate((h) => {
      const lh = parseFloat(getComputedStyle(h).lineHeight);
      return Math.round(h.getBoundingClientRect().height / lh);
    });
    expect(lines).toBeLessThanOrEqual(2);
  });
});

test("the page tells its story in six sections", async ({ page }) => {
  await page.goto("/");
  const ids = await page.locator("main > section").evaluateAll((els) => els.map((el) => el.id || el.getAttribute("aria-label")));
  expect(ids).toEqual(["top", "The problem", "approach", "process", "commitments", "book"]);
  await expect(page.getByText("You have tried the AI tools.")).toHaveCount(1);
  // The retired gimmicks stay gone.
  await expect(page.locator(".pile, .calc, input[type=range]")).toHaveCount(0);
});

test("every nav link leads to a section with a heading", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "nav links are hidden below 860px");
  await page.goto("/");
  const hrefs = await page.locator(".nav-links a").evaluateAll((as) => as.map((a) => a.getAttribute("href")!));
  expect(hrefs).toEqual(["#approach", "#process", "#commitments"]);
  for (const href of hrefs) {
    await expect(page.locator(href)).toHaveCount(1);
    await expect(page.locator(href).locator("h2")).toHaveCount(1);
  }
  await page.locator(".nav-links a", { hasText: "Commitments" }).click();
  await expect(page.locator("#commitments h2")).toBeInViewport();
});

test("every photograph is described, captioned, loaded and credited", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await loadAllPhotos(page);
  const photos = await page.locator("main figure").evaluateAll((figs) =>
    figs.map((f) => ({
      alt: f.querySelector("img")?.getAttribute("alt") ?? "",
      caption: f.querySelector("figcaption")?.textContent?.trim() ?? "",
    })),
  );
  expect(photos.length).toBeGreaterThanOrEqual(4);
  for (const p of photos) {
    expect(p.alt.length).toBeGreaterThan(10);
    expect(p.caption.length).toBeGreaterThan(5);
  }
  await expect(page.locator("footer")).toContainText("Photographs are illustrative.");
  await expect(page.locator("footer")).toContainText("AI-generated");
});

test("the footer gives contact routes and plain company details", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator("footer");
  await expect(footer.getByRole("link", { name: "Book a discovery call" })).toHaveAttribute("href", /^mailto:/);
  await expect(footer.getByRole("link", { name: "hello@ameliora.co.uk" })).toHaveCount(1);
  await expect(footer).toContainText("Based in the UK, working to UK GDPR.");
});

test("results stay hidden until real figures are supplied", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#results")).toHaveCount(0);
  await expect(page.locator("a[href='#results']")).toHaveCount(0);
});

test("the page never scrolls sideways", async ({ page }) => {
  await page.goto("/");
  await revealAll(page);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test.describe("content without motion", () => {
  test("reduced motion keeps every section readable and every step shown", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    for (const id of ["approach", "process", "commitments", "book"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect(page.locator(`#${id} h2`)).toHaveCSS("opacity", "1");
    }
    await expect(page.locator("#process > .scene-stage")).toHaveCSS("position", "relative");
    await expect(page.locator("#process .process-photo")).toBeVisible();
    const colours = await page.locator("#process [data-step] h3").evaluateAll((hs) => hs.map((h) => getComputedStyle(h).color));
    for (const c of colours) expect(c).toBe("rgb(17, 18, 20)");
    await context.close();
  });

  test("everything is visible with JavaScript off", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");
    const hidden = await page.locator("[data-reveal]").evaluateAll(
      (els) => els.filter((el) => getComputedStyle(el).opacity !== "1").length,
    );
    expect(hidden).toBe(0);
    await expect(page.locator("#process [data-step]")).toHaveCount(4);
    await expect(page.locator(".hero-photo img")).toBeVisible();
    await context.close();
  });
});

test("mobile booking bar appears after the hero and leaves before the close", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "phone-only pattern");
  await page.goto("/");
  const bar = page.locator("[data-mobile-cta]");
  await expect(bar).not.toHaveAttribute("data-show", "");
  await page.locator("#approach").scrollIntoViewIfNeeded();
  await expect(bar).toHaveAttribute("data-show", "");
  await expect(page.locator(".nav .btn")).toHaveCSS("opacity", "0");
  await page.locator("#book h2").scrollIntoViewIfNeeded();
  await expect(bar).not.toHaveAttribute("data-show", "");
});

test.describe("the scroll scene", () => {
  test("is the only pinned section, and it is how we work", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".scene.is-live")).toHaveCount(1);
    await expect(page.locator("#process")).toHaveClass(/is-live/);
  });

  test("how we work holds while the scroll walks through the steps", async ({ page }) => {
    await page.goto("/");
    const scene = page.locator("#process");
    const on = scene.locator("[data-step][data-on]");
    await expect(scene).toHaveAttribute("data-driven", "");

    await scrollScene(page, "process", 0);
    await expect(on).toHaveCount(1);

    await scrollScene(page, "process", 0.5);
    await expect(on).toHaveCount(3);
    await expect(scene.locator("h2")).toBeInViewport();
    await expect(scene.locator(".steps")).toBeInViewport({ ratio: 1 });

    await scrollScene(page, "process", 0.99);
    await expect(on).toHaveCount(4);
    await expect(scene).toHaveAttribute("data-end", "");

    await page.locator("#commitments h2").scrollIntoViewIfNeeded();
    await expect(scene.locator("h2")).not.toBeInViewport();
  });

  test("frames of the live scene for review", async ({ page }, info) => {
    await page.goto("/");
    await loadAllPhotos(page);
    for (const p of [0, 0.33, 0.66, 0.99]) {
      await scrollScene(page, "process", p);
      await page.screenshot({ path: `test-results/scenes/${info.project.name}-process-${Math.round(p * 100)}.png` });
    }
  });
});

test("the page sits on one continuous background", async ({ page }) => {
  await page.goto("/");
  const backgrounds = await page.evaluate(() =>
    [...document.querySelectorAll("main > section, footer")].map((el) => getComputedStyle(el).backgroundColor),
  );
  for (const bg of backgrounds) expect(["rgba(0, 0, 0, 0)", "rgb(255, 255, 255)"]).toContain(bg);
  // No decorative layer behind the page.
  const before = await page.evaluate(() => getComputedStyle(document.body, "::before").content);
  expect(["none", "normal"]).toContain(before);
});

test("no serious or critical accessibility violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await revealAll(page);
  await page.waitForTimeout(400);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
});

test("full-page screenshot for review", async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await revealAll(page);
  await loadAllPhotos(page);
  await page.waitForTimeout(400);
  await page.screenshot({ path: `test-results/screens/${info.project.name}.png`, fullPage: true });
});
