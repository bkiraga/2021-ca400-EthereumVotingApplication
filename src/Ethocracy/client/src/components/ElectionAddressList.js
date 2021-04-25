import React, { Component } from "react";
import * as ReactBootStrap from "react-bootstrap";
import ElectionAddress from "./ElectionAddress";

class ElectionAddressList extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      if (this.props.elections.length == 0) {
        return (
          ""
        )
      } else {
        return (
          <div>
            <p>Elections:</p>
            <ReactBootStrap.Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Type</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {this.props.elections.map((election, index) => <ElectionAddress key={index} name={election.name} address={election.address} type={election.type} deadline={election.deadline}/>)}
              </tbody>
            </ReactBootStrap.Table>
          </div>
        )
      }
    }
  }

  export default ElectionAddressList;