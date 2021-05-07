import React, { Component } from "react";
import { Form, Row } from "react-bootstrap";

class STVSeatCountPicker extends Component {
  constructor(props) {
      super(props);
      this.handleSubmitSeatCount = this.handleSubmitSeatCount.bind(this);
  }

  handleSubmitSeatCount(e) {
    e.preventDefault();
    this.props.setSTVSeatCount(this.electionSeatCount.value);
  }

  render() {
    const candidateCount = this.props.candidates.length;
    const seatCountOptions = [];
    for (let i = 2; i < candidateCount; i++) {
      seatCountOptions.push(i);
    }
    return (     
      <Row className="justify-content-md-center" style={{padding: "1rem"}}>
        <Form onChange={this.handleSubmitSeatCount}>
          <Form.Control as="select" ref={(input) => this.electionSeatCount = input} className='selectElectionSeatCount' size="sm" style={{width: "80px"}}>
            {seatCountOptions.map((count) => {
                return <option key={count} value={count}>{count}</option>
            })}
          </Form.Control>
        </Form>
      </Row>
    )
  }
}

export default STVSeatCountPicker;