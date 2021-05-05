import React from 'react';
import ReactDOM from 'react-dom';
import VoteInterface from '../components/VoteInterface';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VoteInterface />, div);
  ReactDOM.unmountComponentAtNode(div);
});