import React, { Component } from "react";
import {Container, Col, Row} from "react-bootstrap";


class MyBallotsEntry extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.address}</td>
        <td>{this.props.ballot}</td>
      </tr>
    )
  }
}

export default MyBallotsEntry;