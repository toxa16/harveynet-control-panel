import { useEffect } from 'react';


export default function Logout() {
  useEffect(() => {
    document.cookie = 'access_token=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
  }, []);

  return null;
}
