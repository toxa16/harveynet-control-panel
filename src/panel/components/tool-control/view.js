import React from 'react';


export default function ToolControlView({
  machineId, disabled, onCommandStart, onCommandStop,
}) {
  const makeCommandStart = topic => e => onCommandStart(machineId, topic);
  const makeCommandStop = topic => e => onCommandStop(machineId, topic);
  return (
    <div>
      <h5>Tool Control</h5>
      <button
        onMouseDown={makeCommandStart('binary_0')}
        onMouseUp={makeCommandStop('binary_0')}
      >
        binary_0
      </button>
      <button
        onMouseDown={makeCommandStart('binary_1')}
        onMouseUp={makeCommandStop('binary_1')}
      >
        binary_1
      </button>
    </div>
  );
}
