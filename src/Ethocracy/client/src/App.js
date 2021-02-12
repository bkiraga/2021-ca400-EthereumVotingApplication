import React, { Component } from "react";
import VotingContract from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {
    loaded: false,
  };

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

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Ethocracy</h1>
        <NavBar 
          voting={this.voting}
          accounts = {this.accounts}
        />
      </div>
    );
  }
}

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleAboutUs = this.handleAboutUs.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleDeployElection = this.handleDeployElection.bind(this);
    this.handleElectionStatistics = this.handleElectionStatistics.bind(this);
    this.getCandidates = this.getCandidates.bind(this);
    this.state = {
      aboutUsVisibility: true,
      voteVisibility: false,
      deployElectionVisibility: false,
      electionStatisticsVisibility: false,
      candidates: []
    }
  }

  async getCandidates() {
    let parties = [];
    let partyCount = await this.props.voting.methods.partyCount().call();
    for (let i = 0; i < partyCount; i++) {
      let party = await this.props.voting.methods.parties(i).call();
      parties.push(party)
    }
    this.setState(() => {
      return {
        candidates: parties
      }
    })
  }

  handleAboutUs() {
    this.setState((prevState) => {
      return {
        aboutUsVisibility: true,
        voteVisibility: false,
        deployElectionVisibility: false,
        electionStatisticsVisibility: false
      }
    })
  }

  handleVote() {
    this.getCandidates();
    this.setState((prevState) => {
      return {
        aboutUsVisibility: false,
        voteVisibility: true,
        deployElectionVisibility: false,
        electionStatisticsVisibility: false
      }
    })
  }

  handleDeployElection() {
    this.setState((prevState) => {
      return {
        aboutUsVisibility: false,
        voteVisibility: false,
        deployElectionVisibility: true,
        electionStatisticsVisibility: false
      }
    })
  }

  handleElectionStatistics() {
    this.setState((prevState) => {
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
        {this.state.voteVisibility ? <Vote voting={this.props.voting} accounts={this.props.accounts} candidates={this.state.candidates}/>: " "}
        {this.state.deployElectionVisibility ? <DeployElection/>: " "}
        {this.state.electionStatisticsVisibility ? <ElectionStastics/>: " "}
      </div>
    )
  }
}

class AboutUs extends Component {
  render() {
    return (
      <div>
        <p>AboutUs</p>
      </div>
    )
  }
}

class Vote extends Component {
  render() {
    return (
      <div>
        <p>Vote</p>
        <SelectCandidate candidates={this.props.candidates} voting={this.props.voting} accounts={this.props.accounts}/>
        <ElectionResults voting={this.props.voting} accounts={this.props.accounts}/>
      </div>
    )
  }
}

class SelectCandidate extends Component {  
  render() {
    return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault()
          this.props.voting.methods.castVote(this.candidateId.value).send({from: this.props.accounts[0]});
          }}>
          <select ref={(input) => this.candidateId = input} className='form-control'>
            {this.props.candidates.map((candidate) => {
              return <option key={candidate.id} value={candidate.id}>{candidate.name}</option>
            })}
          </select>
          <button type='submit' className='btn btn-primary'>Vote</button>
        </form>
      </div>
    )
  }
}

class ElectionResults extends Component {
  constructor(props) {
    super(props);
    this.handleElectionResults = this.handleElectionResults.bind(this);
    this.state = {
      winner: undefined
    }
  }

  async handleElectionResults() {
    await this.props.voting.methods.countVotes().send({from: this.props.accounts[0]});
    let winnerParty = await this.props.voting.methods.winningParty().call();
    this.setState(() => {
      return {
        winner: winnerParty
      }
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleElectionResults}>Election Results</button>
        {this.state.winner !== undefined ? <ResultsTable winner={this.state.winner}/> : " "}
      </div>
    )
  }
}

class ResultsTable extends Component {
  render() {
    return (
      <div>
      <p>Winner:{this.props.winner.name}</p>
      <p>Vote: {this.props.winner.votes}</p>

        {/* <table>
          <thread>
            <tr>
              <th>Name</th>
              <th>Votes</th>
            </tr>
          </thread>
          <tbody>
            <tr>
              <th>{this.props.winner.name}</th>
              <td>{this.props.winner.votes}</td>
            </tr>
          </tbody>
        </table> */}
      </div>
    )
  }
}

class DeployElection extends Component {
  render() {
    return (
      <div>
        <p>DeployElection</p>
      </div>
    )
  }
}


class ElectionStastics extends Component {
  render() {
    return (
      <div>
        <p>ElectionStatistics</p>
      </div>
    )
  }
}

export default App;
