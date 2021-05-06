import React from 'react';
import ReactDOM from 'react-dom';
import MyBallotsEntry from '../../components/UserBallots/MyBallotsEntry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <table>
      <tbody>
        <MyBallotsEntry />
      </tbody>
    </table>, div);
  ReactDOM.unmountComponentAtNode(div);
});