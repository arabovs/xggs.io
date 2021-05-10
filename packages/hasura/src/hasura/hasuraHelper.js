const client = require("./hasuraClient");
const { default: gql } = require("graphql-tag");

const updateCoinPrice = async ({ value, crypto_code, crypto_name, source }) => {
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
  console.log("Inserted!");
};

const updateIndexPrice = async ({
  crypto_base_code,
  crypto_index_price,
  index_code,
  index_price,
  source,
}) => {
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
      objects: [
        {
          crypto_base_code,
          crypto_index_price,
          index_code,
          index_price,
          source,
        },
      ],
    },
  });
  console.log("Inserted!");
};

module.exports = { updateCoinPrice, updateIndexPrice };
