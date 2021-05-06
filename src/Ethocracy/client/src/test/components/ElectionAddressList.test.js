import React from 'react';
import ReactDOM from 'react-dom';
import ElectionAddressList from '../../components/ElectionVote/ElectionAddressList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ElectionAddressList elections={[]}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});