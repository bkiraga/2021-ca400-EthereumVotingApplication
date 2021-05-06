import React, { Component } from "react";

class ResultEntrySTV extends Component {
    render() {
      return (
        <tr>
          <td>{this.props.name}</td>
          <td>{this.props.res}</td>
        </tr>
      )
    }
  }

  export default ResultEntrySTV;