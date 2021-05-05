import React from 'react';
import ReactDOM from 'react-dom';
import ElectionResults from '../components/ElectionResults';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ElectionResults />, div);
  ReactDOM.unmountComponentAtNode(div);
});