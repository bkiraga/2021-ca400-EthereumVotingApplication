import React, { Component } from "react";

class ElectionAddress extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <tr>
          <td>{this.props.name}</td>
          <td>{this.props.address}</td>
          <td>{this.props.type}</td>
          <td>{this.props.deadline}</td>
        </tr>
      )
    }
  }
  export default ElectionAddress;