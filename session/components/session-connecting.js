import React from 'react';

export default function SessionConnecting() {
  return (
    <div data-cy="session-connecting">
      <h3>SessionConnecting</h3>

      <p>Connecting...</p>
      <button className="btn btn-warning">Abort</button>
    </div>
  );
}
