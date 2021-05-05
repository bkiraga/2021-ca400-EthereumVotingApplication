import React from 'react';
import ReactDOM from 'react-dom';
import ResultsTable from '../components/ResultsTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ResultsTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});