import React, { Component } from "react";

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
      <div>
        <form onChange={this.handleSubmitSeatCount}>
          <select ref={(input) => this.electionSeatCount = input} className='selectElectionSeatCount'>
            {seatCountOptions.map((count) => {
                return <option key={count} value={count}>{count}</option>
            })}
          </select>
        </form>
      </div>
    )
  }
}

export default STVSeatCountPicker;