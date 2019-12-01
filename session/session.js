import React, { useState } from 'react';

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

  function renderMachineList() {
    return <div data-cy="machine-list">
      <h3>Machine List</h3>
      <button
        className="btn btn-primary"
        data-cy="control-link"
        onClick={ e => setControlOpen(true) }
      >
        Open Control
      </button>
    </div>
  }

  function renderBody() {
    return isControlOpen ? renderControl() : renderMachineList();
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
