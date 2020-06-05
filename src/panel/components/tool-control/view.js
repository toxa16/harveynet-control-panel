import React, { useState, useEffect } from 'react';


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

function BinaryToggler({
  label,
  disabled = false,
  onOn = () => {},
  onOff = () => {},
}) {
  const [on, setOn] = useState(false);
  useEffect(() => { disabled && setOn(false) }, [disabled]);
  useEffect(() => { on ? onOn() : onOff() }, [on]);
  const handleChange = e => setOn(e.target.checked);

  return (
    <label>
      <input
        type="checkbox"
        checked={on}
        onChange={handleChange}
        disabled={disabled}
      />
      {' '}
      <span className={disabled ? 'text-muted' : ''}>{ label }</span>
    </label>
  );
}

function AnalogSlider({
  label,
  disabled = false,
  onPositive = v => {},
  onZero = () => {},
}) {
  const [value, setValue] = useState(0);

  useEffect(() => { disabled && setValue(0) }, [disabled]);

  function handleChange(e) {
    const val = e.target.value;
    setValue(val);
    val > 0 ? onPositive(val) : onZero();
  }

  return (
    <div className="d-flex align-items-center">
      <label className={disabled ? 'text-muted' : ''}>
        { label }
      </label>
      <input
        className="ml-2"
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
}


export default function ToolControlView({ disabled, onCommandStart, onCommandStop }) {
  const makeCommandStart = (topic, value) => e => onCommandStart(topic, value);
  const makeCommandStop = topic => e => onCommandStop(topic);

  return (
    <div>
      <h3 className="mb-4">Tool Control</h3>

      <div className="mb-4">
        <p className="text-muted mb-2">
          Binary push-release buttons (data is streamed while a button is pressed).
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

      <div className="mb-4">
        <p className="text-muted mb-2">
          Binary togglers, here in form of checkboxes 
          (data is streamed while a checkbox is checked).
        </p>
        <span className="mr-4">
          <BinaryToggler
            label="binary_6"
            onOn={makeCommandStart('binary_6', true)}
            onOff={makeCommandStop('binary_6')}
            disabled={disabled}
          />
        </span>
        <span className="mr-4">
          <BinaryToggler
            label="binary_7"
            onOn={makeCommandStart('binary_7', true)}
            onOff={makeCommandStop('binary_7')}
            disabled={disabled}
          />
        </span>
        <span className="mr-4">
          <BinaryToggler
            label="binary_8"
            onOn={makeCommandStart('binary_8', true)}
            onOff={makeCommandStop('binary_8')}
            disabled={disabled}
          />
        </span>
        <span>
          <BinaryToggler
            label="binary_9"
            onOn={makeCommandStart('binary_9', true)}
            onOff={makeCommandStop('binary_9')}
            disabled={disabled}
          />
        </span>
      </div>

      <div>
        <AnalogSlider
          label="analog_1"
          disabled={disabled}
        />
      </div>
    </div>
  );
}
