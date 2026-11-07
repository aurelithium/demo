import { chromium } from "playwright";

const BASE = "http://localhost:4173/index.html";
const routes = [
  ["/", "home"],
  ["/services", "services"],
  ["/about", "about"],
  ["/documents", "documents"],
  ["/contacts", "contacts"],
  ["/login", "login"],
  ["/register", "register"],
  ["/cabinet", "cabinet"],
  ["/privacy", "privacy"],
  ["/terms", "terms"],
  ["/consent", "consent"],
  ["/cookies", "cookies"],
];

const browser = await chromium.launch();
const problems = [];

async function newPage(width, height) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  page.on("console", (msg) => {
    if (msg.type() === "error") problems.push(`[console] ${page.url()} :: ${msg.text()}`);
  });
  page.on("pageerror", (err) => problems.push(`[pageerror] ${page.url()} :: ${err.message}`));
  return { ctx, page };
}

// --- desktop ---
for (const [route, name] of routes) {
  const { ctx, page } = await newPage(1440, 900);
  await page.goto(BASE + `#${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  await page.screenshot({ path: `/tmp/shots/d-${name}.png`, fullPage: true });
  await ctx.close();
}

// --- mobile ---
for (const [route, name] of [["/", "home"], ["/services", "services"], ["/cabinet", "cabinet"], ["/login", "login"]]) {
  const { ctx, page } = await newPage(390, 844);
  await page.goto(BASE + `#${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  await page.screenshot({ path: `/tmp/shots/m-${name}.png`, fullPage: true });
  await ctx.close();
}

// --- cookie banner + modal ---
{
  const { ctx, page } = await newPage(1440, 900);
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1800);
  await page.screenshot({ path: "/tmp/shots/d-cookie.png" });
  await page.getByRole("button", { name: "Принять" }).click();
  await page.waitForTimeout(700);
  await page.getByRole("button", { name: "Обсудить проект" }).first().click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: "/tmp/shots/d-modal.png" });
  await ctx.close();
}

// --- register flow ---
{
  const { ctx, page } = await newPage(1440, 900);
  await page.goto(BASE + "#/register", { waitUntil: "networkidle" });
  await page.fill('input[autocomplete="name"]', "Иван Тестов");
  await page.fill('input[autocomplete="email"]', "ivan@example.ru");
  await page.fill('input[autocomplete="tel"]', "9991234567");
  await page.fill('input[autocomplete="new-password"]', "secret123");
  const boxes = await page.locator('input[type="checkbox"]');
  await boxes.nth(0).check();
  await page.getByRole("button", { name: "Зарегистрироваться" }).click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "/tmp/shots/d-cabinet-logged.png", fullPage: true });
  await ctx.close();
}

// --- 404 ---
{
  const { ctx, page } = await newPage(1440, 900);
  await page.goto(BASE + "#/unknown", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: "/tmp/shots/d-404.png" });
  await ctx.close();
}

await browser.close();
console.log(problems.length ? "PROBLEMS:\n" + problems.join("\n") : "NO CONSOLE ERRORS");
