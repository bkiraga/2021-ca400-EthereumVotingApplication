import React, { Component } from "react";
import { Button } from "react-bootstrap";
import ElectionContract from "../../contracts/Election.json";

class ElectionAddress extends Component {
    constructor(props) {
      super(props);
      this.handleOnClick = this.handleOnClick.bind(this);
    }

    async handleOnClick() {
      const contract = await new this.props.web3.eth.Contract(ElectionContract.abi, this.props.address);
      this.props.setContract(contract);
      this.props.setSelectedElection(true);
    }
    

    render() {
      return (
        <tr>
          <td>{this.props.name}</td>
          <td>{this.props.address}</td>
          <td>{this.props.type}</td>
          <td>{this.props.deadline}</td>
          <td><Button onClick={this.handleOnClick} variant="success">Go</Button></td>
        </tr>
      )
    }
  }
  export default ElectionAddress;