import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// const generateGreeting = (name) => `Hello ${name}!`;
// test('test test', () => {
//   const result = generateGreeting("abc");
//   expect(result).toBe(`Hello abc!`);
// })
