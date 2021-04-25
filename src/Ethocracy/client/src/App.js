import React, { Component } from "react";
import NavBar from './components/NavBar';
import DatePicker from "react-datepicker";
import {setMinutes, setHours} from "date-fns";
import ElectionBuilderContract from "./contracts/ElectionBuilder.json";
import ElectionContract from "./contracts/Election.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import * as ReactBootStrap from "react-bootstrap";

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

// class NavBar extends Component {
//   constructor(props) {
//     super(props);
//     this.handleAboutUs = this.handleAboutUs.bind(this);
//     this.handleVote = this.handleVote.bind(this);
//     this.handleDeployElection = this.handleDeployElection.bind(this);
//     this.handleElectionStatistics = this.handleElectionStatistics.bind(this);
//     this.state = {
//       aboutUsVisibility: true,
//       voteVisibility: false,
//       deployElectionVisibility: false,
//       electionStatisticsVisibility: false,
//     }
//   }

//   handleAboutUs() {
//     this.setState(() => {
//       return {
//         aboutUsVisibility: true,
//         voteVisibility: false,
//         deployElectionVisibility: false,
//         electionStatisticsVisibility: false
//       }
//     })
//   }

//   handleVote() {
//     this.setState(() => {
//       return {
//         aboutUsVisibility: false,
//         voteVisibility: true,
//         deployElectionVisibility: false,
//         electionStatisticsVisibility: false
//       }
//     })
//   }

//   handleDeployElection() {
//     this.setState(() => {
//       return {
//         aboutUsVisibility: false,
//         voteVisibility: false,
//         deployElectionVisibility: true,
//         electionStatisticsVisibility: false
//       }
//     })
//   }

//   handleElectionStatistics() {
//     this.setState(() => {
//       return {
//         aboutUsVisibility: false,
//         voteVisibility: false,
//         deployElectionVisibility: false,
//         electionStatisticsVisibility: true
//       }
//     })
//   }

//   render() {
//     return (
//       <div>
//         <button onClick={this.handleAboutUs}>About Us</button>
//         <button onClick={this.handleVote}>Cast Vote</button>
//         <button onClick={this.handleDeployElection}>Deploy Election</button>
//         <button onClick={this.handleElectionStatistics}>Election Statistics</button>
//         {this.state.aboutUsVisibility ? <AboutUs />: " "}
//         {this.state.voteVisibility ? <Vote electionBuilder={this.props.electionBuilder} accounts={this.props.accounts} candidates={this.state.candidates} web3={this.props.web3}/>: " "}
//         {this.state.deployElectionVisibility ? <DeployElection electionBuilder={this.props.electionBuilder} accounts={this.props.accounts} web3={this.props.web3}/>: " "}
//         {this.state.electionStatisticsVisibility ? <ElectionStastics/>: " "}
//       </div>
//     )
//   }
// }

// class AboutUs extends Component {
//   render() {
//     return (
//       <div>
//         <p>AboutUs</p>
//       </div>
//     )
//   }
// }

// class Vote extends Component {
//   constructor(props){
//     super(props);
//     this.getElections = this.getElections.bind(this);
//     this.setContract = this.setContract.bind(this);
//     this.setSelectedElection = this.setSelectedElection.bind(this);
//     this.state = {
//       elections: [],
//       contract: undefined,
//       selectedElection: false
//     }
//   }

//   componentDidMount = async () => {
//     await this.getElections();
//   }

//   async getElections() {
//     let elections = [];
//     let electionCount = await this.props.electionBuilder.methods.electionCount().call();
//     for (let i = 0; i < electionCount; i++) {
//       let electionAddress = await this.props.electionBuilder.methods.elections(i).call();
//       let electionName = await this.props.electionBuilder.methods.electionNames(electionAddress).call();
//       let electionDeadline = await this.props.electionBuilder.methods.electionDeadlines(electionAddress).call();
//       let electionType = await this.props.electionBuilder.methods.electionTypes(electionAddress).call();
//       // let election = await this.props.electionBuilder.methods.elections(i).call();
//       let election = {name: electionName, address: electionAddress, type: electionType, deadline: electionDeadline};
//       elections.push(election);
//     }
//     this.setState(() => {
//       return {
//         elections: elections
//       }
//     })
//   }

//   setContract(newContract) {
//     this.setState(() => {
//       return {
//         contract: newContract
//       }
//     })
//   }

//   setSelectedElection(bool) {
//     this.setState(() => {
//       return {
//         selectedElection: bool
//       }
//     })
//   }

//   render() {
//     return (
//       <div>
//         {
//           this.state.selectedElection ? 
//           <SelectCandidate
//             candidates={this.state.candidates}
//             contract={this.state.contract}
//             accounts={this.props.accounts}
//           /> :
//           <ElectionAddressList
//             elections={this.state.elections}
//           />
//         }
//         {
//           this.state.selectedElection ?
//           <ElectionResults
//             contract={this.state.contract}
//             accounts={this.props.accounts}
//           /> :
//           <SelectElection
//             elections={this.state.elections}
//             contract={this.state.contract}
//             setContract={this.setContract}
//             setSelectedElection={this.setSelectedElection}
//             web3={this.props.web3}
//           />
//         }
//         {/* <ElectionResults contract={this.state.contract} accounts={this.props.accounts}/> */}
//       </div>
//     )
//   }
// }

// class ElectionAddressList extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     if (this.props.elections.length == 0) {
//       return (
//         ""
//       )
//     } else {
//       return (
//         <div>
//           <p>Elections:</p>
//           <ReactBootStrap.Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Address</th>
//                 <th>Type</th>
//                 <th>Deadline</th>
//               </tr>
//             </thead>
//             <tbody>
//               {this.props.elections.map((election, index) => <ElectionAddress key={index} name={election.name} address={election.address} type={election.type} deadline={election.deadline}/>)}
//             </tbody>
//           </ReactBootStrap.Table>
//         </div>
//       )
//     }
//   }
// }

// class ElectionAddress extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <tr>
//         <td>{this.props.name}</td>
//         <td>{this.props.address}</td>
//         <td>{this.props.type}</td>
//         <td>{this.props.deadline}</td>
//       </tr>
//     )
//   }
// }

// class SelectElection extends Component {
//   constructor(props){
//     super(props);
//     this.handleSelectElection = this.handleSelectElection.bind(this);
//     this.state = {
//       electionExists: false
//     }
//   }

//   async handleSelectElection(e) {
//     e.preventDefault();
//     const address = e.target.elements.selectElection.value.trim();
//     let contract;
//     try {
//       contract = await new this.props.web3.eth.Contract(ElectionContract.abi, address);
//       let contractAddress = contract.methods.getAddress().call();
//       this.setState(() => {
//         return {
//           electionExists: true
//         }
//       })
//     } catch(e) {
//       this.setState(() => {
//         return {
//           electionExists: false
//         }
//       })
//       console.log("error: contract address not found");
//     }
//     if (this.state.electionExists === true) {
//       this.props.setContract(contract);
//       this.props.setSelectedElection(true);
//     } else {
//       this.props.setSelectedElection(false);
//     }
//   }

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSelectElection}>
//           <input type="text" name="selectElection"/>
//           <button>Select Election</button>
//         </form>
//       </div>
//     )
//   }
// }

// class ElectionInfo extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       electionName: "",
//       electionDeadline: "",
//       electionType: ""
//     }
//   }

//   componentDidMount = async () => {
//     const electionName = await this.props.contract.methods.electionName().call();
//     const electionDeadline = await this.props.contract.methods.electionDeadline().call();
//     const electionType = await this.props.contract.methods.electionType().call();
//     this.setState(() => {
//       return {
//         electionName: electionName,
//         electionDeadline: electionDeadline,
//         electionType: electionType
//       }
//     })
//   }
  
//   render() {
//     return (
//       <div>
//         <h3>{this.state.electionName}</h3>
//         <br/>
//         Open until: {this.state.electionDeadline}
//       </div>
//     )
//   }
// }

// class SelectCandidate extends Component {
//   constructor(bind) {
//     super(bind);
//     this.getCandidates = this.getCandidates.bind(this);
//     this.hideVote = this.hideVote.bind(this);
//     this.handleInputVoterId = this.handleInputVoterId.bind(this);
//     this.state = {
//       candidates: [],
//       electionKey: "",
//       voterId: ""
//     }
//   }

//   componentDidMount = async () => {
//     await this.getCandidates();
//     const electionKey = await this.props.contract.methods.electionKey().call();
//     this.setState(() => {
//       return {
//         electionKey: electionKey
//       }
//     })
//   }

//   handleInputVoterId(e) {
//     e.preventDefault();
//     const voterId = e.target.elements.inputVoterId.value.trim()
//     console.log(voterId);
//     this.setState(() => {
//       return {
//         voterId: voterId
//       }
//     })
//   }

//   async getCandidates() {
//     let parties = [];
//     let partyCount = await this.props.contract.methods.partyCount().call();
//     for (let i = 0; i < partyCount; i++) {
//       let party = await this.props.contract.methods.parties(i).call();
//       parties.push(party)
//     }
//     this.setState(() => {
//       return {
//         candidates: parties
//       }
//     })
//   }

//   hideVote(vote) {
//     const encrypt = require("./encrypt");
//     const ballot = encrypt.maskBallot(vote, this.state.electionKey);
//     return ballot;
//   }

//   render() {
//     return (
//       <div>
//         <ElectionInfo contract={this.props.contract}/>
//         <form onSubmit={this.handleInputVoterId}>
//         <input type="text" name="inputVoterId"/>
//         <button disabled={this.state.voterId !== ""}>Input Voter ID</button>
//         </form>
//         <p>Candidates:</p>
//         <form onSubmit={(e) => {
//           e.preventDefault()
//           console.log("candidate id: " + this.candidateId.value);
//           this.props.contract.methods.castVote(this.hideVote(this.candidateId.value), "0x" + this.state.voterId).send({from: this.props.accounts[0]});
//           }}>
//           <select ref={(input) => this.candidateId = input} className='form-control'>
//             {this.state.candidates.map((candidate) => {
//               return <option key={candidate.id} value={candidate.id}>{candidate.name}</option>
//             })}
//           </select>
//           <button type='submit' disabled={this.state.voterId === ""}>Vote</button>
//         </form>
//       </div>
//     )
//   }
// }

// class ElectionResults extends Component {
//   constructor(props) {
//     super(props);
//     this.getBallots = this.getBallots.bind(this);
//     this.getCandidates = this.getCandidates.bind(this);
//     this.handleElectionResults = this.handleElectionResults.bind(this);
//     this.state = {
//       ballotCount: 0,
//       ballots: [],
//       resultKey: "",
//       unmaskedBallotList: [],
//       candidates: [],
//       results: [],
//       winner: undefined
//     }
//   }

//   async getBallots() {
//     const ballotCount = await this.props.contract.methods.ballotCount().call();
//     let ballots = [];
//     this.setState(() => {
//       return {
//         ballotCount: ballotCount
//       }
//     })
//     for (let i = 0; i < ballotCount; i++){
//       let ballot = await this.props.contract.methods.ballots(i).call();
//       ballots.push(ballot);
//     }
//     this.setState(() => {
//       return {
//         ballots: ballots
//       }
//     })
//     const resultKey = await this.props.contract.methods.resultKey().call();
//     this.setState(() => {
//       return {
//         resultKey: resultKey
//       }
//     })
//   }

//   async getCandidates() {
//     let parties = [];
//     let partyCount = await this.props.contract.methods.partyCount().call();
//     for (let i = 0; i < partyCount; i++) {
//       let party = await this.props.contract.methods.parties(i).call();
//       parties.push(party)
//     }
//     this.setState(() => {
//       return {
//         candidates: parties
//       }
//     })
//   }

//   async handleElectionResults() {
//     let unmaskedBallots = [];
//     await this.getBallots();
//     const encrypt = require("./encrypt");
//     for (let i = 0; i < this.state.ballotCount; i++){
//       let unmaskedBallot = encrypt.unmaskBallot(this.state.ballots[i], this.state.resultKey);
//       unmaskedBallots.push(unmaskedBallot);
//     }
//     this.setState(() => {
//       return {
//         unmaskedBallotList: unmaskedBallots
//       }
//     })
//     await this.getCandidates();
//     let resultMap = new Map();
//     for (let i = 0; i < this.state.candidates.length; i++) {
//       resultMap.set(this.state.candidates[i].name, 0);
//     }
//     for (let i = 0; i < this.state.unmaskedBallotList.length; i++) {
//       for (let [key, value] of resultMap.entries()) {
//         if (key === this.state.candidates[parseInt(this.state.unmaskedBallotList[i], 10)].name) {
//           resultMap.set(key, value+1);
//         }
//       }
//     }
//     let results = [];
//     for (let [key,value] of resultMap.entries()) {
//       results.push({candidate: key, votes: value});
//     }

//     for (let i = 0; i < results.length; i++) {
//       let min = i;
//       for (let j = i+1; j < results.length; j++) {
//         if (results[j].votes < results[min].votes){
//           min = j
//         }
//       }
//       if (min !== i) {
//         let tmp = results[i];
//         results[i] = results[min];
//         results[min] = tmp;
//       }
//     }
//     results = results.reverse();

//     this.setState(() => {
//       const firstPlace = results[0];
//       const secondPlace = results[1];
//       if (firstPlace.votes !== secondPlace.votes) {
//         return {
//           results: results,
//           winner: firstPlace.candidate
//         }
//       } else {
//         return {
//           results: results,
//           winner: "Draw"
//         }
//       }
//     })
//     console.log(this.state.winner);


//   }

//   render() {
//     return (
//       <div>
//         <p>Election Results</p>
//         <button onClick={this.handleElectionResults}>Get Result</button>
//         {this.state.results.length !== 0 ? <ResultsTable winner={this.state.winner} results={this.state.results}/> : " "}
//       </div>
//     )
//   }
// }

// class ResultsTable extends Component {
//   render() {
//     return (
//       <div>
//         <p>Winner: {this.props.winner}</p>
//         <ReactBootStrap.Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Candidate</th>
//               <th>Votes</th>
//             </tr>
//           </thead>
//           <tbody>
//             {this.props.results.map((result, index) => <ResultEntry key={index} candidate={result.candidate} votes={result.votes}/>)}
//           </tbody>
//         </ReactBootStrap.Table>
//       </div>
//     )
//   }
// }

// class ResultEntry extends Component {
//   render() {
//     return (
//         <tr>
//           <td>{this.props.candidate}</td>
//           <td>{this.props.votes}</td>
//         </tr>
//     )
//   }
// }

// class DeployElection extends Component {
//   constructor(props) {
//     super(props);
//     this.setName = this.setName.bind(this);
//     this.setCandidates = this.setCandidates.bind(this);
//     this.setType = this.setType.bind(this);
//     this.setSelectedTime = this.setSelectedTime.bind(this);
//     this.setValidVoters = this.setValidVoters.bind(this);
//     this.state = {
//       candidates: [],
//       validVoters: [],
//       name: "",
//       electionType: 'FPP',
//       selectedTime: new Date(),
//     }
//   }

//   setName(name) {
//     this.setState(() => {
//       return {
//         name: name
//       }
//     })
//   }

//   setType(type) {
//     this.setState(() => {
//       return {
//         electionType: type
//       }
//     })
//   }

//   setCandidates(candidate, setting) {
//     if (setting === 'add') {
//       this.setState((prevState) => {
//         return {
//           candidates: prevState.candidates.concat(candidate)
//         }
//       })
//     } else if (setting === 'rm') {
//       this.setState((prevState) => {
//         prevState.candidates.pop();
//         return {
//           candidates: prevState.candidates
//         }
//       })
//     } else if (setting === 'rmAll') {
//       this.setState(() => {
//         return {
//           candidates: []
//         }
//       })
//     }
//   }

//   setValidVoters(validVoters) {
//     this.setState(() => {
//       return {
//         validVoters: validVoters
//       }
//     })
//   }

//   setSelectedTime(date) {
//     this.setState(() => {
//       return {
//         selectedTime: date
//       }
//     })
//   }

//   render() {
//     const currentTime = new Date();
//     return (
//       <div>
//         <CandidateList
//           candidates={this.state.candidates}
//         />
//         <AddCandidate
//           setCandidates={this.setCandidates}
//           candidates={this.state.candidates}
//         />
//         <ElectionName
//           setName={this.setName}
//           name={this.state.name}
//         />
//         <ElectionType
//           setType={this.setType}
//         />
//         <DatePicker
//           showTimeSelect
//           selected={this.state.selectedTime}
//           onChange={date => this.setSelectedTime(date)}
//           minDate={setHours(currentTime, 24)}
//           dateFormat="dd/MM/yyyy h:mm aa"
//         />
//         <ValidVoterSubmit
//           setValidVoters={this.setValidVoters}
//         />
//         <SubmitElection
//           electionBuilder={this.props.electionBuilder}
//           accounts={this.props.accounts}
//           candidates={this.state.candidates}
//           web3={this.props.web3}
//           selectedTime={this.state.selectedTime}
//           validVoters={this.state.validVoters}
//           name={this.state.name}
//           electionType={this.state.electionType}
//         />
        
//       </div>
//     )
//   }
// }

// class ElectionName extends Component {
//   constructor(props) {
//     super(props);
//     this.handleSubmitName = this.handleSubmitName.bind(this);
//   }

//   handleSubmitName(e) {
//     e.preventDefault();
//     const name = e.target.elements.setName.value.trim();
//     this.props.setName(name);
//   }
//   render() {
//     if (this.props.name === "") {
//       return (
//         <div>
//           <p>Election Name</p>
//           <form onSubmit={this.handleSubmitName}>
//             <input type="text" name="setName"/>
//             <button>Set Name</button>
//           </form>
//         </div>
//       )
//     } else {
//       return (
//         <div>
//           Election name: {this.props.name}
//         </div>
//       )
//     }
//   }
// }

// class CandidateList extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div>
//         <p>Candidates</p>
//         {
//           this.props.candidates.map((candidate) => <Candidate key={candidate} candidateValue={candidate}/>)
//         }
//       </div>
//     )
//   }
// }

// class Candidate extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div>
//         {this.props.candidateValue}
//       </div>
//     )
//   }
// }

// class AddCandidate extends Component {
//   constructor(props) {
//     super(props);
//     this.handleAddCandidates = this.handleAddCandidates.bind(this);
//     this.handleRemove = this.handleRemove.bind(this);
//     this.handleRemoveAll = this.handleRemoveAll.bind(this);
//   }

//   handleAddCandidates(e) {
//     e.preventDefault();
//     const candidate = e.target.elements.addCandidates.value.trim();
//     this.props.setCandidates(candidate, 'add');
//     e.target.elements.addCandidates.value = '';
//   }

//   handleRemove() {
//     this.props.setCandidates(undefined, 'rm');
//   }

//   handleRemoveAll() {
//     this.props.setCandidates(undefined, 'rmAll');
//   }

//   render() {
//     return(
//       <div>
//         <form onSubmit={this.handleAddCandidates}>
//           <input type="text" name="addCandidates"/>
//           <button>Add Candidate</button>
//         </form>
//         <button onClick={this.handleRemove}>Remove</button>
//         <button onClick={this.handleRemoveAll}>Remove all</button>
//       </div>
//     )
//   }
// }

// class ElectionType extends Component {
//   constructor(props){
//     super(props);
//     this.handleSubmitType = this.handleSubmitType.bind(this);
//   }

//   handleSubmitType(e) {
//     e.preventDefault();
//     this.props.setType(this.electionType.value);
//   }

//   render() {
//     return (
//       <div>
//         <p>Election Settings</p>
//         <form onChange={this.handleSubmitType}>
//             <select ref={(input) => this.electionType = input} className='selectElectionType'>
//               <option>{'FPP'}</option>
//               <option>{'STV'}</option>
//             </select>
//         </form>
//       </div>
//     )
//   }
// }

// class ValidVoterSubmit extends Component {
//   constructor(props){
//     super(props);
//     this.handleUploadIdFile = this.handleUploadIdFile.bind(this);
//   }

//   handleUploadIdFile(e) {
//     e.preventDefault();
//     let file = e.target.files;
//     let reader = new FileReader();
//     reader.readAsText(file[0]);
//     let validVoters = [];
//     reader.onload = (e) => {
//       const fileContent = e.target.result.trim().split(",");
//       this.props.setValidVoters(fileContent);
//     }
//   }

//   render() {
//     return (
//       <div>
//         <input type="file" name="file" onChange={this.handleUploadIdFile}/>
//       </div>
//     )
//   }
// }

// class SubmitElection extends Component {
//   constructor(props){
//     super(props);
//     this.handleDeployElection = this.handleDeployElection.bind(this);
//   }



//   async handleDeployElection() {
//     const selectedTimestamp = Math.ceil(this.props.selectedTime.getTime() / 1000);
//     const currentTimestamp = Math.floor(Date.now() / 1000);
//     const time = selectedTimestamp - currentTimestamp;
//     const date = new Date(selectedTimestamp * 1000);
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul;", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     const month = months[date.getMonth()];
//     let hours = date.getHours();
//     let minutes = date.getMinutes();
//     let day = date.getDate();
//     if (hours < 10) hours = "0" + hours;
//     if (minutes < 10) minutes = "0" + minutes;
//     if (day < 10) day = "0" + day;
//     const timeStrFormat = hours + ":" + minutes + "/" + day + "/" + month + "/" + date.getFullYear();

//     const encrypt = require("./encrypt");
//     const keys = encrypt.generateKeys();
//     const electionKey = keys.public_key;
//     const resultKey = keys.private_key;
    
//     let hashedVoterIds = [];
//     for (let i = 0; i < this.props.validVoters.length; i++) {
//       let hash = encrypt.hashVoterId(this.props.validVoters[i]);
//       hashedVoterIds.push(hash);
//     }
//     const validVoterCount = hashedVoterIds.length;
    
//     await this.props.electionBuilder.methods.deployElection(this.props.name, this.props.candidates, time, timeStrFormat, this.props.electionType, electionKey, resultKey, hashedVoterIds, validVoterCount).send({from: this.props.accounts[0]});
//   }

//   render() {
//     return (
//       <div>
//         <button onClick={this.handleDeployElection} disabled={this.props.candidates.length < 2 || this.props.name === ""}>Deploy Election</button>
//       </div>
//     )
//   }
// }

// class ElectionStastics extends Component {
//   render() {
//     return (
//       <div>
//         <p>Your Elections</p>
//       </div>
//     )
//   }
// }

export default App;
