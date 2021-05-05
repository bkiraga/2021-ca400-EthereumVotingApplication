import React from 'react';
import ReactDOM from 'react-dom';
import DeadlineDatePicker from '../components/DeadlineDatePicker';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DeadlineDatePicker />, div);
  ReactDOM.unmountComponentAtNode(div);
});