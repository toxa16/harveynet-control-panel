import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import DevLayout from './dev-layout';
import Control from './control';

const root = document.getElementById('root');
ReactDOM.render(
  <DevLayout>
    <Control />
  </DevLayout>,
  root,
);
