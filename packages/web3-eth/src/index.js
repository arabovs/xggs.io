var express = require("express");
const { createETHAccount } = require("../src/web3-eth-lib/web3-create-account");
var app = express();
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

var {
  address,
  privateKey,
  signTransaction,
  sign,
  encrypt,
} = createETHAccount();

app.get("/newaddress", (req, res, next) => {
  res.json([address, privateKey]);
});
