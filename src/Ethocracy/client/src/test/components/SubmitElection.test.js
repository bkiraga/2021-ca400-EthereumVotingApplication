import React from 'react';
import ReactDOM from 'react-dom';
import SubmitElection from '../../components/ElectionDeployment/SubmitElection';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SubmitElection candidates={[]}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});