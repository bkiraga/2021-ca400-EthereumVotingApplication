import React, { Component } from "react";
import SelectCandidate from "./SelectCandidate";
import ElectionAddressList from "./ElectionAddressList";
import ElectionResults from "./ElectionResults";
import SelectElection from "./SelectElection";
import { Container } from "react-bootstrap";

class Vote extends Component {
    constructor(props){
      super(props);
      this.getElections = this.getElections.bind(this);
      this.setContract = this.setContract.bind(this);
      this.setSelectedElection = this.setSelectedElection.bind(this);
      this.state = {
        elections: [],
        contract: undefined,
        selectedElection: false
      }
    }
  
    componentDidMount = async () => {
      await this.getElections();
    }
  
    async getElections() {
      let elections = [];
      let electionCount = await this.props.electionBuilder.methods.electionCount().call();
      for (let i = 0; i < electionCount; i++) {
        let electionAddress = await this.props.electionBuilder.methods.elections(i).call();
        let electionData = await this.props.electionBuilder.methods.getElectionData(electionAddress).call();
        let election = {name: electionData.name, address: electionAddress, type: electionData.electionType, deadline: electionData.deadline};
        elections.push(election);
      }
      this.setState(() => {
        return {
          elections: elections
        }
      })
    }
  
    setContract(newContract) {
      this.setState(() => {
        return {
          contract: newContract
        }
      })
    }
  
    setSelectedElection(bool) {
      this.setState(() => {
        return {
          selectedElection: bool
        }
      })
    }
  
    render() {
      return (
        <Container>
          {
            this.state.selectedElection ? 
            <SelectCandidate
              candidates={this.state.candidates}
              contract={this.state.contract}
              accounts={this.props.accounts}
            /> :
            <ElectionAddressList
              elections={this.state.elections}
              setSelectedElection={this.setSelectedElection}
              setContract={this.setContract}
              web3={this.props.web3}
            />
          }
          {
            this.state.selectedElection ?
            <ElectionResults
              contract={this.state.contract}
              accounts={this.props.accounts}
            /> :
            <SelectElection
              elections={this.state.elections}
              contract={this.state.contract}
              setContract={this.setContract}
              setSelectedElection={this.setSelectedElection}
              web3={this.props.web3}
            />
          }
        </Container>
      )
    }
  }

export default Vote;

