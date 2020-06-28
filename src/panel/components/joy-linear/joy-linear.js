import React, { useState } from 'react';
import { Joystick } from 'react-joystick-component';


export default function JoyLinear({ disabled }) {
  const [value, setValue] = useState(0);

  function handleStart(e) {
    console.log(e);
  }
  function handleStop(e) {
    console.log(e);
    setValue(0);
  }
  function handleMove(e) {
    setValue(Math.round(e.y));
  }

  return (
    <div style={{ position: 'fixed', left: '3rem', bottom: '3rem', textAlign: 'center' }}>
      <div className="mb-2" style={{
        display: 'inline-block',
        padding: '.25rem .5rem',
        background: 'rgba(255, 255, 255, .5)',
      }}>
        <span className={ disabled ? 'text-muted' : '' }>Linear: {value}</span>
      </div>

      <Joystick
        size={100}
        baseColor={ disabled ? 'lightgray' : 'red' }
        stickColor={ disabled ? 'gray' : 'blue' }
        start={handleStart}
        move={handleMove}
        stop={handleStop}
        disabled={disabled}
      ></Joystick>
    </div>
  );
}
