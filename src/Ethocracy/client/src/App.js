import React, { Component } from "react";
import VotingContract from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {loaded: false, ballot:0};

  componentDidMount = async () => {
    try {
      this.web3 = await getWeb3();

      this.accounts = await this.web3.eth.getAccounts();

      this.networkId = await this.web3.eth.net.getId();

      this.voting = new this.web3.eth.Contract(
        VotingContract.abi,
        VotingContract.networks[this.networkId] && VotingContract.networks[this.networkId].address,
      );

      this.setState({loaded:true});
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  // https://reactjs.org/docs/forms.html
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Ethocracy</h1>
        <p>An Ethereum based voting application</p>
        chooseCandidate: <input type="text" name="ballot" value={this.state.ballot} onChange={this.handleInputChange}/>
        <button type="button" onClick={this.castBallot}>castVote</button>
      </div>
    );
  }
}

export default App;
