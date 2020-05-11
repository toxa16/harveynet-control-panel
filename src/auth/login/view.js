import { useEffect } from 'react';
import qs from 'qs';


/**
 * Quasi-presentational component performing login logic.
 */
export default function LoginView({ location, navigate, onLogin }) {
  useEffect(() => {
    const { hash } = location;
    if (!hash) {
      navigate('/');
    }
    const hashParams = qs.parse(hash.substring(1));
    const { access_token, state } = hashParams;
    if (access_token) {
      onLogin(access_token);
      navigate(state);
    } else {
      navigate('/');
    }
  });

  return null;
}
