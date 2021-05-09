const { default: gql } = require("graphql-tag");
const puppeteer = require("puppeteer");
const updateCoinPrice = require("../hasura/hasuraHelper");

const URL_COINMARKETCAP = "https://coinmarketcap.com/";
const URL_XE =
  "https://www.xe.com/currencyconverter/convert/?Amount=1&From=RUB&To=USD";
const URL_GOOGLE = "http://www.google.com/search?q=check+ftse100";

const SELECTOR_BTC =
  "#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div > div.tableWrapper___3utdq.cmc-table-homepage-wrapper___22rL4 > table > tbody > tr:nth-child(1) > td:nth-child(4) > div > a";
const SELECTOR_ETH =
  "#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div > div.tableWrapper___3utdq.cmc-table-homepage-wrapper___22rL4 > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > a";
const SELECTOR_XE =
  "#__next > div:nth-child(2) > div.fluid-container__BaseFluidContainer-qoidzu-0.gJBOzk > section > div:nth-child(2) > div > main > form > div:nth-child(2) > div.result__Repulsor-sc-1bsijpp-4.dZGBTm > div:nth-child(1) > div.unit-rates___StyledDiv-sc-1dk593y-0.dEqdnx > p";
const SELECTOR_GOOGLE =
  "#knowledge-finance-wholepage__entity-summary > div > g-card-section > div > g-card-section > div.wGt0Bc > div:nth-child(1) > span:nth-child(1) > span > span";

const BTC_CODE = "BTC";

const cleanupPrice = (string) => {
  if (string.includes("$")) {
    return parseFloat(string.replace(",", "").replace("$", ""));
  }
  return parseFloat(string.replace(",", ""));
};

const getPageData = async (browser, url, selector) => {
  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.evaluate(
    (selector) => document.querySelector(selector).innerText,
    selector
  );
  return cleanupPrice(data);
};

(async () => {
  const browser = await puppeteer.launch();
  const btcPrice = await getPageData(browser, URL_COINMARKETCAP, SELECTOR_BTC);
  await updateCoinPrice({
    value: btcPrice,
    crypto_code: "BTC",
    crypto_name: "Bitcoin",
    source: "CC",
  });
  process.exit(0);
  await browser.close();
})();