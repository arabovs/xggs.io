const client = require("../hasura/hasuraClient");
const { default: gql } = require("graphql-tag");

const updateCoinPrice = async ({ value, crypto_code, crypto_name, source }) => {
  await client.mutate({
    mutation: gql`
      mutation inserBTCPrice($objects: [crypto_price_updates_insert_input!]!) {
        insert_crypto_price_updates(objects: $objects) {
          affected_rows
        }
      }
    `,
    variables: {
      objects: [
        {
          value,
          crypto_code,
          crypto_name,
          source,
        },
      ],
    },
  });
  console.log("BTC Price updated!");
};

module.exports = updateCoinPrice;
