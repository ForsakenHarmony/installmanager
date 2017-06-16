import { render, Component } from 'preact';

import App from './app';

if (process.env.NODE_ENV !== 'production') {
  // require('debug').enable('*');
  require('preact/devtools');
}

if (module.hot) {
  module.hot.accept('./app.js', () => {
    const App = require('./app').default;
    render(
      <App/>
      , document.getElementById('appRoot')
      , document.querySelector('#appRoot > div')
    );
  });
}

render(
  <App/>
  , document.getElementById('appRoot')
  , document.querySelector('#appRoot > div')
);
