import React, { Component } from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";

class AddCandidate extends Component {
    constructor(props) {
      super(props);
      this.handleAddCandidates = this.handleAddCandidates.bind(this);
      this.handleRemove = this.handleRemove.bind(this);
      this.handleRemoveAll = this.handleRemoveAll.bind(this);
    }
  
    handleAddCandidates(e) {
      e.preventDefault();
      const candidate = e.target.elements.addCandidates.value.trim();
      this.props.setCandidates(candidate, 'add');
      e.target.elements.addCandidates.value = '';
    }
  
    handleRemove() {
      this.props.setCandidates(undefined, 'rm');
    }
  
    handleRemoveAll() {
      this.props.setCandidates(undefined, 'rmAll');
    }
  
    render() {
      return(
        <div>
          <Form onSubmit={this.handleAddCandidates}>
            <Form.Control type="input" name="addCandidates" placeholder="Candidate Name"/>
            <br />
            <ButtonGroup>
              <Button type="submit" variant="success">Add Candidate</Button>
              <Button onClick={this.handleRemove} variant="secondary">Remove</Button>
              <Button onClick={this.handleRemoveAll} variant="danger">Remove all</Button>
            </ButtonGroup>       
          </Form>
        </div>
      )
    }
  }

  export default AddCandidate;