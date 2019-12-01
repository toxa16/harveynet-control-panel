import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import 'bootstrap/dist/css/bootstrap.min.css';

import Main from './main';
import Session from '../session/session';
import Control from '../control/control';

const root = document.getElementById('root');
ReactDOM.render(
  <Main SessionComponent={Session} ControlComponent={Control} />,
  root,
);
