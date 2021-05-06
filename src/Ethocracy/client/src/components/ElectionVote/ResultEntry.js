import React, { Component } from "react";

class ResultEntry extends Component {
    render() {
      return (
        <tr>
          <td>{this.props.candidate}</td>
          <td>{this.props.votes}</td>
        </tr>
      )
    }
  }

  export default ResultEntry;