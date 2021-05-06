import React, { Component } from "react";
import { Alert } from "react-bootstrap";

class ElectionInfo extends Component {
    constructor(props) {
      super(props);
      this.formatDeadline = this.formatDeadline.bind(this);
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

    formatDeadline = (d) => {
      let time = d.split("/");
      time.splice(1, 0, "on")
      time = time.join(" ");
      return time;  
    }
    
    render() {
      return (
        <div>
          <br />
          <h2>{this.state.electionName}</h2>

          <Alert variant="info">Votes are being accepted until {this.formatDeadline(this.state.electionDeadline)}</Alert> 
        </div>
      )
    }
  }

export default ElectionInfo;