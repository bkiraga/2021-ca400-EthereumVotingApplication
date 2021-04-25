import React, { Component } from "react";

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

  export default Candidate;