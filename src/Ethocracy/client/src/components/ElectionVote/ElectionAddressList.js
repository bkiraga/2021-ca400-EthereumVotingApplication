import React, { Component } from "react";
import { Table } from "react-bootstrap";
import ElectionAddress from "./ElectionAddress";

class ElectionAddressList extends Component {
    constructor(props) {
      super(props);
      
    }
  
    render() {
      return (
        <div>
          <br />
          <h1>Elections</h1>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Type</th>
                <th>Deadline</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {this.props.elections.map((election, index) => <ElectionAddress key={index} name={election.name} address={election.address} type={election.type} deadline={election.deadline} setContract={this.props.setContract} setSelectedElection={this.props.setSelectedElection} web3={this.props.web3}/>)}
            </tbody>
          </Table>
        </div>
      )
    }
  }

  export default ElectionAddressList;