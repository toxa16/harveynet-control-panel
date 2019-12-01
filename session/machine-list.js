import React from 'react';

export default function MachineList({ onControlClick }) {
  return (
    <div data-cy="machine-list">
      <h3>MachineList</h3>

      <button
        className="btn btn-primary"
        data-cy="control-link"
        onClick={ e => onControlClick() }
      >
        Open Control
      </button>
    </div>
  );
}
