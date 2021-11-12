//modulo para o path 
const path = require('path');
//modulo para o file
const fs = require('fs');
//compiler
const solc = require('solc');

//path
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
//file
const source = fs.readFileSync(inboxPath, 'utf8');

//Perguntar pro Henrique o que significa
var input = {
  language: 'Solidity',
  sources: {
      'Inbox.sol' : {
          content: source
      }
  },
  settings: {
      outputSelection: {
          '*': {
              '*': [ '*']
          }
      }
  }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

exports.abi = output.contracts['Inbox.sol']['Inbox'].abi;
exports.bytecode = output.contracts['Inbox.sol']['Inbox'].evm.bytecode.object;

