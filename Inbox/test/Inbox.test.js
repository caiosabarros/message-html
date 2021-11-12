const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //This is a constructor of the web3 library.

//now, we create an instance of the Web3 library (web3). Also, the 
//way we have to connect the web3 to any newtork is through a provider.
//The bytecode is deployed. The web3 is the way for the contract to talk to Javascript and
//any language so that we have programmatic access to the contract
const web3 = new Web3(ganache.provider());

const {abi, bytecode} = require("../compile");

//Testing with Mocha if we can deploy, modify a contract and make assertions with it.
//Since we'll follow the structure as shown in video 48, we'll deploy a contract
//everytime we make a change on it, so deploying a contract is a common setup.
//Also, we declare the accounts variable as usable for all the scopes.
let accounts;
let inbox;
let INITIAL_MESSAGE = "Hi there!";

//console.log(abi);

beforeEach(async ()=>{
  //async and await are used because all the functions in web3 are async.
  //web3 is the library, eth the module, getAccounts() the function

  //getting the accounts
  accounts = await web3.eth.getAccounts();

  //Deploying the contract
  //inbox is the contract. Await is used since web3 functions or modules
  //are async. THe abi is already parsed in the compile.js document. So, we
  //create a contract out of the abi. We pass in the arguments and bytecode data
  //for deployment using the deploy function. THe functions that actually deploys
  //this is the send (send a transaction, since contract creation is a transaction)
  //, using the fist accound a paying a gas of...
  inbox = await new web3.eth.Contract(abi)
    .deploy({data: bytecode, arguments: [INITIAL_MESSAGE]})
    .send({from:accounts[0], gas: "1000000"});

});

describe("Testing", ()=>{
  it("Retrieving accounts", ()=>{
    console.log(accounts);
  });

  it("Exihibiting the contract", ()=>{
    console.log(inbox); 
  });

  it("Contract deployed", ()=>{
    //The options comes up from console loggin the contract
    //and identifying that the address is under options object.
    //Ok tests if arguments is truthy: not null or undefined.
    assert.ok(inbox.options.address)
  });

  it("Has a default message", async ()=>{
    //Even though we get an apparently "immediate" when calling (.call()) a value from a contract,
    //this process is still async, even though we can't perceive it.
    //The .call() message has its alternative: send() message. The send() alters
    //what is in the blockchain by modifying the contract.
    const message = await inbox.methods.message().call();
    assert.equal(INITIAL_MESSAGE, message)
  });

  it("Can modify the message",async ()=>{
    //I optionally wantd to retrieve the tx_hash to see how it
    //looks like. But its not necessarily. The line would work anyways.
    //If not, an error would be thrown, making the test to fail.
    tx_hash = await inbox.methods.setMessage("Caio is awesome!").send({from:accounts[0]});
    const message = await inbox.methods.message().call();
    assert.equal(message, "Caio is awesome!");
    console.log(tx_hash);
  });

});