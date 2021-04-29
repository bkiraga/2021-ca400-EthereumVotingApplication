import React, { Component } from "react";
import CandidateList from "./CandidateList";
import AddCandidate from "./AddCandidate";
import ElectionName from "./ElectionName";
import ElectionType from "./ElectionType";
import ValidVoterSubmit from "./ValidVoterSubmit";
import SubmitElection from "./SubmitElection";
import DeadlineDatePicker from "./DeadlineDatePicker";
import DatePicker from "react-datepicker";
import {setMinutes, setHours} from "date-fns";

class DeployElection extends Component {
  constructor(props) {
    super(props);
    this.setName = this.setName.bind(this);
    this.setCandidates = this.setCandidates.bind(this);
    this.setType = this.setType.bind(this);
    this.setSelectedTime = this.setSelectedTime.bind(this);
    this.setValidVoters = this.setValidVoters.bind(this);
    this.state = {
      candidates: [],
      validVoters: [],
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

  setValidVoters(validVoters) {
    this.setState(() => {
      return {
        validVoters: validVoters
      }
    })
  }

  setSelectedTime(date) {
    this.setState(() => {
      return {
        selectedTime: date
      }
    })
  }

  render() {
    console.log(this.state.selectedTime);
    return (
      <div>
        <CandidateList
          candidates={this.state.candidates}
        />
        <AddCandidate
          setCandidates={this.setCandidates}
          candidates={this.state.candidates}
        />
        <ElectionName
          setName={this.setName}
          name={this.state.name}
        />
        <ElectionType
          setType={this.setType}
        />
        <DeadlineDatePicker
          selectedTime={this.state.selectedTime}
          setSelectedTime={this.setSelectedTime}
        />
        <ValidVoterSubmit
          setValidVoters={this.setValidVoters}
        />
        <SubmitElection
          electionBuilder={this.props.electionBuilder}
          accounts={this.props.accounts}
          candidates={this.state.candidates}
          web3={this.props.web3}
          selectedTime={this.state.selectedTime}
          validVoters={this.state.validVoters}
          name={this.state.name}
          electionType={this.state.electionType}
        />
        
      </div>
    )
  }
}

export default DeployElection;