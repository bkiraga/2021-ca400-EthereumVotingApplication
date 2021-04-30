import React, { Component } from "react";

class ElectionInfo extends Component {
    constructor(props) {
      super(props);
      this.state = {
        electionName: "",
        electionDeadline: "",
        electionType: ""
      }
    }
  
    componentDidMount = async () => {
      const electionName = await this.props.contract.methods.electionName().call();
      const electionDeadline = await this.props.contract.methods.electionDeadline().call();
      const electionType = await this.props.contract.methods.electionType().call();
      this.setState(() => {
        return {
          electionName: electionName,
          electionDeadline: electionDeadline,
          electionType: electionType
        }
      })
    }
    
    render() {
      return (
        <div>
          <h3>{this.state.electionName}</h3>
          <br/>
          Open until: {this.state.electionDeadline}
        </div>
      )
    }
  }

export default ElectionInfo;