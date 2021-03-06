import React from 'react';
import { Joystick } from 'react-joystick-component';


export default function JoyLinear({ linear, disabled, onMove, onStop }) {
  const size = 150;
  const coeff = 100 * 2 / size;

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
        size={size}
        baseColor={ disabled ? 'lightgray' : '#90CAF9' }
        stickColor={ disabled ? 'gray' : '#0D47A1' }
        move={e => onMove(e.y * coeff)}
        stop={e => onStop()}
        disabled={disabled}
      ></Joystick>
    </div>
  );
}
