// contract test code will go here
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { interface, bytecode } = require("../compile");

const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts;

beforeEach(async () => {
  // get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // use one of those accounts to deploy the contract
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    console.log(interface);
  });
});
