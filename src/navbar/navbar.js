import React from 'react';

/**
 * Navbar component.
 */
export default function Navbar({ isLoggedIn, username, onLogout }) {
  function renderLogoutButton() {
    return isLoggedIn &&
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
        <span className="navbar-brand">Navbar</span>
        { renderLogoutButton() }
      </div>
    </nav>
  );
}
