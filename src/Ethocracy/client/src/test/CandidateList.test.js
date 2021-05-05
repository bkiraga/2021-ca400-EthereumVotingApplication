import React from 'react';
import ReactDOM from 'react-dom';
import CandidateList from '../components/CandidateList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CandidateList />, div);
  ReactDOM.unmountComponentAtNode(div);
});