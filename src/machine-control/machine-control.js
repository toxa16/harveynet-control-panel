import React from 'react';

export default function MachineControl({ currentMachine, onExit }) {
  function handleBackLinkClick(e) {
    e.preventDefault();
    onExit();
  }

  return (
    <div data-cy="machine-control">
      <div className="mb-4">
        <a
          href="/"
          data-cy="machine-control__back-link"
          onClick={handleBackLinkClick}
        >
          Back to My Machines
        </a>
      </div>

      <h2>MachineControl</h2>

      <div className="mt-5">
        <p>Machine ID: <b>{ currentMachine.id }</b></p>
        <p>Status: <b className="text-secondary">Offline</b></p>
      </div>

      <div className="text-secondary mt-5">
        <p>
          This is <b>machine control screen</b>. 
        </p>
      </div>
    </div>
  );
}
