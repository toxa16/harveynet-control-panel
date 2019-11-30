import React from 'react';

/**
 * Navbar component.
 */
export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand">
          <b>HarveyNet</b> Control Panel (v0.0.4)
        </span>
        <a href="/logout" className="text-white" data-cy="logout">Logout</a>
      </div>
    </nav>
  );
}
