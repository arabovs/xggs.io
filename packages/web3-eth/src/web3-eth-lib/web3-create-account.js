var Web3 = require("web3");
var url = "https://mainnet.infura.io/v3/0b2de5cd7452461080b641565efed8ef";
var web3 = new Web3(url);

console.log(web3.eth.accounts.create());
