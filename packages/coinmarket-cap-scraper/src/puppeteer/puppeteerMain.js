const { default: gql } = require("graphql-tag");
const puppeteer = require("puppeteer");
const {
  updateCryptoPrice,
  updateIndexPrice,
  getCryptoSelector,
} = require("../../../hasura/src/hasura/hasuraHelper");

const CRYPTO_CODES = ["BTC", "ETH"];
const CRYPTO_SOURCE = ["CMC"];
const INDEX_CODES = ["FTSE100", "FTSE250", "FTSE350", "FTSEALL"];
const INDEX_SOURCE = ["LSE"];

(async () => {
  const browser = await puppeteer.launch();
  try {
    const cryptoPricing = await getCryptoPagesPricingData(browser);
    await updateCryptoPrice({ objects: cryptoPricing });
    const indexPricing = await getIndexPagesPricingData(browser);
    await updateIndexPrice({ objects: indexPricing });
  } catch (e) {
    console.log(e);
    await browser.close();
  } finally {
    await browser.close();
  }
  process.exit(0);
})();

const getMetalPricingData = async (browser) => {
  console.log("Fetching Metal Pricing");
  const metalPricing = [];
  for (var index_code of INDEX_CODES) {
    for (var source of INDEX_SOURCE) {
      const result = await getPageData(browser, metal_code, source);
      metalPricing.push({
        metal_price: result,
        metal_code,
        source,
      });
    }
  }
  printLog(indexPricing);
  return indexPricing;
};

const getIndexPagesPricingData = async (browser) => {
  console.log("Fetching Index Pricing");
  const indexPricing = [];
  for (var index_code of INDEX_CODES) {
    for (var source of INDEX_SOURCE) {
      const result = await getPageData(browser, index_code, source);
      indexPricing.push({
        index_price: result,
        index_code,
        source,
      });
    }
  }
  printLog(indexPricing);
  return indexPricing;
};

const getCryptoPagesPricingData = async (browser) => {
  console.log("Fetching Crypto Pricing");
  const cryptoPricing = [];
  for (var crypto_code of CRYPTO_CODES) {
    for (var source of CRYPTO_SOURCE) {
      const result = await getPageData(browser, crypto_code, source);
      cryptoPricing.push({
        crypto_price: result,
        crypto_code,
        source,
      });
    }
  }
  printLog(cryptoPricing);
  return cryptoPricing;
};

const getPageData = async (browser, security_code, source) => {
  const page = await browser.newPage();
  const { puppeteer_crypto_selectors } = await getCryptoSelector({
    security_code,
    source,
  });
  await page.goto(puppeteer_crypto_selectors[0].url);

  const data = await page.evaluate(
    (selector) => document.querySelector(selector).innerText,
    puppeteer_crypto_selectors[0].selector
  );
  await page.close();
  return cleanupPrice(data);
};

//Helpers
const printLog = async (array) => {
  for (var x of array) {
    console.log(x);
  }
};

const cleanupPrice = (string) => {
  if (string.includes("$")) {
    return parseFloat(string.replace(",", "").replace("$", ""));
  }
  return parseFloat(string.replace(",", ""));
};
