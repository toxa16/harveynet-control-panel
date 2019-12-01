import React, { useState, useEffect } from 'react';

import MachineList from './machine-list';
import ControlContainer from './control-container';
import SessionConnecting from './components/session-connecting';
import SessionOpen from './components/session-open';

export default function Session({ ControlComponent }) {
  const [isControlOpen, setControlOpen] = useState(false);
  const [isWebSocketOpen, setWebSocketOpen] = useState(false);

  // simulating websocket "open" event
  useEffect(() => {
    setTimeout(() => {
      setWebSocketOpen(true);
    }, 500);
  }, []);

  function renderSessionContent() {
    return isWebSocketOpen ?
      <SessionOpen /> :
      <SessionConnecting /> ;
  }

  function renderBody() {
    return isControlOpen ?
      <ControlContainer
        onSessionClick={ () => setControlOpen(false) }
        ControlComponent={ControlComponent}
      /> :
      renderSessionContent();
    // <MachineList onControlClick={ () => setControlOpen(true) } />
  }

  return (
    <div data-cy="session">
      <h2>Session</h2>
      
      <div className="mt-5">
        { renderBody() }
      </div>
    </div>
  );
}
