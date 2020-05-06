import React from 'react';


export default function Navbar() {
  /*function renderLogoutLink() {
    const cookies = document.cookie.split(';');
    const token = cookies.find(x => x.trim().match(/^access_token=/));
    if (token) {
      return (
        <li className="nav-item">
          <a href="/logout" className="nav-link">Logout</a>
        </li>
      );
    }
  }*/
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand">
          <b>HarveyNet</b> Control Panel (v0.0.3)
        </span>

        <ul className="navbar-nav">
          { /* renderLogoutLink() */ }
          <li className="nav-item">
            <a href="/logout" className="nav-link">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
