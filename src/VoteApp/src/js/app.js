const path = require('path')
const express = require('express')

const Web3 = require('web3');
let web3;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider)
} else {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
}

// test transactions to check web3
web3.eth.getBalance('0x1Da250734Fe9046D34E735dBDE89D3C68dc3c4EE').then(console.log)
web3.eth.sendTransaction({
    from: '0xcAA198a302007842219CdfaEbB5592e2b12F894c',
    to: '0xa8dE1FD7a7F64A4e069292ea3316DE8052Fc1014',
    value: web3.utils.toWei('1', 'ether')
})
//

// method for interacting with smart contracts using web3
web3.eth.call({
    from: "0x1Da250734Fe9046D34E735dBDE89D3C68dc3c4EE",
    to: "0x45fa3180244423481b0fBF93388c8b452688F26A",
    data: web3.utils.sha3("partyCount()").substr(0,10)
}).then(console.log)

// Another method for interacting with smart contracts using web3
let contract = new web3.eth.Contract([
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "castVote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "countVotes",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "parties",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "votes",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "partyCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winnerVoteCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winningParty",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "votes",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
], "0x45fa3180244423481b0fBF93388c8b452688F26A")

contract.methods.partyCount().call().then(console.log)

// using web3 to cast vote

contract.methods.castVote(2).send({
    from: "0xa8dE1FD7a7F64A4e069292ea3316DE8052Fc1014"
}).then(console.log)

const app = express()
const htmlPath = path.join(__dirname, '../html')

app.use(express.static(htmlPath))

app.listen(8080, () => {
    console.log('Server is up on port 8080')
})  