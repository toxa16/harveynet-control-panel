import React from 'react';

import SessionConnecting from './session-connecting';
import SessionOpen from './session-open';

export default function SessionContent({ isWebSocketOpen }) {
  //const [isWebSocketOpen, setWebSocketOpen] = useState(false);

  // simulating websocket "open" event
  /*useEffect(() => {
    setTimeout(() => {
      setWebSocketOpen(true);
    }, 500);
  }, []);*/

  function renderBody() {
    return isWebSocketOpen ?
      <SessionOpen /> :
      <SessionConnecting /> ;
  }

  return (
    <div>
      <h2>SessionContent</h2>

      { renderBody() }
    </div>
  );
}
