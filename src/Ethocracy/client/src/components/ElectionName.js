import React, { Component } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

class ElectionName extends Component {
    constructor(props) {
      super(props);
      this.handleSubmitName = this.handleSubmitName.bind(this);
    }
  
    async handleSubmitName(e) {
      e.preventDefault();
      const name = e.target.elements.setName.value.trim();
      const checkDuplicates = await this.props.electionBuilder.methods.checkDuplicateNames(name).call();
      if (checkDuplicates) {
        this.props.setName(name);
      } else {
        alert("election name taken");
      }
    }
    render() {
      if (this.props.name === "") {
        return (
          <div>
            <Form onSubmit={this.handleSubmitName}>
            <InputGroup>
              <Form.Control type="input" name="setName" placeholder="Election Name"/>
              <InputGroup.Append>
                <Button type="submit" variant="outline-secondary">Set Name</Button>
              </InputGroup.Append> 
              </InputGroup>
            </Form>
          </div>
        )
      } else {
        return (
          <div>
          <Form onSubmit={this.handleSubmitName}>
          <InputGroup>
            <Form.Control disabled type="input" name="setName" placeholder="Election Name"/>
            <InputGroup.Append>
              <Button disabled variant="outline-secondary">Set Name</Button>
            </InputGroup.Append> 
            </InputGroup>
          </Form>
        </div>
        )
      }
    }
  }

  export default ElectionName;