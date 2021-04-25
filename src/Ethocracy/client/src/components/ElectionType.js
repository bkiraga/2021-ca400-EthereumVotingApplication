import React, { Component } from "react";

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
          <p>Election Settings</p>
          <form onChange={this.handleSubmitType}>
              <select ref={(input) => this.electionType = input} className='selectElectionType'>
                <option>{'FPP'}</option>
                <option>{'STV'}</option>
              </select>
          </form>
        </div>
      )
    }
  }

  export default ElectionType;