import React from 'react';
import ReactDOM from 'react-dom';
import STVSeatCountPicker from '../components/STVSeatCountPicker';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<STVSeatCountPicker />, div);
  ReactDOM.unmountComponentAtNode(div);
});