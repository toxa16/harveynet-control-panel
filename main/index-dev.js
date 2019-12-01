import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Main from './main';
import SessionStub from './SessionStub';

const root = document.getElementById('root');
ReactDOM.render(
  <Main SessionComponent={SessionStub} />,
  root,
);
