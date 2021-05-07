import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";

class Candidate extends Component {
    constructor(props) {
      super(props);
      this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove() {
      this.props.setCandidates(this.props.candidateValue, 'rm');
    }

    render() {
      return (
        <div>
          <ListGroup.Item action onClick={this.handleRemove}>{this.props.candidateValue} </ListGroup.Item>  
        </div>
      )
    }
  }

  export default Candidate;