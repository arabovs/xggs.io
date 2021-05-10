const { default: gql } = require("graphql-tag");
const puppeteer = require("puppeteer");
const updateCoinPrice = require("../../../hasura/src/hasura/hasuraHelper");

const URL_COINMARKETCAP = "https://coinmarketcap.com/";
const URL_XE =
  "https://www.xe.com/currencyconverter/convert/?Amount=1&From=RUB&To=USD";
const URL_GOOGLE = "http://www.google.com/search?q=check+ftse100";
const URL_LSE_FTSE100 =
  "https://www.londonstockexchange.com/indices/ftse-100?lang=en";

const SELECTOR_BTC =
  "#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div > div.tableWrapper___3utdq.cmc-table-homepage-wrapper___22rL4 > table > tbody > tr:nth-child(1) > td:nth-child(4) > div > a";
const SELECTOR_ETH =
  "#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div > div.tableWrapper___3utdq.cmc-table-homepage-wrapper___22rL4 > table > tbody > tr:nth-child(2) > td:nth-child(4) > div > a";
const SELECTOR_XE =
  "#__next > div:nth-child(2) > div.fluid-container__BaseFluidContainer-qoidzu-0.gJBOzk > section > div:nth-child(2) > div > main > form > div:nth-child(2) > div.result__Repulsor-sc-1bsijpp-4.dZGBTm > div:nth-child(1) > div.unit-rates___StyledDiv-sc-1dk593y-0.dEqdnx > p";
const SELECTOR_GOOGLE =
  "#knowledge-finance-wholepage__entity-summary > div > g-card-section > div > g-card-section > div.wGt0Bc > div:nth-child(1) > span:nth-child(1) > span > span";
const SELECTOR_FTSE1000_LSE =
  "#ftse-ticker > div > section > div > div.wrapper.flex-container.ticker-header > span.ticker-price > div > span.last-price.larger-font-size.bold-font-weight > span";
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
  await page.close();
  return cleanupPrice(data);
};

(async () => {
  const browser = await puppeteer.launch();
  try {
    const btcPrice = await getPageData(
      browser,
      URL_COINMARKETCAP,
      SELECTOR_BTC
    );

    const ethPrice = await getPageData(
      browser,
      URL_COINMARKETCAP,
      SELECTOR_ETH
    );

    const ftse1000Price = await getPageData(
      browser,
      URL_LSE_FTSE100,
      SELECTOR_FTSE1000_LSE
    );

    console.log(`BTC price is ${btcPrice}`);
    console.log(`ETH price is ${ethPrice}`);
    console.log(`FTSE100 price is ${ftse1000Price}`);

    await updateCoinPrice({
      value: btcPrice,
      crypto_code: "BTC",
      crypto_name: "Bitcoin",
      source: "CC",
    });

    await updateCoinPrice({
      value: ethPrice,
      crypto_code: "ETH",
      crypto_name: "Ethereum",
      source: "CC",
    });

    await updateCoinPrice({
      value: ftse1000Price,
      crypto_code: "FTSE100",
      crypto_name: "FTSE100",
      source: "LSE",
    });
  } catch (e) {
    console.log(e);
    await browser.close();
  } finally {
    await browser.close();
  }
  process.exit(0);
})();
