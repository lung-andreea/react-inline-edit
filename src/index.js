import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './Demo';
import 'font-awesome/css/font-awesome.min.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
