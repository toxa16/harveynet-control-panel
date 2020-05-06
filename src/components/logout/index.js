import { useEffect } from 'react';
import qs from 'qs';


const auth0url = 'https://dev-gltebumz.eu.auth0.com';   // env
const client_id = 'DQ3X9tFT6PwzF6I2HR_qwy-Xe1WtKWLG';   // env
const returnTo = 'http://localhost:3000';   // env

const query = qs.stringify({ client_id, returnTo });
const logoutUrl = `${auth0url}/logout?${query}`;


export default function Logout() {
  useEffect(() => {
    document.cookie = 'access_token=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    window.location.href = logoutUrl;
  }, []);

  return null;
}
