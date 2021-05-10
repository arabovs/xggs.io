const { ApolloProvider } = require("@apollo/client");
const React = require("react");
const client = require("./hasuraClient");

const Provider = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

module.exports = Provider;
