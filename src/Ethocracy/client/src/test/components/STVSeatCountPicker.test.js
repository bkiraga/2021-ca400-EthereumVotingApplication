import React from 'react';
import ReactDOM from 'react-dom';
import STVSeatCountPicker from '../../components/ElectionDeployment/STVSeatCountPicker';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<STVSeatCountPicker candidates={[]} setSTVSeatCount={() => {}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});