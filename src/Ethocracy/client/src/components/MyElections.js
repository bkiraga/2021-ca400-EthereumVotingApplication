import React, { Component } from "react";
import * as ReactBootStrap from "react-bootstrap";
import MyElectionsTable from "./MyElectionsTable";

class MyElections extends Component {
  constructor(props) {
    super(props);
    // this.handleGetMyElections = this.handleGetMyElections.bind(this);
    // this.handleGetMyVotes = this.handleGetMyVotes.bind(this);
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
    console.log(myElections);

    this.setState(() => {
      return {
        myElections: myElections
      }
    })
    console.log(this.state.myElections);
  }

  // async getElections() {
  //   let elections = [];
  //   let electionCount = await this.props.electionBuilder.methods.electionCount().call();
  //   for (let i = 0; i < electionCount; i++) {
  //     let electionAddress = await this.props.electionBuilder.methods.elections(i).call();
  //     let electionData = await this.props.electionBuilder.methods.getElectionData(electionAddress).call();
  //     let election = {name: electionData.name, address: electionAddress, type: electionData.electionType, deadline: electionData.deadline};
  //     elections.push(election);
  //   }
  //   this.setState(() => {
  //     return {
  //       elections: elections
  //     }
  //   })
  // }

  render() {
    return (
      <div>
        <p>My Elections</p>
        <MyElectionsTable myElections={this.state.myElections}/>
        {/* <ReactBootStrap.Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Type</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {this.state.myElections.map((myElection, index) => <ElectionAddress key={index} name={myElection.name} address={myElection.address} type={election.type} deadline={election.deadline}/>)}
              </tbody>
            </ReactBootStrap.Table> */}

      </div>
    );
  }
}

export default MyElections;