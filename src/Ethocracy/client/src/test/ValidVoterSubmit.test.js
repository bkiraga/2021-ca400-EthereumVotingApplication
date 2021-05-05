import React from 'react';
import ReactDOM from 'react-dom';
import ValidVoterSubmit from '../components/ValidVoterSubmit';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ValidVoterSubmit />, div);
  ReactDOM.unmountComponentAtNode(div);
});