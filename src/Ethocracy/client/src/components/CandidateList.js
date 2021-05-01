import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import Candidate from "./Candidate";

class CandidateList extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
          <ListGroup>
          {
            this.props.candidates.map((candidate) => <Candidate key={candidate} candidateValue={candidate}/>)
          }
            
          </ListGroup>
        </div>
      )
    }
  }

  export default CandidateList;