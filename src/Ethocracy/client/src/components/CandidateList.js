import React, { Component } from "react";
import Candidate from "./Candidate";

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

  export default CandidateList;