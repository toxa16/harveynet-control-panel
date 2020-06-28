import React from 'react';
import { Joystick } from 'react-joystick-component';


export default function JoyLinear({ linear, disabled, onMove, onStop }) {
  return (
    <div style={{ position: 'fixed', left: '3rem', bottom: '3rem', textAlign: 'center' }}>
      <div className="mb-2" style={{
        display: 'inline-block',
        padding: '.25rem .5rem',
        background: 'rgba(255, 255, 255, .5)',
      }}>
        <span className={ disabled ? 'text-muted' : '' }>
          <span>Linear:</span>
          {' '}
          <span style={{
            display: 'inline-block',
            width: '1.5rem',
          }}>{Math.round(linear)}</span>
        </span>
      </div>

      <Joystick
        size={100}
        baseColor={ disabled ? 'lightgray' : 'red' }
        stickColor={ disabled ? 'gray' : 'blue' }
        move={e => onMove(e.y)}
        stop={e => onStop()}
        disabled={disabled}
      ></Joystick>
    </div>
  );
}
