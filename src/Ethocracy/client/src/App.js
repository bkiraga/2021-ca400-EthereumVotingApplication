import React, { Component } from "react";
import DatePicker from "react-datepicker";
import {setMinutes, setHours} from "date-fns";
import ElectionBuilderContract from "./contracts/ElectionBuilder.json";
import ElectionContract from "./contracts/Election.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

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
        <h1>Ethocracy</h1>
        <NavBar 
          // voting={this.voting}
          accounts = {this.accounts}
          electionBuilder={this.electionBuilder}
          web3 = {this.web3}
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
      let election = await this.props.electionBuilder.methods.elections(i).call();
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
      <div>
        <p>Vote</p>
        {
          this.state.selectedElection ? 
          <SelectCandidate
            candidates={this.state.candidates}
            contract={this.state.contract}
            accounts={this.props.accounts}
          /> :
          <ElectionAddressList
            elections={this.state.elections}
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
        {/* <ElectionResults contract={this.state.contract} accounts={this.props.accounts}/> */}
      </div>
    )
  }
}

// class ElectionInfo extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div>
        
//       </div>
//     )
//   }
// }

class ElectionAddressList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Elections:</p>
        {
          this.props.elections.map((election) => <ElectionAddress key={election} electionValue={election}/>)
        }
      </div>
    )
  }
}

class ElectionAddress extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.electionValue}
      </div>
    )
  }
}

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

class SelectCandidate extends Component {
  constructor(bind) {
    super(bind);
    this.getCandidates = this.getCandidates.bind(this);
    this.hideVote = this.hideVote.bind(this);
    this.state = {
      candidates: [],
      electionKey: ""
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
    const encrypt = require("./encrypt");
    const ballot = encrypt.maskBallot(vote, this.state.electionKey);
    return ballot;
  }

  render() {
    return (
      <div>
        <p>Candidates:</p>
        <form onSubmit={(e) => {
          e.preventDefault()
          console.log("candidate id: " + this.candidateId.value);
          this.props.contract.methods.castVote(this.hideVote(this.candidateId.value)).send({from: this.props.accounts[0]});
          }}>
          <select ref={(input) => this.candidateId = input} className='form-control'>
            {this.state.candidates.map((candidate) => {
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
    this.getBallots = this.getBallots.bind(this);
    this.getCandidates = this.getCandidates.bind(this);
    this.handleElectionResults = this.handleElectionResults.bind(this);
    this.state = {
      ballotCount: 0,
      ballots: [],
      resultKey: "",
      unmaskedBallotList: [],
      candidates: [],
      winner: undefined
    }
  }

  async getBallots() {
    const ballotCount = await this.props.contract.methods.ballotCount().call();
    let ballots = [];
    this.setState(() => {
      return {
        ballotCount: ballotCount
      }
    })
    for (let i = 0; i < ballotCount; i++){
      let ballot = await this.props.contract.methods.ballots(i).call();
      ballots.push(ballot);
    }
    this.setState(() => {
      return {
        ballots: ballots
      }
    })
    const resultKey = await this.props.contract.methods.resultKey().call();
    this.setState(() => {
      return {
        resultKey: resultKey
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

  async handleElectionResults() {
    let unmaskedBallots = [];
    await this.getBallots();
    const encrypt = require("./encrypt");
    // console.log("ballot count: " + this.state.ballotCount)
    // console.log("masked ballots: " + this.state.ballots);
    for (let i = 0; i < this.state.ballotCount; i++){
      let unmaskedBallot = encrypt.unmaskBallot(this.state.ballots[i], this.state.resultKey);
      // console.log("ballot: " + unmaskedBallot);
      unmaskedBallots.push(unmaskedBallot);
    }
    // this.state.unmaskedBallotList = unmaskedBallots;
    this.setState(() => {
      return {
        unmaskedBallotList: unmaskedBallots
      }
    })
    console.log("result: " + this.state.unmaskedBallotList);
    await this.getCandidates();
    let resultMap = new Map();
    for (let i = 0; i < this.state.candidates.length; i++) {
      resultMap.set(this.state.candidates[i].name, 0);
      // resultMap[this.state.candidates[i].name] = 0;
    }
    console.log("resultMap1: " + JSON.stringify(resultMap));
    for (let i = 0; i < this.state.unmaskedBallotList.length; i++) {
      // console.log("a");
      for (let [key, value] of resultMap.entries()) {
        // console.log("b");
        if (key === this.state.candidates[parseInt(this.state.unmaskedBallotList[i], 10)].name) {
          console.log("success");
          // value += 1;
          resultMap.set(key, value+1);
        }
        // console.log(key + ' = ' + value);
      }
      // resultMap.forEach((value, key) => {
      //   console.log("key: " + key);
      //   console.log("name: " + this.state.candidates[parseInt(this.state.unmaskedBallotList[i], 10)].name);
        // if (key === this.state.candidates[parseInt(this.state.unmaskedBallotList[i], 10)].name) {
        //   console.log("success");
        //   value += 1;
        // }
      // })
    }
    for (let [key,value] of resultMap.entries()) {
      console.log(key + ' = ' + value);
    }
    // console.log("Candidates: " + this.state.candidates[1].name);
    // console.log("resultMap: " + JSON.stringify(resultMap));
    // for (let value of resultMap.values()) {
    //   console.log("value: " + value);
    // }
  }

  render() {
    return (
      <div>
        <p>Election Results</p>
        <button onClick={this.handleElectionResults}>Get Result</button>
        {this.state.winner !== undefined ? <ResultsTable winner={this.state.winner}/> : " "}
      </div>
    )
  }
}

class ResultsTable extends Component {
  render() {
    console.log(this.props.winner)
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
  constructor(props) {
    super(props);
    this.setCandidates = this.setCandidates.bind(this);
    this.setType = this.setType.bind(this);
    this.setSelectedTime = this.setSelectedTime.bind(this);
    this.state = {
      candidates: [],
      name: "",
      electionType: 'FPP',
      selectedTime: new Date(),
    }
  }

  setName(name) {
    this.setState(() => {
      return {
        name: name
      }
    })
  }

  setType(type) {
    console.log(Math.floor(this.state.selectedTime.getTime()/1000));
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

  setSelectedTime(date) {
    this.setState(() => {
      return {
        selectedTime: date
      }
    })
  }

  render() {
    const currentTime = new Date();
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
        <DatePicker
          showTimeSelect
          selected={this.state.selectedTime}
          onChange={date => this.setSelectedTime(date)}
          minDate={currentTime}
          minTime={setMinutes(currentTime, 60)}
          maxTime={setHours(setMinutes(currentTime, 45), 23)}
          dateFormat="dd/MM/yyyy h:mm aa"
        />
        <SubmitElection
          electionBuilder={this.props.electionBuilder}
          accounts={this.props.accounts}
          candidates={this.state.candidates}
          web3={this.props.web3}
          selectedTime={this.state.selectedTime}
        />
        
      </div>
    )
  }

  // render() {
  //   const currentTime = new Date();
  //   return (
  //     <div>
  //       <CandidateList
  //         candidates={this.state.candidates}
  //       />
  //       <AddCandidate
  //         setCandidates={this.setCandidates}
  //         candidates={this.state.candidates}
  //       />
  //       <ElectionType
  //         setType={this.setType}
  //       />
  //       <DatePicker
  //         showTimeSelect
  //         selected={this.state.selectedTime}
  //         onChange={date => this.setSelectedTime(date)}
  //         minDate={currentTime}
  //         minTime={setMinutes(currentTime, 60)}
  //         maxTime={setHours(setMinutes(currentTime, 45), 23)}
  //         dateFormat="dd/MM/yyyy h:mm aa"
  //       />
  //       <SubmitElection
  //         electionBuilder={this.props.electionBuilder}
  //         accounts={this.props.accounts}
  //         candidates={this.state.candidates}
  //         web3={this.props.web3}
  //         selectedTime={this.state.selectedTime}
  //       />
        
  //     </div>
  //   )
  // }

  // render() {
  //   return (
  //     <div>
  //       <CandidateList
  //         candidates={this.state.candidates}
  //       />
  //       <AddCandidate
  //         setCandidates={this.setCandidates}
  //         candidates={this.state.candidates}
  //       />
  //       <ElectionType
  //         setType={this.setType}
  //       />
  //       <DatePicker
  //         showTimeSelect
  //         selected={this.state.selectedTime}
  //         onChange={date => this.setSelectedTime(date)}
  //         minDate={new Date()}
  //         dateFormat="dd/MM/yyyy h:mm aa"
  //       />
  //       <SubmitElection
  //         electionBuilder={this.props.electionBuilder}
  //         accounts={this.props.accounts}
  //         candidates={this.state.candidates}
  //         web3={this.props.web3}
  //         selectedTime={this.state.selectedTime}
  //       />
        
  //     </div>
  //   )
  // }
}

// class ElectionName extends Component {
//   constructor(props) {
//     super(props);
//     this.handleSubmitName = this.handleSubmitName.bind(this);
//   }

//   handleSubmit(e) {
//     this.props.setName(this.)
//   }
//   render() {
//     return (
//       <div>
//         <p>Election Name</p>
        
//       </div>
//     )
//   }
// }

class CandidateList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <p>Candidates</p>
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
        <p>Election Settings</p>
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
  }

  async handleDeployElection() {
    const selectedTimestamp = Math.ceil(this.props.selectedTime.getTime() / 1000);
    // console.log(selectedTimestamp);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    // console.log(currentTimestamp);
    const time = selectedTimestamp - currentTimestamp;
    // console.log(time);
    const encrypt = require("./encrypt");
    const keys = encrypt.generateKeys();
    const electionKey = keys.public_key;
    const resultKey = keys.private_key;
    const contractOwner = await this.props.electionBuilder.methods.contractOwner().call(); ///////////////might need fix
    await this.props.electionBuilder.methods.deployElection(this.props.candidates, time, electionKey, resultKey, contractOwner).send({from: this.props.accounts[0]});
  }

  render() {
    return (
      <div>
        <p>Deploy</p>
        <button onClick={this.handleDeployElection}>Deploy Election</button>
      </div>
    )
  }
}

class ElectionStastics extends Component {
  render() {
    return (
      <div>
        <p>Your Elections</p>
      </div>
    )
  }
}

export default App;
