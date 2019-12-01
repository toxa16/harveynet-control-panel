import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import DevLayout from './dev-layout';
import Session from './session';

const root = document.getElementById('root');
ReactDOM.render(
  <DevLayout>
    <Session />
  </DevLayout>,
  root,
);
