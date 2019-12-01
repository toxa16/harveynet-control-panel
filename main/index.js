import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Main from './main';
import Session from '../session/session';

const root = document.getElementById('root');
ReactDOM.render(
  <Main SessionComponent={Session} />,
  root,
);
