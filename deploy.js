// Load environment variables.
//require("dotenv").config();

ACCOUNT_MNEMONIC="spatial rival desert since spend monitor dose brain today creek ranch time"
RINKEBY_ENDPOINT="https://rinkeby.infura.io/v3/afb21d6976ad4b7fa5c283595023a53f"

//const HDWalletProvider = require("@truffle/hdwallet-provider");
import HDWalletProvider from './node_modules/@truffle/hdwallet-provider';
//const Web3 = require('web3');
import Web3 from './node_modules/web3';
const { abi, bytecode } = require("./Inbox/compile");
//const mnemonicPhrase = process.env.ACCOUNT_MNEMONIC;
//const network = process.env.RINKEBY_ENDPOINT;
const mnemonicPhrase = ACCOUNT_MNEMONIC;
const network = RINKEBY_ENDPOINT;
const contractAddress = "";
const result = "";

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  providerOrUrl: network
});

const web3 = new Web3(provider);
const message = "Hi there!";

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  result = await new web3.eth.Contract(abi)
    .deploy({ data:bytecode, arguments: [message] })
    .send({ gas: '1000000', from: accounts[0] });

  //salvei address
  contractAddress = result.options.address;  
  console.log("Contract deployed to", result.options.address);
  //provider.engine.stop();
};

deploy();

//CONNECTING TO METAMASK
// web3 provider with fallback for old version
window.addEventListener('load', async () => {
  // New web3 provider
  if (True) {
      window.web3 = new Web3(provider);
      try {
          // ask user for permission
          await provider.enable();
          // user approved permission
      } catch (error) {
          // user rejected permission
          console.log('user rejected permission');
      }
  }
  // Old web3 provider
  else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
      // no need to ask for permission
  }
  // No web3 provider
  else {
      console.log('No web3 provider detected');
  }
});

// Accounts
var account;

web3.eth.getAccounts(function(err, accounts) {
  if (err != null) {
    alert("Error retrieving accounts.");
    return;
  }
  if (accounts.length == 0) {
    alert("No account found! Make sure the Ethereum client is configured properly.");
    return;
  }
  account = accounts[0];
  console.log('Account: ' + account);
  web3.eth.defaultAccount = account;
});

var contract = new web3.eth.Contract(abi, contractAddress);
//Smart contract functions
async function inboxSetMessage() {
  newMessage = $("#newInfo").val();
  await contract.methods.setMessage(newMessage).send( {from: account});
  $("#newInfo").val('');
}

async function inboxGetMessage() {
  await contract.methods.message().call();
    document.getElementById('lastInfo').innerHTML = info;
};    
