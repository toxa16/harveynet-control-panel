import React, { useState } from 'react';

import MachineList from './machine-list';
import ControlContainer from './control-container';

export default function Session() {
  const [isControlOpen, setControlOpen] = useState(false);

  function renderControl() {
    return <div data-cy="control">
      <h3>Control</h3>
      <button
        className="btn btn-primary"
        data-cy="session-link"
        onClick={ e => setControlOpen(false) }
      >
        Back To Session
      </button>
    </div>
  }

  function renderBody() {
    return isControlOpen ?
      <ControlContainer /> :
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
