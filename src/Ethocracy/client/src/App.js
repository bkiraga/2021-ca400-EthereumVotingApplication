import React, { Component } from "react";
import ElectionBuilderContract from "./contracts/ElectionBuilder.json";
import ElectionContract from "./contracts/Election.json";
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

      this.electionBuilder = new this.web3.eth.Contract(
        ElectionBuilderContract.abi,
        ElectionBuilderContract.networks[this.networkId] && ElectionBuilderContract.networks[this.networkId].address,
      );

      this.voting = new this.web3.eth.Contract(
        ElectionContract.abi,
        ElectionContract.networks[this.networkId] && ElectionContract.networks[this.networkId].address,
      );

      // this.voting = this.web3.eth.contract(ElectionContract.abi).at("0xE872CC2494f2b6ec13B2834DC2c21B5C75CcaCb0")
      // var Web3 = require('web3');
      // var web3 = new Web3();
      // var contractClass = web3.eth.contract(contractClassAbi);
      // var contractInstance = contractClass.at(contractAddress);

      // this.voting = new this.web3.eth.Contract(ElectionContract.abi).at("0xE872CC2494f2b6ec13B2834DC2c21B5C75CcaCb0");

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
          electionBuilder={this.electionBuilder}
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
        {this.state.deployElectionVisibility ? <DeployElection electionBuilder={this.props.electionBuilder} accounts={this.props.accounts}/>: " "}
        {this.state.electionStatisticsVisibility ? <ElectionStastics/>: " "}
      </div>
    )
  }
}

class DeployElection extends Component {
  constructor(props) {
    super(props);
    this.setCandidates = this.setCandidates.bind(this);
    this.setType = this.setType.bind(this);
    this.state = {
      candidates: [],
      electionType: 'FPP'
    }
  }

  setType(type) {
    this.setState(() => {
      return {
        electionType: type
      }
    })
  }

  setCandidates(candidate, setting) {
    if (setting === 'add') {
      this.setState((prevState) => {
        return {
          candidates: prevState.candidates.concat(candidate)
        }
      })
    } else if (setting === 'rm') {
      this.setState((prevState) => {
        prevState.candidates.pop();
        return {
          candidates: prevState.candidates
        }
      })
    } else if (setting === 'rmAll') {
      this.setState(() => {
        return {
          candidates: []
        }
      })
    }
  }

  
  render() {
    return (
      <div>
        <CandidateList
          candidates={this.state.candidates}
        />
        <AddCandidate
          setCandidates={this.setCandidates}
          candidates={this.state.candidates}
        />
        <ElectionType
          setType={this.setType}
        />
        <SubmitElection
          electionBuilder={this.props.electionBuilder}
          accounts={this.props.accounts}
          candidates={this.state.candidates}
        />
        
      </div>
    )
  }
}

class CandidateList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {
          this.props.candidates.map((candidate) => <Candidate key={candidate} candidateValue={candidate}/>)
        }
      </div>
    )
  }
}

class Candidate extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.candidateValue}
      </div>
    )
  }
}

class AddCandidate extends Component {
  constructor(props) {
    super(props);
    this.handleAddCandidates = this.handleAddCandidates.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
  }

  handleAddCandidates(e) {
    e.preventDefault();
    const candidate = e.target.elements.addCandidates.value.trim();
    this.props.setCandidates(candidate, 'add');
    e.target.elements.addCandidates.value = '';
  }

  handleRemove() {
    this.props.setCandidates(undefined, 'rm');
  }

  handleRemoveAll() {
    this.props.setCandidates(undefined, 'rmAll');
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleAddCandidates}>
          <input type="text" name="addCandidates"/>
          <button>Add Candidate</button>
        </form>
        <button onClick={this.handleRemove}>Remove</button>
        <button onClick={this.handleRemoveAll}>Remove all</button>
      </div>
    )
  }
}

class ElectionType extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.setType(this.electionType.value);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <select ref={(input) => this.electionType = input} className='selectElectionType'>
              <option>{'FPP'}</option>
              <option>{'STV'}</option>
            </select>
          <button>Select Type</button>
        </form>
      </div>
    )
  }
}

class SubmitElection extends Component {
  constructor(props){
    super(props);
    this.handleDeployElection = this.handleDeployElection.bind(this);
    this.resp = this.resp.bind(this);
  }

  async handleDeployElection() {
    await this.props.electionBuilder.methods.deployElection(this.props.candidates).send({from: this.props.accounts[0]});
  }

  resp() {
    this.props.electionBuilder.methods.elections(0).call().then(console.log);
    // let elections = this.props.getElections();

  }

  render() {
    return (
      <div>
        <button onClick={this.handleDeployElection}>Deploy Election</button>
        <button onClick={this.resp}>resp</button>
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
        <SelectElection />
        <SelectCandidate candidates={this.props.candidates} voting={this.props.voting} accounts={this.props.accounts}/>
        <ElectionResults voting={this.props.voting} accounts={this.props.accounts}/>
      </div>
    )
  }
}

class SelectElection extends Component {
  render() {
    return (
      <div>
        
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
        <table>
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
        </table>
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
