import React, { Component } from "react";
import { ListGroup, Button, Container, Row, Col } from "react-bootstrap";

class Candidate extends Component {
    constructor(props) {
      super(props);
      this.handleRemove = this.handleRemove.bind(this);
      this.handleHover = this.handleHover.bind(this);
      this.state = {
        hovering: false
      }
    }

    handleRemove() {
      this.props.setCandidates(this.props.candidateValue, 'rm');
    }

    handleHover(v) {
      this.hovering = v;
      console.log(v);
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