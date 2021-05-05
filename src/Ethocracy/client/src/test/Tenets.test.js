import React from 'react';
import ReactDOM from 'react-dom';
import Tenets from '../components/Tenets';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tenets />, div);
  ReactDOM.unmountComponentAtNode(div);
});