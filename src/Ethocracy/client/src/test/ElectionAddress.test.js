import React from 'react';
import ReactDOM from 'react-dom';
import ElectionAddress from '../components/ElectionAddress';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ElectionAddress />, div);
  ReactDOM.unmountComponentAtNode(div);
});