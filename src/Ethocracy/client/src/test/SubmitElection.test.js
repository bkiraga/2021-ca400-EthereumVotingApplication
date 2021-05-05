import React from 'react';
import ReactDOM from 'react-dom';
import SubmitElection from '../components/SubmitElection';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SubmitElection />, div);
  ReactDOM.unmountComponentAtNode(div);
});