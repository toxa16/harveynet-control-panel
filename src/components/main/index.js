import { useEffect } from 'react';
import { navigate } from '@reach/router';


function getParameterByName(name) {
  var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function getAccessToken() {
  return getParameterByName('access_token');
}


export default function Main({ children }) {
  useEffect(() => {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(x => x.match(/^access_token=/));
    if (tokenCookie) {
      navigate('/panel');
    } else {
      const tokenFromFragment = getAccessToken();
      if (tokenFromFragment) {
        document.cookie = `access_token=${tokenFromFragment}`;
        navigate('/panel');
      } else {
        navigate('/login');
      }
    }
  }, []);

  return children;
}
