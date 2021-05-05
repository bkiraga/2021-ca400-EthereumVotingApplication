import React, { Component } from "react";
import { Container, Table } from "react-bootstrap";
import MyBallotsEntry from "./MyBallotsEntry";

class MyBallotsTable extends Component {
  constructor(props) {
    super(props);
    this.breakBallot = this.breakBallot.bind(this);
  }

  // breaks strings into size 16 chunks seperated by newline characters to allow proper display
  breakBallot(ballot) {
    let chunks = []
    let i = 0;
    let n = ballot.length;
    while (i < n) {
      chunks.push(ballot.slice(i, i+=16))
      chunks.push("\n")
    }
    let formattedBallots = chunks.join("");
    return formattedBallots;
  }

  render() {
    return (
      <Container>
          <Table striped bordered hover responsive>
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
                  ballot={this.breakBallot(myBallot.ballot)}
                />
              ))}
            </tbody>
          </Table>
      </Container>
    );
  }
}

export default MyBallotsTable;
