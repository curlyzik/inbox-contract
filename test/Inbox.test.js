// contract test code will go here
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { interface, bytecode } = require("../compile");

const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts;
let inbox;
const INITIAL_STRING = "Hi there!";

beforeEach(async () => {
  // get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.ok(message, INITIAL_STRING);
  });

  it("has updated message", async () => {
    await inbox.methods.setMessage("Nigga Updated this shit").send({
      from: accounts[0],
      gas: "1000000",
    });

    const message = await inbox.methods.message().call();
    assert.ok(message, "Nigga Updated this shit");
  });
});
