import React from 'react';
import ReactDOM from 'react-dom';
import ResultEntry from '../../components/ElectionVote/ResultEntry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <table>
      <tbody
        ><ResultEntry />
      </tbody>
    </table>, div);
  ReactDOM.unmountComponentAtNode(div);
});