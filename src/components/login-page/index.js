import React from 'react';
import { Link } from '@reach/router';


export default function LoginPage() {
  return (
    <div data-testid="login-page">
      <h1 className="mb-5">Login</h1>
      
      <div>
        <Link to="/panel" className="btn btn-outline-primary">
          Login
        </Link>
      </div>
    </div>
  );
}
