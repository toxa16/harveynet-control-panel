import React from 'react';
import { Router } from '@reach/router';

import Main from './components/main';
import Panel from './components/panel';
import LoginPage from './components/login-page';


export default function App() {
  return (
    <Router>
      <Main path="/">
        <LoginPage path="/login" />
        <Panel path="/panel" />
      </Main>
    </Router>
  );
}
