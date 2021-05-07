import React, { Component } from "react";
import { Form, InputGroup } from "react-bootstrap";
import STVSeatCountPicker from "./STVSeatCountPicker";

class ElectionType extends Component {
    constructor(props){
      super(props);
      this.handleSubmitType = this.handleSubmitType.bind(this);
    }
  
    handleSubmitType(e) {
      e.preventDefault();
      this.props.setType(this.electionType.value);
      if (this.electionType.value === "FPP") {
        this.props.setSTVSeatCount(0);
      }
    }
  
    render() {
      return (
        <div>
          <Form onChange={this.handleSubmitType}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Electoral System</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control as="select" ref={(input) => this.electionType = input} className='selectElectionType'>
                <option label="First Past the Post">{'FPP'}</option>
                <option label="Single Transferable Vote">{'STV'}</option>
              </Form.Control>
            </InputGroup>
          </Form>
          {this.props.type === "STV" ? <STVSeatCountPicker candidates={this.props.candidates} setSTVSeatCount={this.props.setSTVSeatCount}/>: " "}
        </div>
      )
    }
  }

  export default ElectionType;