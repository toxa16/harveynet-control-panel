import React from 'react';
import { Joystick } from 'react-joystick-component';


export default function JoyAngular({ angular, disabled, onMove, onStop }) {
  return (
    <div style={{ position: 'fixed', right: '3rem', bottom: '3rem', textAlign: 'center' }}>
      <div className="mb-2" style={{
        display: 'inline-block',
        padding: '.25rem .5rem',
        background: 'rgba(255, 255, 255, .5)',
      }}>
        <span className={ disabled ? 'text-muted' : '' }>
          <span>Angular:</span>
          {' '}
          <span style={{
            display: 'inline-block',
            width: '1.5rem',
          }}>{Math.round(angular)}</span>
        </span>
      </div>

      <Joystick
        size={100}
        baseColor={ disabled ? 'lightgray' : 'red' }
        stickColor={ disabled ? 'gray' : 'blue' }
        move={e => onMove(-e.x)}
        stop={e => onStop()}
        disabled={disabled}
      ></Joystick>
    </div>
  );
}
