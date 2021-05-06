import React, { Component } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import ElectionInfo from "./ElectionInfo";
import { maskBallot } from "../../election_tools/Encrypt";
import { Multiselect } from "multiselect-react-dropdown";

class SelectCandidate extends Component {
    constructor(bind) {
      super(bind);
      this.getCandidates = this.getCandidates.bind(this);
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
        await this.props.contract.methods.castVote(maskBallot(this.state.FPPballot[0].id, this.state.electionKey), "0x" + this.state.voterId).send({from: this.props.accounts[0]})
      }
      else {
        let formatedSTVballot = "";
        for (let i = 0; i < this.state.STVballot.length; i++) {
          formatedSTVballot += this.state.STVballot[i].id + "|";
        }
        formatedSTVballot = formatedSTVballot.slice(0, -1);
        await this.props.contract.methods.castVote(maskBallot(formatedSTVballot, this.state.electionKey), "0x" + this.state.voterId).send({from: this.props.accounts[0]})
      }
    }
  
    render() {
      return (
        <Container>
          <Row className="justify-content-md-center">
          <Col sm={2}>
          </Col>
          <Col sm={6}>
          <ElectionInfo contract={this.props.contract}/>
          <Form onSubmit={this.handleInputVoterId}>
          <InputGroup>
            <Form.Control type="input" name="inputVoterId" placeholder="Enter your Voter ID"/>
            <InputGroup.Append>
              <Button type="submit" variant="secondary">Set ID</Button>
            </InputGroup.Append> 
            </InputGroup>
          </Form>
          <br />
          {
            this.state.electionType === "FPP" ?
            <Multiselect
              options={this.state.candidates}
              singleSelect
              placeholder="Select preferred candidate"
              onSelect={this.onSelectFPPBallot}
              displayValue="name"
            /> :
            <Multiselect
              options={this.state.candidates}
              onSelect={this.onSelectSTVBallot}
              placeholder="Select preferred candidates"
              displayValue="name"
            />
          }
          <br />
          <Button onClick={this.handleCastVote} variant="success" disabled={this.state.voterId === ""}>Submit your ballot</Button>
          </Col>
          <Col sm={2}>
          </Col>
          </Row>
        </Container>
      )

    }
  }

  export default SelectCandidate;