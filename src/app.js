import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import ConnectedNavbar from './navbar/connected-navbar';
import ConnectedLoginForm from './login-form/connected-login-form';
import RestrictedView from './restricted-view/restricted-view';

export default function App({ username, currentMachine }) {
  function renderBody() {
    if (username) {
      return <RestrictedView currentMachine={currentMachine} />
    } else {
      return <ConnectedLoginForm />;
    }
  }

  return (
    <div>
      <ConnectedNavbar />
      <div className="container pt-5">
        { /* renderBody() */ }
        <h1>App</h1>
      </div>
    </div>
  );
}
