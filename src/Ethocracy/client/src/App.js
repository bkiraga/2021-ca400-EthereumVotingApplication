import React, { Component } from "react";
import ElectionBuilderContract from "./contracts/ElectionBuilder.json";
import { Router, Route, Switch } from "react-router-dom";
import ElectionContract from "./contracts/Election.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import Home from "./components/Home/Home";
import Vote from "./components/ElectionVote/Vote";
import DeployElection from "./components/ElectionDeployment/DeployElection";
import NavigationBar from "./components/Home/NavigationBar";

import MyElections from "./components/UserElections/MyElections.js";
import MyBallots from "./components/UserBallots/MyBallots";

class App extends Component {
  state = {
    loaded: false,
  };

  componentDidMount = async () => {
    try {
      this.web3 = await getWeb3();

      this.accounts = await this.web3.eth.getAccounts();

      this.networkId = await this.web3.eth.net.getId();

      this.electionBuilder = new this.web3.eth.Contract(
        ElectionBuilderContract.abi,
        ElectionBuilderContract.networks[this.networkId] && ElectionBuilderContract.networks[this.networkId].address,
      );

      this.setState({loaded:true});
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <NavigationBar />
        <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/create" component={() => (<DeployElection electionBuilder={this.electionBuilder} accounts={this.accounts} web3={this.web3}/>)} />
        <Route exact path="/vote" component={() => (<Vote electionBuilder={this.electionBuilder} accounts={this.accounts} candidates={this.candidates} web3={this.web3}/>)} />
        <Route exact path="/myelections" component={() => (<MyElections electionBuilder={this.electionBuilder} accounts={this.accounts} web3={this.web3}/>)} />
        <Route exact path="/myballots" component={() => (<MyBallots electionBuilder={this.electionBuilder} accounts={this.accounts} web3={this.web3}/>)} />
        </Switch>
      </div>
    ); 
  }
}

export default App;
