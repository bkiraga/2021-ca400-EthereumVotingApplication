import React from 'react';
import ReactDOM from 'react-dom';
import SelectCandidate from '../components/SelectCandidate';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SelectCandidate />, div);
  ReactDOM.unmountComponentAtNode(div);
});