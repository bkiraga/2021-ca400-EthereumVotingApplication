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
import { Col, Container, FormGroup, Row } from "react-bootstrap";

class DeployElection extends Component {
  constructor(props) {
    super(props);
    this.setName = this.setName.bind(this);
    this.setCandidates = this.setCandidates.bind(this);
    this.setType = this.setType.bind(this);
    this.setSelectedTime = this.setSelectedTime.bind(this);
    this.setValidVoters = this.setValidVoters.bind(this);
    this.setSTVSeatCount = this.setSTVSeatCount.bind(this);
    this.state = {
      candidates: [],
      validVoters: [],
      name: "",
      electionType: 'FPP',
      selectedTime: new Date(),
      stvSeatCount: 0
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
      if (!this.state.candidates.includes(candidate)){
        this.setState((prevState) => {
          return {
            candidates: prevState.candidates.concat(candidate)
          }
        })
      }
    } else if (setting === 'rm') {
      this.setState((prevState) => {
        let arr = prevState.candidates;
        let index = arr.indexOf(candidate);
        arr.splice(index, 1);
        // prevState.candidates.pop();
        return {
          // candidates: prevState.candidates 
          candidates: arr
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

  setSTVSeatCount(count) {
    this.setState(() => {
      return {
        stvSeatCount: count
      }
    })
  }

  render() {
    return (
      <Container style={{padding: "5rem"}}>
        <Row className="justify-content-md-center">
          <Col sm={2}></Col>
          <Col sm={6}>

          <FormGroup>
          <CandidateList
              candidates={this.state.candidates}
              setCandidates={this.setCandidates}
            />
          <AddCandidate
            setCandidates={this.setCandidates}
            candidates={this.state.candidates}
            />
          <br />
          
          <ElectionName
          setName={this.setName}
          name={this.state.name}
          electionBuilder={this.props.electionBuilder}
        />
        <br />
        <ElectionType
          setType={this.setType}
          type={this.state.electionType}
          candidates={this.state.candidates}
          setSTVSeatCount={this.setSTVSeatCount}
        />
        <br />
          <DeadlineDatePicker
          selectedTime={this.state.selectedTime}
          setSelectedTime={this.setSelectedTime}
           />
          <br />
          <br />
                  
        <ValidVoterSubmit
        setValidVoters={this.setValidVoters}
      />
      <br />

      <SubmitElection
        electionBuilder={this.props.electionBuilder}
        accounts={this.props.accounts}
        candidates={this.state.candidates}
        web3={this.props.web3}
        selectedTime={this.state.selectedTime}
        validVoters={this.state.validVoters}
        name={this.state.name}
        electionType={this.state.electionType}
        stvSeatCount={this.state.stvSeatCount}
      />

          </FormGroup>
 
          </Col>
          <Col sm={2}></Col> 
        </Row>
        <Row className="justify-content-md-center">
          <Col>
          </Col>
          <Col>
          </Col>
        </Row>        
      </Container>
    )
  }
}

export default DeployElection;