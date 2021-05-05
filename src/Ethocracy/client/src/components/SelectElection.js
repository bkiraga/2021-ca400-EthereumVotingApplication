import React, { Component } from "react";
import { Button } from "react-bootstrap";
import ElectionContract from "../contracts/Election.json";

class SelectElection extends Component {
    constructor(props){
      super(props);
      this.handleSelectElection = this.handleSelectElection.bind(this);
      this.state = {
        electionExists: false
      }
    }
  
    async handleSelectElection(e) {
      e.preventDefault();
      const address = e.target.elements.selectElection.value.trim();
      let contract;
      try {
        contract = await new this.props.web3.eth.Contract(ElectionContract.abi, address);
        let contractAddress = contract.methods.getAddress().call();
        this.setState(() => {
          return {
            electionExists: true
          }
        })
      } catch(e) {
        this.setState(() => {
          return {
            electionExists: false
          }
        })
        console.log("error: contract address not found");
      }
      if (this.state.electionExists === true) {
        this.props.setContract(contract);
        this.props.setSelectedElection(true);
      } else {
        this.props.setSelectedElection(false);
      }
    }
  
    render() {
      return (
        <div>
          <form onSubmit={this.handleSelectElection}>
            <input type="text" name="selectElection"/>
            <button>Select Election</button>
          </form>
        </div>
      )
    }
  }

  export default SelectElection;