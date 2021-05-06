import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../../components/Home/Home';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});