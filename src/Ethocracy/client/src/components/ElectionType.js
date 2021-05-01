import React, { Component } from "react";
import { Form, InputGroup } from "react-bootstrap";

class ElectionType extends Component {
    constructor(props){
      super(props);
      this.handleSubmitType = this.handleSubmitType.bind(this);
    }
  
    handleSubmitType(e) {
      e.preventDefault();
      this.props.setType(this.electionType.value);
    }
  
    render() {
      return (
        <div>
          <Form onChange={this.handleSubmitType}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Election Type</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control as="select" ref={(input) => this.electionType = input} className='selectElectionType'>
                <option>{'FPP'}</option>
                <option>{'STV'}</option>
              </Form.Control>
            </InputGroup>
          </Form>
        </div>
      )
    }
  }

  export default ElectionType;