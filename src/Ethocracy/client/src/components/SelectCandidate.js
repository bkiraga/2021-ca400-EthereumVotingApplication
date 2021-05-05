import React, { Component } from "react";
import { Container } from "react-bootstrap";
import ElectionInfo from "./ElectionInfo";
import { Multiselect } from "multiselect-react-dropdown";

class SelectCandidate extends Component {
    constructor(bind) {
      super(bind);
      this.getCandidates = this.getCandidates.bind(this);
      this.hideVote = this.hideVote.bind(this);
      this.handleInputVoterId = this.handleInputVoterId.bind(this);
      this.onSelectFPPBallot = this.onSelectFPPBallot.bind(this);
      this.onSelectSTVBallot = this.onSelectSTVBallot.bind(this);
      this.handleCastVote = this.handleCastVote.bind(this);
      this.state = {
        candidates: [],
        electionKey: "",
        voterId: "",
        electionType: "",
        FPPballot: "",
        STVballot: "",
      }
    }
  
    componentDidMount = async () => {
      await this.getCandidates();
      const electionKey = await this.props.contract.methods.electionKey().call();
      const electionType = await this.props.contract.methods.electionType().call();
      this.setState(() => {
        return {
          electionKey: electionKey,
          electionType: electionType
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

    onSelectFPPBallot(data) {
      this.setState(() => {
        return {
          FPPballot: data
        }
      })
    }

    onSelectSTVBallot(data) {
      this.setState(() => {
        return {
          STVballot: data
        }
      })
    }

    async handleCastVote() {
      if (this.state.electionType === "FPP") {
        await this.props.contract.methods.castVote(this.hideVote(this.state.FPPballot[0].id), "0x" + this.state.voterId).send({from: this.props.accounts[0]})
      }
      else {
        let formatedSTVballot = "";
        for (let i = 0; i < this.state.STVballot.length; i++) {
          formatedSTVballot += this.state.STVballot[i].id + "|";
        }
        formatedSTVballot = formatedSTVballot.slice(0, -1);
        await this.props.contract.methods.castVote(this.hideVote(formatedSTVballot), "0x" + this.state.voterId).send({from: this.props.accounts[0]})
      }
    }
  
    render() {
      return (
        <Container>
          <ElectionInfo contract={this.props.contract}/>
          <form onSubmit={this.handleInputVoterId}>
          <input type="text" name="inputVoterId"/>
          <button disabled={this.state.voterId !== ""}>Input Voter ID</button>
          </form>
          {
            this.state.electionType === "FPP" ?
            <Multiselect
              options={this.state.candidates}
              singleSelect
              onSelect={this.onSelectFPPBallot}
              displayValue="name"
            /> :
            <Multiselect
              options={this.state.candidates}
              onSelect={this.onSelectSTVBallot}
              displayValue="name"
            />
          }
          <button onClick={this.handleCastVote} disabled={this.state.voterId === ""}>Vote</button>
        </Container>
      )

    }
  }

  export default SelectCandidate;