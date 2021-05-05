import React from 'react';
import ReactDOM from 'react-dom';
import ResultEntry from '../components/ResultEntry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ResultEntry />, div);
  ReactDOM.unmountComponentAtNode(div);
});