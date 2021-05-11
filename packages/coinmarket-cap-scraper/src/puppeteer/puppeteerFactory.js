const { default: gql } = require("graphql-tag");
const puppeteer = require("puppeteer");
const {
  updateCoinPrice,
  updateIndexPrice,
  getCryptoSelector,
} = require("../../../hasura/src/hasura/hasuraHelper");

const BTC_CODE = "BTC";

const cleanupPrice = (string) => {
  if (string.includes("$")) {
    return parseFloat(string.replace(",", "").replace("$", ""));
  }
  return parseFloat(string.replace(",", ""));
};

const getPageData = async (browser, security_code, source) => {
  const page = await browser.newPage();
  const { puppeteer_crypto_selectors } = await getCryptoSelector({
    security_code,
    source,
  });
  console.log(puppeteer_crypto_selectors);
  await page.goto(puppeteer_crypto_selectors[0].url);

  const data = await page.evaluate(
    (selector) => document.querySelector(selector).innerText,
    puppeteer_crypto_selectors[0].selector
  );
  await page.close();
  return cleanupPrice(data);
};

(async () => {
  const browser = await puppeteer.launch();
  try {
    const btcPrice = await getPageData(browser, "BTC", "CMC");
    const ethPrice = await getPageData(browser, "ETH", "CMC");
    const ftse100Price = await getPageData(browser, "FTSE100", "LSE");

    const ftse100ToBTC = ftse100Price / btcPrice;
    const ftse100ToETH = ftse100Price / ethPrice;
    console.log(`BTC price is ${btcPrice}`);
    console.log(`ETH price is ${ethPrice}`);
    console.log(`FTSE100 price is ${ftse100Price}`);
    console.log(`FTSE100 price is ${ftse100ToBTC}`);
    console.log(`FTSE100 price is ${ftse100ToETH}`);

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

    await updateIndexPrice({
      crypto_base_code: "BTC",
      crypto_index_price: ftse100ToBTC,
      index_code: "FTSE100",
      index_price: ftse100Price,
      source: "LSE",
    });

    await updateIndexPrice({
      crypto_base_code: "ETH",
      crypto_index_price: ftse100ToETH,
      index_code: "FTSE100",
      index_price: ftse100Price,
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
