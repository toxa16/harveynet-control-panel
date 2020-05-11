import React from 'react';


export default function NavbarView({ authenticated }) {
  function renderLogoutLink() {
    if (authenticated) {
      return (
        <li className="nav-item">
          <a href="/logout" className="nav-link">Logout</a>
        </li>
      );
    }
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand">
          <b>HarveyNet</b> Control Panel (v0.1.1)
        </span>

        <ul className="navbar-nav">
          { renderLogoutLink() }
        </ul>
      </div>
    </nav>
  );
}
