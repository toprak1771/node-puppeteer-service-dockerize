const puppeteer = require("puppeteer");

class PuppeteerService {
  async getNewsWordCounts(url) {
    let articlesAndCount = [];
    if (!url) {
      console.error("Lütfen geçerli bir haber sitesi URL'si girin.");
      return;
    }

    const browser = await puppeteer.launch({
      headless: true,
      executablePath: `/usr/bin/google-chrome`,
      args: [
        `--no-sandbox`,
        `--headless`,
        `--disable-gpu`,
        `--disable-dev-shm-usage`,
      ],
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url,{ waitUntil: 'load', timeout: 0 });
    await page.waitForSelector("h2", { visible: true });

    const articles = await page.$$eval("h2", (elements) => {
      return elements.map((el) => el.textContent.trim());
    });

    for (let i = 0; i < articles.length; i++) {
      const elements = await page.$$("h2");
      //console.log("elements:",elements);
      if (elements[i]) {
        const linkElement = await elements[i].$("a"); // h2 içindeki <a> etiketini kontrol et
        if (linkElement) {
          const href = await linkElement.evaluate((el) => el.href);
          await page.goto(href, { waitUntil: "domcontentloaded" });
        } else {
          try {
            await elements[i].click();
          } catch (error) {
            console.warn(`Başlık ${i + 1}: Tıklanabilir değil, atlanıyor.`);
            continue;
          }
        }
        //await elements[i].click();
        try {
          await page.waitForSelector("article", { timeout: 5000 });
          const fullContentCount = (
            await page.$eval("article", (el) => el.textContent.trim())
          ).split(" ").length;
          //console.log(`Başlık ${i + 1}:`, fullContentCount);
          articlesAndCount.push({
            title: articles[i],
            word_count: fullContentCount,
          });
        } catch (error) {
          console.log(`Başlık ${i + 1}: İçerik bulunamadı`);
        }

        await page.goto(url, { waitUntil: "domcontentloaded" });
        await page.waitForSelector("h2", { visible: true });
      }
    }
    await browser.close();
    return articlesAndCount;
  }
}

module.exports = PuppeteerService;
