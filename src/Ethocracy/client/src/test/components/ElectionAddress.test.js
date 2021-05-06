import React from 'react';
import ReactDOM from 'react-dom';
import ElectionAddress from '../../components/ElectionVote/ElectionAddress';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <table>
      <tbody>
        <ElectionAddress />
      </tbody>
    </table>, div);
  ReactDOM.unmountComponentAtNode(div);
});