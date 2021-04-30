import React, { Component } from "react";
import ResultsTable from "./ResultsTable"

class ElectionResults extends Component {
    mounted = false;
    constructor(props) {
      super(props);
      this.getBallots = this.getBallots.bind(this);
      this.getCandidates = this.getCandidates.bind(this);
      this.getResultKey = this.getResultKey.bind(this);
      this.handleUnlockResults = this.handleUnlockResults.bind(this);
      this.handleElectionResults = this.handleElectionResults.bind(this);
      this.state = {
        electionName: "",
        electionStatus: "",
        ballotCount: 0,
        ballots: [],
        resultKey: "noKey",
        unmaskedBallotList: [],
        candidates: [],
        results: [],
        winner: undefined
      }
    }

    componentDidMount = async () => {
      this.mounted = true;
      const electionName = await this.props.contract.methods.electionName().call();
      this.setState(() => {
        return {
          electionName: electionName
        }
      })
    }

    componentDidUpdate = async () => {
      if (this.mounted === true) {
        const electionStatus = await this.props.contract.methods.electionStatus().call();
        this.setState(() => {
          return {
            electionStatus: electionStatus
          }
        })
      }
    }

    componentWillUnmount() {
      this.mounted = false;
    }
  
    async getBallots() {
      const ballotCount = await this.props.contract.methods.ballotCount().call();
      let ballots = [];
      this.setState(() => {
        return {
          ballotCount: ballotCount
        }
      })
      for (let i = 0; i < ballotCount; i++){
        let ballot = await this.props.contract.methods.ballots(i).call();
        ballots.push(ballot);
      }
      this.setState(() => {
        return {
          ballots: ballots
        }
      })
    }
  
    async getCandidates() {
      let parties = [];
      let partyCount = await this.props.contract.methods.partyCount().call();
      for (let i = 0; i < partyCount; i++) {
        let party = await this.props.contract.methods.parties(i).call();
        parties.push(party)
      }
      this.setState(() => {
        return {
          candidates: parties
        }
      })
    }

    // async getResultKey() {
    //   let resultKey = await this.props.contract.methods.resultKey().call();
    //   // console.log(resultKey);
    //   // if (resultKey === "") {
    //     // const electionName = await this.props.contract.methods.electionName().call();
    //     // console.log(electionName);
    //     // await fetch(`/api/generateKeys?name=${encodeURIComponent(electionName)}`)
    //     // .then(response => response.json())
    //     // .then(data => this.setState(() => {
    //     //   return {
    //     //     resultKey: data.resultKey
    //     //   }
    //     // }));
    //     // console.log(this.state.resultKey);
    //     // if (this.state.resultKey !== "voting still ongoing") {
    //     //   await this.props.contract.methods.releaseResultKey(this.state.resultKey).send({from: this.props.accounts[0]})
    //     // } else {

    //     // }
    //   // }
    // }


    async getResultKey() {
      await fetch(`/api/getResultKey?name=${encodeURIComponent(this.state.electionName)}`)
      .then(response => response.json())
      .then(data => this.setState(() => {
        return {
          resultKey: data.resultKey
        }
      }));
    }

    async handleUnlockResults() {
      await this.getResultKey();
      const electionKey = await this.props.contract.methods.electionKey().call();
      const encrypt = require("../encrypt");
      const testCiphertext = encrypt.maskBallot("teststring", electionKey);
      try {
        if (encrypt.unmaskBallot(testCiphertext, this.state.resultKey) === "teststring") {
          await this.props.contract.methods.releaseResultKey(this.state.resultKey).send({from: this.props.accounts[0]});
        } else {
          console.log("Not a valid key");
        }
      } catch (e) {
        alert("Election still ongoing");
      }
    }
  
    async handleElectionResults() {
      let unmaskedBallots = [];
      await this.getBallots();
      if (this.state.resultKey === "" || this.state.resultKey === "voting still ongoing") {
        return "voting still ongoing";
      }
      const encrypt = require("../encrypt");
      for (let i = 0; i < this.state.ballotCount; i++){
        let unmaskedBallot = encrypt.unmaskBallot(this.state.ballots[i], this.state.resultKey);
        unmaskedBallots.push(unmaskedBallot);
      }
      this.setState(() => {
        return {
          unmaskedBallotList: unmaskedBallots
        }
      })
      await this.getCandidates();
      let resultMap = new Map();
      for (let i = 0; i < this.state.candidates.length; i++) {
        resultMap.set(this.state.candidates[i].name, 0);
      }
      for (let i = 0; i < this.state.unmaskedBallotList.length; i++) {
        for (let [key, value] of resultMap.entries()) {
          if (key === this.state.candidates[parseInt(this.state.unmaskedBallotList[i], 10)].name) {
            resultMap.set(key, value+1);
          }
        }
      }
      let results = [];
      for (let [key,value] of resultMap.entries()) {
        results.push({candidate: key, votes: value});
      }
  
      for (let i = 0; i < results.length; i++) {
        let min = i;
        for (let j = i+1; j < results.length; j++) {
          if (results[j].votes < results[min].votes){
            min = j
          }
        }
        if (min !== i) {
          let tmp = results[i];
          results[i] = results[min];
          results[min] = tmp;
        }
      }
      results = results.reverse();
  
      this.setState(() => {
        const firstPlace = results[0];
        const secondPlace = results[1];
        if (firstPlace.votes !== secondPlace.votes) {
          return {
            results: results,
            winner: firstPlace.candidate
          }
        } else {
          return {
            results: results,
            winner: "Draw"
          }
        }
      })
      console.log(this.state.winner);
    }
  
    render() {
      if (this.state.electionStatus === "inProgress") {
        return (
          <div>
            <h3>Election Status: Voting in progress</h3>
            <p>Waiting for election creator to release the results</p>
            <button onClick={this.handleUnlockResults}>Unlock results</button>
          </div>
        )
      } else {
          return (
            <div>
              <p>Election Results</p>
              <button onClick={this.handleElectionResults}>Get Result</button>
              {this.state.results.length !== 0 ? <ResultsTable winner={this.state.winner} results={this.state.results}/> : " "}
            </div>
          )
      }
    }
  }

  export default ElectionResults;