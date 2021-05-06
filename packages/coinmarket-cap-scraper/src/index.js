const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://coinmarketcap.com/");

  const coinValue = await page.evaluate((sel) => {
    return document.querySelector(sel).innerText.split("$")[1].replace(",", "");
  }, "#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div > div.tableWrapper___3utdq.cmc-table-homepage-wrapper___22rL4 > table > tbody > tr:nth-child(1) > td:nth-child(4) > div > a");
  const coinName = await page.evaluate((sel) => {
    return document.querySelector(sel).innerText;
  }, "#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div > div.tableWrapper___3utdq.cmc-table-homepage-wrapper___22rL4 > table > tbody > tr:nth-child(1) > td:nth-child(3) > div > a > div > div > p");
  const coinCode = await page.evaluate((sel) => {
    return document.querySelector(sel).innerText;
  }, "#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div > div.tableWrapper___3utdq.cmc-table-homepage-wrapper___22rL4 > table > tbody > tr:nth-child(1) > td:nth-child(3) > div > a > div > div > div > p");

  console.log({ coinName, coinValue, coinCode });

  const page1 = await browser.newPage();
  await page1.goto("http://www.isinlei.com/ISIN/Prefix/recent");
  //await page.screenshot({ path: "example.png" });

  const isinName = await page1.evaluate((sel) => {
    return document.querySelector(sel).innerText;
  }, "body > div > div.siteContent > table > tbody > tr:nth-child(2) > td:nth-child(2) > a");
  const isinCode = await page1.evaluate((sel) => {
    return document.querySelector(sel).innerText;
  }, "body > div > div.siteContent > table > tbody > tr:nth-child(10) > td:nth-child(1)");
  const isinFX = await page1.evaluate((sel) => {
    return document.querySelector(sel).innerText;
  }, "body > div > div.siteContent > table > tbody > tr:nth-child(3) > td:nth-child(4)");

  console.log({ isinName, isinCode, isinFX });

  const page2 = await browser.newPage();
  await page2.goto(
    "https://www.xe.com/currencyconverter/convert/?Amount=1&From=RUB&To=USD"
  );
  //await page.screenshot({ path: "example.png" });

  const currencyFXtoUSD = await page2.evaluate((sel) => {
    return document.querySelector(sel).innerText;
  }, "#__next > div:nth-child(2) > div.fluid-container__BaseFluidContainer-qoidzu-0.gJBOzk > section > div:nth-child(2) > div > main > form > div:nth-child(2) > div.result__Repulsor-sc-1bsijpp-4.dZGBTm > div:nth-child(1) > div.unit-rates___StyledDiv-sc-1dk593y-0.dEqdnx > p");

  console.log({ currencyFXtoUSD });

  const currencyFxDetails = currencyFXtoUSD.split(" = ")[1].split(" ")[0];

  const BTCtoRUB = parseFloat(currencyFxDetails) * parseFloat(coinValue);
  console.log(parseFloat(currencyFxDetails));
  console.log(parseFloat(coinValue));
  console.log(`The value of BTC in RUB is: ${BTCtoRUB}`);

  const page3 = await browser.newPage();
  await page3.goto("http://www.google.com/search?q=check+ftse100");

  const indexPrice = await page3.evaluate((sel) => {
    return document.querySelector(sel).innerText;
  }, "#knowledge-finance-wholepage__entity-summary > div > g-card-section > div > g-card-section > div.wGt0Bc > div:nth-child(1) > span:nth-child(1) > span > span");

  console.log(cleanupPrice(indexPrice));
  console.log(cleanupPrice(indexPrice) / cleanupPrice(coinValue));
  https: await browser.close();
})();

const cleanupPrice = (string) => {
  return parseFloat(string.replace(",", ""));
};
