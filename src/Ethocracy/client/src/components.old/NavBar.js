import React, { Component } from "react";
import AboutUs from "./AboutUs";
import Vote from "./Vote";
import DeployElection from "./DeployElection";
import ElectionStastics from "./ElectionStatistics";

class NavBar extends Component {
    constructor(props) {
      super(props);
      this.handleAboutUs = this.handleAboutUs.bind(this);
      this.handleVote = this.handleVote.bind(this);
      this.handleDeployElection = this.handleDeployElection.bind(this);
      this.handleElectionStatistics = this.handleElectionStatistics.bind(this);
      this.state = {
        aboutUsVisibility: true,
        voteVisibility: false,
        deployElectionVisibility: false,
        electionStatisticsVisibility: false,
      }
    }
  
    handleAboutUs() {
      this.setState(() => {
        return {
          aboutUsVisibility: true,
          voteVisibility: false,
          deployElectionVisibility: false,
          electionStatisticsVisibility: false
        }
      })
    }
  
    handleVote() {
      this.setState(() => {
        return {
          aboutUsVisibility: false,
          voteVisibility: true,
          deployElectionVisibility: false,
          electionStatisticsVisibility: false
        }
      })
    }
  
    handleDeployElection() {
      this.setState(() => {
        return {
          aboutUsVisibility: false,
          voteVisibility: false,
          deployElectionVisibility: true,
          electionStatisticsVisibility: false
        }
      })
    }
  
    handleElectionStatistics() {
      this.setState(() => {
        return {
          aboutUsVisibility: false,
          voteVisibility: false,
          deployElectionVisibility: false,
          electionStatisticsVisibility: true
        }
      })
    }
  
    render() {
      return (
        <div>
          <button onClick={this.handleAboutUs}>About Us</button>
          <button onClick={this.handleVote}>Cast Vote</button>
          <button onClick={this.handleDeployElection}>Deploy Election</button>
          <button onClick={this.handleElectionStatistics}>Election Statistics</button>
          {this.state.aboutUsVisibility ? <AboutUs />: " "}
          {this.state.voteVisibility ? <Vote electionBuilder={this.props.electionBuilder} accounts={this.props.accounts} candidates={this.state.candidates} web3={this.props.web3}/>: " "}
          {this.state.deployElectionVisibility ? <DeployElection electionBuilder={this.props.electionBuilder} accounts={this.props.accounts} web3={this.props.web3}/>: " "}
          {this.state.electionStatisticsVisibility ? <ElectionStastics/>: " "}
        </div>
      )
    }
  }

  export default NavBar;