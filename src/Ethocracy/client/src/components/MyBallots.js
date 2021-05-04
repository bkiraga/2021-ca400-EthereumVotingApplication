import React, { Component } from "react";
import * as ReactBootStrap from "react-bootstrap";
import MyBallotsTable from "./MyBallotsTable";

class MyBallots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myBallots: []
    }
  }

  componentDidMount = async () => {
    const ballots = await this.props.electionBuilder.methods.getUserBallots(this.props.accounts[0]).call();
    this.setState(() => {
      return {
        myBallots: ballots
      }
    })
  }

  render() {
    return (
      <div>
        <p>My Ballots</p>
        <MyBallotsTable myBallots={this.state.myBallots}/>
      </div>
    );
  }
}

export default MyBallots;