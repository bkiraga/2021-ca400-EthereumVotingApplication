import React, { Component } from "react";
import * as ReactBootStrap from "react-bootstrap";
import MyElectionsTable from "./MyElectionsTable";

class MyElections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myElections: []
    }
  }

  componentDidMount = async () => {
    let myElections = [];
    const userElectionCount = await this.props.electionBuilder.methods.userElectionCount(this.props.accounts[0]).call();
    for (let i = 0; i < userElectionCount; i++) {
      const electionAddress = await this.props.electionBuilder.methods.electionCreators(this.props.accounts[0], i).call();
      let electionData = await this.props.electionBuilder.methods.getElectionData(electionAddress).call();
      let election = {name: electionData.name, address: electionAddress, type: electionData.electionType, deadline: electionData.deadline};
      myElections.push(election);
    }

    this.setState(() => {
      return {
        myElections: myElections
      }
    })
  }

  render() {
    return (
      <div>
        <br />
        <h1>My Elections</h1>
        <MyElectionsTable myElections={this.state.myElections}/>
      </div>
    );
  }
}

export default MyElections;