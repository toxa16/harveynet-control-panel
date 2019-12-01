import React from 'react';

export default function MachineControl({ currentMachine, onExit }) {
  function handleBackLinkClick(e) {
    e.preventDefault();
    onExit();
  }

  function renderMachineStatus() {
    if (currentMachine.isOnline) {
      return <b className="text-success">Online</b>;
    } else {
      return <b>Offline</b>;
    }
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

      <h2>Machine Control</h2>

      <div className="mt-5" data-cy="machine-status">
        <p>Machine ID: <b>{ currentMachine.id }</b></p>
        <p>Status: { renderMachineStatus() }</p>
      </div>

      <div className="text-secondary mt-5">
        <p>
          This is a <b>machine control screen</b>. The machine will be controlled from here.
        </p>
        <p>
          In current version you can see the machine connection status (online/offline), 
          and how it changes in real time.
        </p>
        <p>To see how it works do the following:</p>
        <ol>
          <li>
            Open the
            {' '}
            <a
              href="https://harveynet-machine-simulator.herokuapp.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Machine Simulator
            </a>.
          </li>
          <li>Connect as a "<b>{ currentMachine.id }</b>" machine.</li>
          <li>See the status instantly changing to "<i>Online</i>".</li>
          <li>Now disconnect the machine.</li>
          <li>See the status is "<i>Offline</i>" again.</li>
        </ol>
      </div>
    </div>
  );
}
