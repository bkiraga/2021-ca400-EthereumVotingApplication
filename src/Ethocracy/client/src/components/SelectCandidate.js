import React, { Component } from "react";
import { Container } from "react-bootstrap";
import ElectionInfo from "./ElectionInfo";

class SelectCandidate extends Component {
    constructor(bind) {
      super(bind);
      this.getCandidates = this.getCandidates.bind(this);
      this.hideVote = this.hideVote.bind(this);
      this.handleInputVoterId = this.handleInputVoterId.bind(this);
      this.state = {
        candidates: [],
        electionKey: "",
        voterId: ""
      }
    }
  
    componentDidMount = async () => {
      await this.getCandidates();
      const electionKey = await this.props.contract.methods.electionKey().call();
      this.setState(() => {
        return {
          electionKey: electionKey
        }
      })
    }
  
    handleInputVoterId(e) {
      e.preventDefault();
      const voterId = e.target.elements.inputVoterId.value.trim()
      console.log(voterId);
      this.setState(() => {
        return {
          voterId: voterId
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
  
    hideVote(vote) {
      const encrypt = require("../encrypt");
      const ballot = encrypt.maskBallot(vote, this.state.electionKey);
      return ballot;
    }
  
    render() {
      return (
        <Container>
          <ElectionInfo contract={this.props.contract}/>
          <form onSubmit={this.handleInputVoterId}>
          <input type="text" name="inputVoterId"/>
          <button disabled={this.state.voterId !== ""}>Input Voter ID</button>
          </form>
          <br />
          <h2>Select a candidate below:</h2>
          <form onSubmit={(e) => {
            e.preventDefault()
            console.log("candidate id: " + this.candidateId.value);
            this.props.contract.methods.castVote(this.hideVote(this.candidateId.value), "0x" + this.state.voterId).send({from: this.props.accounts[0]});
            }}>
            <select ref={(input) => this.candidateId = input} className='form-control'>
              {this.state.candidates.map((candidate) => {
                return <option key={candidate.id} value={candidate.id}>{candidate.name}</option>
              })}
            </select>
            <button type='submit' disabled={this.state.voterId === ""}>Vote</button>
          </form>
        </Container>
      )

    }
  }

  export default SelectCandidate;