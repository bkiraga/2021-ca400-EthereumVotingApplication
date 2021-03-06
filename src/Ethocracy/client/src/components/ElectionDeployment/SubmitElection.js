import React, { Component } from "react";
import { hashVoterId } from "../../election_tools/Encrypt";
import { Button } from "react-bootstrap";

class SubmitElection extends Component {
  constructor(props){
    super(props);
    this.handleDeployElection = this.handleDeployElection.bind(this);
    this.state = {
      electionKey: ""
    }
  }

  async handleDeployElection() {
    const selectedTimestamp = Math.ceil(this.props.selectedTime.getTime() / 1000);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const time = selectedTimestamp - currentTimestamp;
    if (time < 0) {
      alert("incorrect time selected");
      return;
    }
    const date = new Date(selectedTimestamp * 1000);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul;", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let day = date.getDate();
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (day < 10) day = "0" + day;
    const timeStrFormat = hours + ":" + minutes + "/" + day + "/" + month + "/" + date.getFullYear();

    await fetch(`/api/generateKeys?name=${encodeURIComponent(this.props.name)}&deadline=${selectedTimestamp}`)
      .then(response => response.json())
      .then(data => this.setState(() => {
        return {
          electionKey: data.public_key
        }
      }));
      let hashedVoterIds = [];
      for (let i = 0; i < this.props.validVoters.length; i++) {
        let hash = hashVoterId(this.props.validVoters[i]);
        hashedVoterIds.push(hash);
      }
      const validVoterCount = hashedVoterIds.length;
      try {
        await this.props.electionBuilder.methods.deployElection(this.props.name, this.props.candidates, time, timeStrFormat, this.props.electionType, this.props.stvSeatCount, this.state.electionKey, hashedVoterIds, validVoterCount).send({from: this.props.accounts[0]});
      } catch (e) {
        alert("Election not deployed");
      } finally {
        this.props.setName("");
      }
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleDeployElection} disabled={this.props.candidates.length < 2 || this.props.name === ""}>Deploy Election</Button>
      </div>
    )
  }
}

export default SubmitElection;