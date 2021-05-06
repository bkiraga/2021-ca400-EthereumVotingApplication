import React from 'react';
import ReactDOM from 'react-dom';
import ElectionName from '../../components/ElectionDeployment/ElectionName';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ElectionName name={"testName"}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});