import React from 'react';
import ReactDOM from 'react-dom';
import MyBallotsTable from '../components/MyBallotsTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyBallotsTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});