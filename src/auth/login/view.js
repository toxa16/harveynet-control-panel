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
export default function LoginView({ loginRedirect, errorRedirect, location, navigate }) {
  useEffect(() => {
    const urlFragment = location.hash.substring(1);
    const token = getFragmentAccessToken(urlFragment);
    console.log(token);

    if (token) {
      navigate(loginRedirect);
    } else {
      console.log('not logged in')
      navigate(errorRedirect);
    }
  }, []);

  return null;
}
