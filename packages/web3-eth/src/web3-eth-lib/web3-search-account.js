var Web3 = require("web3");
var url = "https://mainnet.infura.io/v3/0b2de5cd7452461080b641565efed8ef";
var web3 = new Web3(url);
var address = "0x00000000219ab540356cBB839Cbe05303d7705Fa";

web3.eth.getBalance(address, (err, balance) => {
  console.log(web3.utils.fromWei(balance, "ether"));
});
