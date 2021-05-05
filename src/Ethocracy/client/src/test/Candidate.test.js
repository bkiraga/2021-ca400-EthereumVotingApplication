import React from 'react';
import ReactDOM from 'react-dom';
import Candidate from '../components/Candidate';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Candidate />, div);
  ReactDOM.unmountComponentAtNode(div);
});