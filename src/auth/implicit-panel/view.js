import React from 'react';
import qs from 'qs';

import Panel from '../../panel';


const auth0url = process.env.REACT_APP_AUTH0_URL;
const client_id = process.env.REACT_APP_AUTH0_CLIENT_ID;
const baseUrl = process.env.REACT_APP_BASE_URL;
const redirect_uri = `${baseUrl}/login`;
const response_type = 'token';
const scope = 'openid';

const query = qs.stringify({ response_type, client_id, redirect_uri, scope });
const loginUrl = `${auth0url}/authorize?${query}`;


export default function ImplicitPanelView({ accessToken }) {
  if (!accessToken) {
    window.location.href = loginUrl;
    return null;
  }
  return <Panel />;
}
