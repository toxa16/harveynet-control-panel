import React from 'react';


export default function NavbarView({ accessToken }) {
  function renderLogoutLink() {
    if (accessToken) {
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
          <b>HarveyNet</b> Control Panel (v0.0.3)
        </span>

        <ul className="navbar-nav">
          { renderLogoutLink() }
        </ul>
      </div>
    </nav>
  );
}