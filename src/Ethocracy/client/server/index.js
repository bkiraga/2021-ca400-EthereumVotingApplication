const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const fs = require('fs');
const security = require('./security.js');
const elections = require('./elections.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/generateKeys', (req, res) => {
    const electionName = req.query.name;
    const deadline = req.query.deadline;
    if (!electionName) {
        return res.send({
            error: "election name not given to the api"
        })
    }
    const electionKeys = security.generateKeys();
    elections.addElection({name: electionName, key: electionKeys.private_key, deadline: deadline});

    res.send({
        public_key: electionKeys.public_key
    });
})

app.get('/api/getResultKey', (req, res) => {
    const electionName = req.query.name;
    const electionData = elections.lookupElection(electionName);
    // const resultKey = electionData.key;
    const deadline = electionData.deadline;
    // const electionFinished = checkElectionComplete(deadline);   //result key is only made available after the election deadline
    // if (electionFinished == true) {
    //     return res.send({
    //         resultKey: electionData.key
    //     });
    // } else {
    //     res.send({
    //         resultKey: "voting still ongoing"
    //     })
    // }
    console.log(electionData.key);
    res.send({
        resultKey: electionData.key
    });
})

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);