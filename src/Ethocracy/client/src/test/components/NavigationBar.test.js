import React from 'react';
import ReactDOM from 'react-dom';
import NavigationBar from '../../components/Home/NavigationBar';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <NavigationBar />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});