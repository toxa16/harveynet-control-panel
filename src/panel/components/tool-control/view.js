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
  useEffect(() => { value > 0 ? onPositive(value) : onZero() }, [value]);
  const handleChange = e => setValue(e.target.value);

  return (
    <div className="d-inline-flex align-items-center">
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

  function makeAnalogCommandStart(topic) {
    return function(value) {
      onCommandStop(topic);
      onCommandStart(topic, value);
    }
  }

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
        <BinaryButton
          label="binary_6"
          onPress={makeCommandStart('binary_6', true)}
          onRelease={makeCommandStop('binary_6')}
          disabled={disabled}
        />
        <BinaryButton
          label="binary_7"
          onPress={makeCommandStart('binary_7', true)}
          onRelease={makeCommandStop('binary_7')}
          disabled={disabled}
        />
        <BinaryButton
          label="binary_8"
          onPress={makeCommandStart('binary_8', true)}
          onRelease={makeCommandStop('binary_8')}
          disabled={disabled}
        />
      </div>

      <div className="mb-4">
        <p className="text-muted mb-2">
          Binary togglers, here in form of checkboxes 
          (data is streamed while a checkbox is checked).
        </p>
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
        <p className="text-muted">
          Analog sliders, range from 0 to 100 
          (data is streamed while a slider value is greater than 0).
        </p>
        <div className="mb-2">
          <AnalogSlider
            label="analog_1"
            onPositive={makeAnalogCommandStart('analog_1')}
            onZero={ () => onCommandStop('analog_1') }
            disabled={disabled}
          />
        </div>
        <div className="mb-2">
          <AnalogSlider
            label="analog_2"
            onPositive={makeAnalogCommandStart('analog_2')}
            onZero={ () => onCommandStop('analog_2') }
            disabled={disabled}
          />
        </div>
        <div>
          <AnalogSlider
            label="analog_3"
            onPositive={makeAnalogCommandStart('analog_3')}
            onZero={ () => onCommandStop('analog_3') }
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}
