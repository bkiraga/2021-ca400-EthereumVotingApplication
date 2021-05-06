import React from 'react';
import ReactDOM from 'react-dom';
import DeadlineDatePicker from '../../components/ElectionDeployment/DeadlineDatePicker';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const selectedTime = new Date();
  ReactDOM.render(<DeadlineDatePicker selectedTime={selectedTime}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});