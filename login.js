const fs = require("fs");
const puppeteer = require("puppeteer");

const email = "EMAIL";
const password = "PASSWORD";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation({
    waitUntil: "networkidle0",
  });

  await page.goto("https://www.facebook.com/");

  await page.waitForSelector("#email");
  await page.type("#email", email);
  await page.type("#pass", password);
  await page.click('button[name="login"]');

  await page.waitForSelector("div[role=feed]");

  cookies = await page.cookies();
  cookies = cookies.map(({ name: key, ...rest }) => ({ key, ...rest }));
  fs.writeFileSync("appstate.json", JSON.stringify(cookies));

  await browser.close();
})();
