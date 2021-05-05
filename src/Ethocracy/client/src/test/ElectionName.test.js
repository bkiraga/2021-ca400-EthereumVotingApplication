import React from 'react';
import ReactDOM from 'react-dom';
import ElectionName from '../components/ElectionName';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ElectionName />, div);
  ReactDOM.unmountComponentAtNode(div);
});