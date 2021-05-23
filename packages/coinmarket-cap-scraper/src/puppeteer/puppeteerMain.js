const { default: gql } = require("graphql-tag");
const puppeteer = require("puppeteer");
const {
  updateCryptoPrice,
  updateIndexPrice,
  getCryptoSelector,
} = require("../../../hasura/src/hasura/hasuraHelper");


const CRYPTO_CODES = ["BTC"];
const CRYPTO_SOURCE = ["CMC"];
const INDEX_CODES = ["FTSE100", "FTSE250", "FTSE350", "FTSEALL"];
const INDEX_SOURCE = ["LSE"];

(async () => {
  const browser = await puppeteer.launch();
  try {
    const cryptoPricing = await getCryptoPagesPricingData(browser);
    const indexPricing = await getIndexPagesPricingData(browser);

    for (let crypto of cryptoPricing) {
      const btc_price = cryptoPricing[0].crypto_price;
      indexPricing.map(
        (item) => (item.index_btc_conversion = item.index_price / btc_price)
      );
    }

    await updateCryptoPrice({ objects: cryptoPricing });
    await updateIndexPrice({ objects: indexPricing });
  } catch (e) {
    console.log(e);
    await browser.close();
  } finally {
    await browser.close();
  }
  process.exit(0);
})();

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
  console.log(
    getCryptoSelector({
      security_code,
      source,
    })
  );
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

// 0. use regex to fetch the URL selectors.
//  a) failure at different points
//  b)

// 1. PriceComparator

// add flag when finished to notify subscriber that the data has finished loading.
// pass it to next process to compare the values between what we donwloaded and what is in the database and only save the
// updates. Then send an update to the subscriber which will check the flag and update the Objects.
// Timestamp. And then insert

// receive
// select frm db
// compare
// save required

// 2. PriceNotifier one-to-many

// notify all subscribers of the change.

// 3. notify the subscribers, subscribers must implement these methods. Each subscriber must implement this foo

// 4. Feed data to UI

// Remote - WSL
// ms-vscode-remote.remote-wsl
