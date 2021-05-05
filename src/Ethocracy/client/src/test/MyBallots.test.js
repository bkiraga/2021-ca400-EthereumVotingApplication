import React from 'react';
import ReactDOM from 'react-dom';
import MyBallots from '../components/MyBallots';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyBallots />, div);
  ReactDOM.unmountComponentAtNode(div);
});