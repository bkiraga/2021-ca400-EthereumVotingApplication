import React, { Component } from "react";
import DatePicker from "react-datepicker";


class DeadlineDatePicker extends Component {
  constructor(props) {
      super(props)
  }

  render() {
      const date = new Date();
      const isToday = date.getDate() === this.props.selectedTime.getDate();
      let currentHour = date.getHours();
      let currentMinutes = date.getMinutes();
      if (!isToday) {
          currentHour = 0;
      }
      return (
        <DatePicker
          showTimeSelect
          selected={this.props.selectedTime}
          onChange={date => this.props.setSelectedTime(date)}
          minDate={date}
          minTime={new Date(date.setHours(currentHour, currentMinutes, 0, 0))}
          maxTime={new Date(date.setHours(23, 59, 0, 0))}
          timeIntervals={1}
          dateFormat="dd/MM/yyyy h:mm aa"
        />
      )
  }
}

export default DeadlineDatePicker;