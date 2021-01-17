import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './components/my-component';

ReactDOM.render(
  <React.StrictMode>
    <MyComponent />
  </React.StrictMode>,
  document.querySelector('#root'),
);
