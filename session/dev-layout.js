import React from 'react';

import Session from './session';

export default function DevLayout() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
        <div className="container">
          <span className="navbar-brand">
            <b>HarveyNet</b> Session Sub-App (dev)
          </span>
        </div>
      </nav>

      <div className="container mt-5">
        <Session />
      </div>
    </div>
  );
}
