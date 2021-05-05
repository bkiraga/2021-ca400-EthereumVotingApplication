import React from 'react';
import ReactDOM from 'react-dom';
import MyBallotsEntry from '../components/MyBallotsEntry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyBallotsEntry />, div);
  ReactDOM.unmountComponentAtNode(div);
});