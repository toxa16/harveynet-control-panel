import React from 'react';
import { Router } from '@reach/router';

import Main from './components/main';
import Panel from './panel';
import LoginPage from './components/login-page';
import Navbar from './components/navbar';
import Logout from './components/logout';


export default function App() {
  return (
    <div>
      <Navbar />

      <div className="container mt-5">
        <Router>
          <Main path="/">
            <LoginPage path="/login" />
            <Panel path="/panel" />
            <Logout path="/logout" />
          </Main>
        </Router>
      </div>
    </div>
  );
}
