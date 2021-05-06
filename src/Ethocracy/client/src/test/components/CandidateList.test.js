import React from 'react';
import ReactDOM from 'react-dom';
import CandidateList from '../../components/ElectionDeployment/CandidateList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CandidateList candidates={[]}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});