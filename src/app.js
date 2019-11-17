import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import ConnectedNavbar from './navbar/connected-navbar';
import ConnectedLoginForm from './login-form/connected-login-form';
import ConnectedMachineList from './machine-list/connected-machine-list';

export default function App({ username }) {
  function renderBody() {
    if (username) {
      return <div id="restricted-page">
        <ConnectedMachineList />
      </div>;
    } else {
      return <ConnectedLoginForm />;
    }
  }

  return (
    <div>
      <ConnectedNavbar />
      <div className="container pt-5">
        { renderBody() }
      </div>
    </div>
  );
}
