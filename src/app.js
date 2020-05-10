import React from 'react';
import { Router } from '@reach/router';

import LoginPage from './components/login-page';
import Navbar from './components/navbar';
import Logout from './components/logout';
import ImplicitPanel from './auth/implicit-panel';
import Login from './auth/login';


export default function App() {
  return (
    <div>
      <Navbar />
      
      <div className="container mt-5">
        <Router>
          <LoginPage default />
          <Login path="/login" loginRedirect="/panel" errorRedirect="/" />
          <Logout path="/logout" />
          <ImplicitPanel path="/panel" />
        </Router>
      </div>
    </div>
  );

  /*return (
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
  );*/
}
