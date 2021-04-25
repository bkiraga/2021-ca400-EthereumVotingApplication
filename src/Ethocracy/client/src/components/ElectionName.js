import React, { Component } from "react";

class ElectionName extends Component {
    constructor(props) {
      super(props);
      this.handleSubmitName = this.handleSubmitName.bind(this);
    }
  
    handleSubmitName(e) {
      e.preventDefault();
      const name = e.target.elements.setName.value.trim();
      this.props.setName(name);
    }
    render() {
      if (this.props.name === "") {
        return (
          <div>
            <p>Election Name</p>
            <form onSubmit={this.handleSubmitName}>
              <input type="text" name="setName"/>
              <button>Set Name</button>
            </form>
          </div>
        )
      } else {
        return (
          <div>
            Election name: {this.props.name}
          </div>
        )
      }
    }
  }

  export default ElectionName;