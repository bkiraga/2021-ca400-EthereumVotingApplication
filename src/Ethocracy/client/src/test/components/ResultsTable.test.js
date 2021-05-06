import React from 'react';
import ReactDOM from 'react-dom';
import ResultsTable from '../../components/ElectionVote/ResultsTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ResultsTable results={[]}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});