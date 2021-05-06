import React from 'react';
import ReactDOM from 'react-dom';
import AddCandidate from '../../components/ElectionDeployment/AddCandidate';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddCandidate />, div);
  ReactDOM.unmountComponentAtNode(div);
});