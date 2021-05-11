const { default: gql } = require("graphql-tag");
const puppeteer = require("puppeteer");
const {
  updateCoinPrice,
  updateIndexPrice,
  getCryptoSelector,
} = require("../../../hasura/src/hasura/hasuraHelper");

const CRYPTO_CODES = ["BTC", "ETH"];
const CRYPTO_SOURCE = ["CMC"];
const INDEX_CODES = ["FTSE100", "FTSE250"];
const INDEX_SOURCE = ["LSE"];

(async () => {
  const browser = await puppeteer.launch();
  try {
    await getCryptoPagesPricingData(browser);
    await getIndexPagesPricingData(browser);
    /*const ftse100Price = await getPageData(browser, "FTSE100", "LSE");
    const ftse250Price = await getPageData(browser, "FTSE250", "LSE");*/
  } catch (e) {
    console.log(e);
    await browser.close();
  } finally {
    await browser.close();
  }
  process.exit(0);
})();
/**
    const ftse100ToBTC = ftse100Price / btcPrice;
    const ftse100ToETH = ftse100Price / ethPrice;
    const ftse250ToBTC = ftse250Price / btcPrice;
    const ftse250ToETH = ftse250Price / ethPrice;

    console.log(`BTC price is ${btcPrice}`);
    console.log(`ETH price is ${ethPrice}`);
    console.log(`FTSE100 price is ${ftse100Price}`);
    console.log(`FTSE100 price is ${ftse100ToBTC}`);
    console.log(`FTSE100 price is ${ftse100ToETH}`);
    console.log(`FTSE250 price is ${ftse250Price}`);
    console.log(`FTSE250 price is ${ftse250ToBTC}`);
    console.log(`FTSE250 price is ${ftse250ToETH}`);

    await updateCoinPrice({
      objects: [
        {
          value: btcPrice,
          crypto_code: "BTC",
          crypto_name: "Bitcoin",
          source: "CC",
        },
        {
          value: ethPrice,
          crypto_code: "ETH",
          crypto_name: "Ethereum",
          source: "CC",
        },
      ],
    });

    /** TO DO 
    await updateIndexPrice({
      objects: [
        {
          crypto_base_code: "BTC",
          crypto_index_price: ftse100ToBTC,
          index_code: "FTSE100",
          index_price: ftse100Price,
          source: "LSE",
        },
        {
          crypto_base_code: "ETH",
          crypto_index_price: ftse100ToETH,
          index_code: "FTSE100",
          index_price: ftse100Price,
          source: "LSE",
        },
        {
          crypto_base_code: "ETH",
          crypto_index_price: ftse250ToETH,
          index_code: "FTSE250",
          index_price: ftse250Price,
          source: "LSE",
        },
        {
          crypto_base_code: "BTC",
          crypto_index_price: ftse250ToBTC,
          index_code: "FTSE250",
          index_price: ftse250Price,
          source: "LSE",
        },
      ],
    });
  } catch (e) {
    console.log(e);
    await browser.close();
  } finally {
    await browser.close();
  }
  process.exit(0);
})();  */

const getIndexPagesPricingData = async (browser) => {
  const indexPricing = [];
  for (var index_code of INDEX_CODES) {
    for (var source of INDEX_SOURCE) {
      const result = await getPageData(browser, index_code, source);
      indexPricing.push({ result, index_code, source });
    }
  }
  printLog(indexPricing);
};

const getCryptoPagesPricingData = async (browser) => {
  const cryptoPricing = [];
  for (var crypto_code of CRYPTO_CODES) {
    for (var source of CRYPTO_SOURCE) {
      const result = await getPageData(browser, crypto_code, source);
      cryptoPricing.push({ result, crypto_code, source });
    }
  }
  printLog(cryptoPricing);
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
