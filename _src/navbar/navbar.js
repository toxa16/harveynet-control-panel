import React from 'react';

/**
 * Navbar component.
 */
export default function Navbar({ username, onLogout }) {
  function renderLogoutButton() {
    return username &&
      <button
        id="logout-button"
        className="btn btn-link text-white"
        onClick={ e => onLogout && onLogout() }
      >
        Log out ({ username })
      </button>;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand">
          <b>HarveyNet</b> Control Panel (v0.0.4)
        </span>
        { /* renderLogoutButton() */ }
        <a href="/logout" className="text-white">Logout</a>
      </div>
    </nav>
  );
}
