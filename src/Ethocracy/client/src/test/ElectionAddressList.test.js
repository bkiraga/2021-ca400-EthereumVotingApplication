import React from 'react';
import ReactDOM from 'react-dom';
import ElectionAddressList from '../components/ElectionAddressList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ElectionAddressList />, div);
  ReactDOM.unmountComponentAtNode(div);
});