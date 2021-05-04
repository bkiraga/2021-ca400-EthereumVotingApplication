import React, { Component } from "react";
import * as ReactBootStrap from "react-bootstrap";
import MyBallotsEntry from "./MyBallotsEntry";

class MyBallotsTable extends Component {
  constructor(props) {
      super(props)
  }
  render() {
    return(
      <div>
        <ReactBootStrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>Election Name</th>
              <th>Election Address</th>
              <th>Ballot</th>
            </tr>
          </thead>
          <tbody>
            {this.props.myBallots.map((myBallot, index) => <MyBallotsEntry key={index} name={myBallot.name} address={myBallot.electionAddress} ballot={myBallot.ballot}/>)}
          </tbody>
      </ReactBootStrap.Table>
      </div>
    )
  }
}

export default MyBallotsTable;