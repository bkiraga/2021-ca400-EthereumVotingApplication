import React, { Component } from "react";
import ResultEntry from "./ResultEntry";
import * as ReactBootStrap from "react-bootstrap";

class ResultsTable extends Component {
    render() {
      return (
        <div>
          <p>Winner: {this.props.winner}</p>
          <ReactBootStrap.Table striped bordered hover>
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Votes</th>
              </tr>
            </thead>
            <tbody>
              {this.props.results.map((result, index) => <ResultEntry key={index} candidate={result.candidate} votes={result.votes}/>)}
            </tbody>
          </ReactBootStrap.Table>
        </div>
      )
    }
  }

  export default ResultsTable;