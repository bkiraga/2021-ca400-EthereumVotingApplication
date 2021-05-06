import React from 'react';
import ReactDOM from 'react-dom';
import ElectionInfo from '../../components/ElectionVote/ElectionInfo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ElectionInfo />, div);
  ReactDOM.unmountComponentAtNode(div);
});