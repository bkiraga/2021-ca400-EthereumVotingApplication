import React, { Component } from "react";

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
          <form onSubmit={this.handleAddCandidates}>
            <input type="text" name="addCandidates"/>
            <button>Add Candidate</button>
          </form>
          <button onClick={this.handleRemove}>Remove</button>
          <button onClick={this.handleRemoveAll}>Remove all</button>
        </div>
      )
    }
  }

  export default AddCandidate;