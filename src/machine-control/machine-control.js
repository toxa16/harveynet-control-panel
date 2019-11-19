import React from 'react';

export default function MachineControl({ onExit }) {
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
    </div>
  );
}
