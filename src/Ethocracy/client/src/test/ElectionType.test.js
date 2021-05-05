import React from 'react';
import ReactDOM from 'react-dom';
import ElectionType from '../components/ElectionType';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ElectionType />, div);
  ReactDOM.unmountComponentAtNode(div);
});