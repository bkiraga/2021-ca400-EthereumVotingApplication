import React, { Component } from "react";
import ResultEntry from "./ResultEntry";
import ResultEntrySTV from "./ResultEntrySTV";
import * as ReactBootStrap from "react-bootstrap";

class ResultsTable extends Component {
  constructor(props) {
    super(props)
  }
    render() {
      if (this.props.type === "FPP") {
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
      } else {
        return (
          <div>
            <ReactBootStrap.Table striped bordered hover>
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Win/Loss</th>
                </tr>
              </thead>
              <tbody>
                {this.props.results.map((result, index) => <ResultEntrySTV key={index} name={result.name} res={result.res}/>)}
              </tbody>
            </ReactBootStrap.Table>
          </div>
        )
      }
    }
  }

  export default ResultsTable;