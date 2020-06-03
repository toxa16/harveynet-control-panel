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
  const makeCommandStart = (topic, value) =>
    e => onCommandStart(machineId, topic, value);
  const makeCommandStop = topic =>
    e => onCommandStop(machineId, topic);

  return (
    <div>
      <h3 className="mb-4">Tool Control</h3>

      <p className="text-muted mb-2">
        Push-release buttons (data is streamed while a button is pressed).
      </p>
      <BinaryButton
        label="binary_1"
        onPress={makeCommandStart('binary_1', true)}
        onRelease={makeCommandStop('binary_1')}
        disabled={disabled}
      />
      <BinaryButton
        label="binary_2"
        onPress={makeCommandStart('binary_2', true)}
        onRelease={makeCommandStop('binary_2')}
        disabled={disabled}
      />
      <BinaryButton
        label="binary_3"
        onPress={makeCommandStart('binary_3', true)}
        onRelease={makeCommandStop('binary_3')}
        disabled={disabled}
      />
      <BinaryButton
        label="binary_4"
        onPress={makeCommandStart('binary_4', true)}
        onRelease={makeCommandStop('binary_4')}
        disabled={disabled}
      />
      <BinaryButton
        label="binary_5"
        onPress={makeCommandStart('binary_5', true)}
        onRelease={makeCommandStop('binary_5')}
        disabled={disabled}
      />
    </div>
  );
}
