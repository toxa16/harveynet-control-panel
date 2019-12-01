import React, { useState } from 'react';

import MachineList from './machine-list';
import ControlContainer from './control-container';

export default function Session({ ControlComponent }) {
  const [isControlOpen, setControlOpen] = useState(false);

  function renderBody() {
    return isControlOpen ?
      <ControlContainer
        onSessionClick={ () => setControlOpen(false) }
        ControlComponent={ControlComponent}
      /> :
      <MachineList onControlClick={ () => setControlOpen(true) } />;
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
