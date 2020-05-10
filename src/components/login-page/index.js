import React from 'react';
import { Link } from '@reach/router';


export default function LoginPage() {
  return (
    <div data-testid="login-page">
      <h1 className="mb-5">Welcome to the HarveyNet!</h1>
      
      <div>
        <Link to="/panel" className="btn btn-outline-primary">
          Login
        </Link>
      </div>

      <div className="text-muted">
        <p className="mt-5">This is a Control Panel login screen.</p>
        <p>After clicking "Login" you will be redirected to the Auth0 login page.</p>
        <p>Available users:</p>
        <ul>
          <li>
            <b>alice@email.com</b> - (owning 3 machines: 
            "<i>machine1</i>", "<i>machine2</i>", and "<i>machine3</i>");
          </li>
          <li>
            <b>bob@email.com</b> - (owning 2 machines: 
            "<i>machine4</i>" and "<i>machine5</i>").
          </li>
        </ul>
        <p className="d-none">
          You can also use non-existing usernames (e.g. <i>charlie</i>), 
          they will be treated as users owning zero machines.
        </p>
      </div>
    </div>
  );
}
