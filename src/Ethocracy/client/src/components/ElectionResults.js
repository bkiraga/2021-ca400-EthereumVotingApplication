import React, { Component } from "react";
import ResultsTable from "./ResultsTable";
import tallyFPPBallots from "../election_tools/fppTallyAlgorithm";
import tallySTVBallots from "../election_tools/stvTallyAlgorithm";
import { Alert, Button } from "react-bootstrap";

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
      const electionType = await this.props.contract.methods.electionType().call();
      this.setState(() => {
        return {
          electionName: electionName,
          electionType: electionType
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
      this.setState(() => {
        return {
          ballotCount: ballotCount
        }
      })
      const ballots = await this.props.contract.methods.getBallots().call();
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

    async unmaskElectionBallots() {
      let unmaskedBallots = [];
      await this.getBallots();
      const resultKey = await this.props.contract.methods.resultKey().call();
      const encrypt = require("../encrypt");
      for (let i = 0; i < this.state.ballotCount; i++){
        let unmaskedBallot = encrypt.unmaskBallot(this.state.ballots[i], resultKey);
        unmaskedBallots.push(unmaskedBallot);
      }
      this.setState(() => {
        return {
          unmaskedBallotList: unmaskedBallots
        }
      })
    }
  
    async handleElectionResults() {
      await this.getCandidates();
      await this.unmaskElectionBallots();
      if (this.state.electionType == "FPP") {
        const results = tallyFPPBallots(this.state.candidates, this.state.unmaskedBallotList);
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
      } else {
          let unformatedSTVBallots = [];
          for(let i = 0; i < this.state.unmaskedBallotList.length; i++) {
            let ballot = this.state.unmaskedBallotList[i].split("|").map((x) => {return parseInt(x)});
            unformatedSTVBallots.push(ballot);
          }
          const seatNumber = await this.props.contract.methods.stvSeatCount().call();
          const results = tallySTVBallots(unformatedSTVBallots, seatNumber, this.state.candidates.length);
          let winnerCandidates = [];
          let loserCandidates = [];
          for (let i = 0; i < this.state.candidates.length; i++) {
            if (results.includes(parseInt(this.state.candidates[i].id))) {
              winnerCandidates.push(this.state.candidates[i]);
            } else {
              loserCandidates.push(this.state.candidates[i]);
            }
          }
          const orderedResultArray = winnerCandidates.concat(loserCandidates);
          for (let i = 0; i < orderedResultArray.length; i++) {
            if (winnerCandidates.includes(orderedResultArray[i])) {
              orderedResultArray[i].res = "W";
            } else {
              orderedResultArray[i].res = "L";
            }
          }
          this.setState(() => {
            return {
              results: orderedResultArray,
              winner: results
            }
          })
      }
    }
  
    render() {
      if (this.state.electionStatus === "inProgress") {
        return (
          <div>
            <br />
            <Alert variant="info">Results may be released below after the deadline.</Alert> 
            <Button onClick={this.handleUnlockResults}>Release results</Button>
          </div>
        )
      } else {
          return (
            <div>
              <br />
              <Alert variant="danger">Voting has ended and the results have been released.</Alert> 
              <Button onClick={this.handleElectionResults}>View results</Button>
              {this.state.results.length !== 0 ? <ResultsTable winner={this.state.winner} results={this.state.results} type={this.state.electionType}/> : " "}
            </div>
          )
      }
    }
  }

  export default ElectionResults;