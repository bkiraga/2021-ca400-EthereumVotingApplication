import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";

class Candidate extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
          <ListGroup.Item>{this.props.candidateValue}</ListGroup.Item>
        </div>
      )
    }
  }

  export default Candidate;