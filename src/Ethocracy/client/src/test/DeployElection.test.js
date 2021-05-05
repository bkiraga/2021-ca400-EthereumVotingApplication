import React from 'react';
import ReactDOM from 'react-dom';
import DeployElection from '../components/DeployElection';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DeployElection />, div);
  ReactDOM.unmountComponentAtNode(div);
});