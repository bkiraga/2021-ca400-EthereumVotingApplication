import React, { Component } from "react";
import { Container, Table } from "react-bootstrap";
import MyBallotsEntry from "./MyBallotsEntry";

class MyBallotsTable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Election Name</th>
                <th>Election Address</th>
                <th>Ballot</th>
              </tr>
            </thead>
            <tbody>
              {this.props.myBallots.map((myBallot, index) => (
                <MyBallotsEntry
                  key={index}
                  name={myBallot.name}
                  address={myBallot.electionAddress}
                  ballot={myBallot.ballot}
                />
              ))}
            </tbody>
          </Table>
      </Container>
    );
  }
}

export default MyBallotsTable;
