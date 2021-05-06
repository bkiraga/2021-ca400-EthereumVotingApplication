const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const utils = require('./utils.js');
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
  const electionKeys = utils.generateKeys();
  elections.addElection({name: electionName, key: electionKeys.private_key, deadline: deadline});

  res.send({
    public_key: electionKeys.public_key
  });
})

app.get('/api/getResultKey', (req, res) => {
  const electionName = req.query.name;
  const electionData = elections.lookupElection(electionName);
  const deadline = electionData.deadline;
  const electionFinished = utils.checkElectionComplete(deadline);   //result key is only made available after the election deadline
  if (electionFinished == true) {
    return res.send({
      resultKey: electionData.key
    });
  } else {
    res.send({
      resultKey: "noKey"
    })
  }
})

module.exports = app;