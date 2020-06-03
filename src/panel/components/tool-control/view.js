import React from 'react';


function BinaryButton({ label, disabled = false, onPress, onRelease }) {
  // TODO: on mouse leave => on release
  return (
    <button
      style={{ userSelect: 'none' }}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onTouchStart={onPress}
      onTouchEnd={onRelease}
      disabled={disabled}
    >{ label }</button>
  );
}


export default function ToolControlView({
  machineId, disabled, onCommandStart, onCommandStop,
}) {
  const makeCommandStart = topic => e => onCommandStart(machineId, topic);
  const makeCommandStop = topic => e => onCommandStop(machineId, topic);
  return (
    <div>
      <h5>Tool Control</h5>
      <BinaryButton
        label="binary_0"
        onPress={makeCommandStart('binary_0')}
        onRelease={makeCommandStop('binary_0')}
      />
      <BinaryButton
        label="binary_1"
        onPress={makeCommandStart('binary_1')}
        onRelease={makeCommandStop('binary_1')}
      />
    </div>
  );
}
