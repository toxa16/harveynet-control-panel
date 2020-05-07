import qs from 'qs';


const auth0url = process.env.REACT_APP_AUTH0_URL;
const client_id = process.env.REACT_APP_AUTH0_CLIENT_ID;
const returnTo = process.env.REACT_APP_BASE_URL;

const query = qs.stringify({ client_id, returnTo });
const logoutUrl = `${auth0url}/logout?${query}`;


/**
 * Quasi-component performing logout logic.
 */
export default function Logout() {
  window.location.href = logoutUrl;
  return null;
}
