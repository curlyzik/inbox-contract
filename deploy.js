// deploy code will go here
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");

const provider = new HDWalletProvider(
  "situate noodle hawk congress fiber cage area mountain avoid alarm despair citizen",
  "https://ropsten.infura.io/v3/86a788538f994dff800ffa64ff89c33a"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: ["Deploy first contract!"],
    })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deployed to:", result.options.address);
  provider.engine.stop();
};

deploy();