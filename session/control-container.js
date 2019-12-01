import React from 'react';

export default function ControlContainer({ onSessionClick }) {
  return (
    <div data-cy="control-container">
      <h3>ControlContainer</h3>
      <button
        className="btn btn-light"
        data-cy="session-link"
        onClick={ e => onSessionClick() }
      >
        Back To Session
      </button>
    </div>
  );
}
