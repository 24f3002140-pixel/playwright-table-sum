const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let grandTotal = 0;

  for (let seed = 7; seed <= 16; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;

    console.log(`Visiting seed ${seed}: ${url}`);

    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForSelector("table");

    const cellTexts = await page.locator("table td").allTextContents();

    let seedTotal = 0;

    for (const text of cellTexts) {
      const matches = text.match(/-?\d+(?:\.\d+)?/g);

      if (matches) {
        for (const value of matches) {
          seedTotal += Number(value);
        }
      }
    }

    console.log(`Seed ${seed} total: ${seedTotal}`);
    grandTotal += seedTotal;
  }

  console.log("=================================");
  console.log(`TOTAL SUM: ${grandTotal}`);
  console.log("=================================");

  await browser.close();
})();
