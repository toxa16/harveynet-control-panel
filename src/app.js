import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import ConnectedNavbar from './navbar/connected-navbar';
import MachineList from './machine-list/machine-list';
import ConnectedLoginForm from './login-form/connected-login-form';

export default function App({ username }) {
  function renderBody() {
    if (username) {
      return <div id="restricted-page">
        <MachineList />
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
