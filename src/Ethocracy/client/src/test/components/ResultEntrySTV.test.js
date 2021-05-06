import React from 'react';
import ReactDOM from 'react-dom';
import ResultEntrySTV from '../../components/ElectionVote/ResultEntrySTV';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <table>
      <tbody>
        <ResultEntrySTV />
      </tbody>
    </table>, div);
  ReactDOM.unmountComponentAtNode(div);
});