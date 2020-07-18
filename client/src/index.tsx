import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <div style={{height: '100vh'}}>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
