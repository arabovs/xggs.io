const client = require("./hasuraClient");
const { default: gql } = require("graphql-tag");

const updateCryptoPrice = async ({ objects }) => {
  await client.mutate({
    mutation: gql`
      mutation insertCryptoPrice(
        $objects: [crypto_price_updates_insert_input!]!
      ) {
        insert_crypto_price_updates(objects: $objects) {
          affected_rows
        }
      }
    `,
    variables: {
      objects,
    },
  });
  console.log("Inserted: ", objects.length);
};

const updateIndexPrice = async ({ objects }) => {
  await client.mutate({
    mutation: gql`
      mutation insertIndexPrice(
        $objects: [index_price_updates_insert_input!]!
      ) {
        insert_index_price_updates(objects: $objects) {
          affected_rows
        }
      }
    `,
    variables: {
      objects,
    },
  });
  console.log("Inserted: ", objects.length);
};

const getCryptoSelector = async ({ source, security_code }) => {
  const { data } = await client.query({
    query: gql`
      query MyQuery($source: String, $security_code: String) {
        puppeteer_crypto_selectors(
          where: {
            _and: { source: { _eq: $source } }
            security_code: { _eq: $security_code }
          }
        ) {
          selector
          url
        }
      }
    `,
    variables: {
      source,
      security_code,
    },
  });
  return data;
};

const getCryptoLatestPrice = async ({ source, crypto_code }) => {
  const { data } = await client.query({
    query: gql`
      query MyQuery($source: String, $crypto_code: String) {
        puppeteer_crypto_selectors(
          where: {
            _and: { source: { _eq: $source } }
            security_code: { _eq: $crypto_code }
          }
        ) {
          selector
          url
        }
      }
    `,
    variables: {
      source,
      crypto_code,
    },
  });
  return data;
};

const getIndexPricesLatestSubscription = async ({ source, security_code }) => {
  const { data, loading, error } = useSubscription(
    gql`
      subscription CryptoPriceSubscription($crypto_code: String!) {
        crypto_price_updates(
          where: { crypto_code: { _eq: $crypto_code } }
          order_by: { created_at: desc }
          limit: 1
        ) {
          crypto_price
          crypto_code
        }
      }
    `,
    {
      variables: {
        crypto_code: props.crypto_code,
      },
    }
  );
  if (loading) {
    return <Box>Loading</Box>;
  }
  if (error) {
    console.log(error);
    return <Box>Error</Box>;
  }
  console.log(data);
  return (
    <Box>
      {props.crypto_code} : {data.crypto_price_updates[0].crypto_price}
    </Box>
  );
};

module.exports = {
  updateCryptoPrice,
  updateIndexPrice,
  getCryptoSelector,
  getIndexPricesLatestSubscription,
  getCryptoLatestPrice,
};
