import { useEffect } from 'react';


/**
 * Utility
 * @param {*} fragment 
 */
function getFragmentAccessToken(fragment) {
  const fragmentParts = fragment.split('&');
  const tokenParam = fragmentParts.find(x => x.match(/^access_token=/));
  if (tokenParam) {
    return tokenParam.split('access_token=')[1];
  }
}


/**
 * Quasi-presentational component performing login logic.
 * @param {*} param0 
 */
export default function LoginView({
  loginRedirect, errorRedirect, location, navigate, onLogin,
}) {
  useEffect(() => {
    const { hash } = location;
    const urlFragment = hash ? hash.substring(1) : '';
    const token = getFragmentAccessToken(urlFragment);

    if (token) {
      onLogin(token);
      navigate(loginRedirect);
    } else {
      navigate(errorRedirect);
    }
  });

  return null;
}
