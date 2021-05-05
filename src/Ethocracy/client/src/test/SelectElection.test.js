import React from 'react';
import ReactDOM from 'react-dom';
import SelectElection from '../components/SelectElection';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SelectElection />, div);
  ReactDOM.unmountComponentAtNode(div);
});