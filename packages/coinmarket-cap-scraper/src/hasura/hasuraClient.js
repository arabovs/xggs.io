const {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
} = require("@apollo/client");
const fetch = require("isomorphic-fetch");
const { WebSocketLink } = require("@apollo/client/link/ws");
const { getMainDefinition } = require("@apollo/client/utilities");
const isNode = require("is-node");
const ws = require("ws");

const wsLink = new WebSocketLink({
  uri: "wss://finance-compare.hasura.app/v1/graphql",

  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret":
          "wC4WTW5WuQCjGY9sNMmCba3ad7YT7QvHtPenANSq2xqDva2rGWpicwqIIcJHdYQ4",
      },
    },
  },
  webSocketImpl: isNode ? ws : null,
});

const httpLink = createHttpLink({
  uri: "https://finance-compare.hasura.app/v1/graphql",
  fetch,
  headers: {
    "x-hasura-admin-secret":
      "wC4WTW5WuQCjGY9sNMmCba3ad7YT7QvHtPenANSq2xqDva2rGWpicwqIIcJHdYQ4",
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
module.exports = client;
