import React from 'react';
import ReactDOM from 'react-dom';
import ResultEntrySTV from '../components/ResultEntrySTV';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ResultEntrySTV />, div);
  ReactDOM.unmountComponentAtNode(div);
});