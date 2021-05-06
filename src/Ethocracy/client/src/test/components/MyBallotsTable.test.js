import React from 'react';
import ReactDOM from 'react-dom';
import MyBallotsTable from '../../components/UserBallots/MyBallotsTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyBallotsTable myBallots={[]}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});