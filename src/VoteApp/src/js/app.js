const path = require('path')
const express = require('express')

const Web3 = require('web3');
let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

const app = express()
const htmlPath = path.join(__dirname, '../html')

app.use(express.static(htmlPath))

app.listen(8080, () => {
    console.log('Server is up on port 8080')
})