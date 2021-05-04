import React, { Component } from "react";
import { Container, Table } from "react-bootstrap";
import MyElectionEntry from "./MyElectionsEntry";

class MyElectionsTable extends Component {
  constructor(props) {
      super(props)
  }
  render() {
    return(
      <Container>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Type</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {this.props.myElections.map((myElection, index) => <MyElectionEntry key={index} name={myElection.name} address={myElection.address} type={myElection.type} deadline={myElection.deadline}/>)}
          </tbody>
      </Table>
      </Container>
    )
  }
}

export default MyElectionsTable