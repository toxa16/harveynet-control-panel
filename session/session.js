import React, { useState } from 'react';

import MachineList from './machine-list';
import ControlContainer from './control-container';
import SessionConnecting from './components/session-connecting';

export default function Session({ ControlComponent }) {
  const [isControlOpen, setControlOpen] = useState(false);
  const [isWebSocketOpen, setWebSocketOpen] = useState(false);

  function renderSessionContent() {}

  function renderBody() {
    return isControlOpen ?
      <ControlContainer
        onSessionClick={ () => setControlOpen(false) }
        ControlComponent={ControlComponent}
      /> :
      <SessionConnecting />;
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
