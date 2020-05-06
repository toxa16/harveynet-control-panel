import { useEffect } from 'react';
import { navigate } from '@reach/router';


export default function Main({ children }) {
  useEffect(() => {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(x => x.match(/^access_token=/));
    if (tokenCookie) {
      navigate('/panel');
    } else {
      navigate('/login');
    }
  }, []);

  return children;
}
