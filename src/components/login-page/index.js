import React from 'react';
import { Link } from '@reach/router';
import qs from 'qs';


const auth0url = 'https://dev-gltebumz.eu.auth0.com';   // env
const response_type = 'token';
const client_id = 'DQ3X9tFT6PwzF6I2HR_qwy-Xe1WtKWLG';   // env
const redirect_uri = 'http://localhost:3000';   // env

const query = qs.stringify({ response_type, client_id, redirect_uri });
const loginUrl = `${auth0url}/authorize?${query}`;


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
