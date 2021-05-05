import React from 'react';
import ReactDOM from 'react-dom';
import Vote from '../components/Vote';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Vote />, div);
  ReactDOM.unmountComponentAtNode(div);
});