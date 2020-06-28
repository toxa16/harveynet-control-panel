import React from 'react';
import { Joystick } from 'react-joystick-component';


export default function JoyLinear() {
  return (
    <div style={{
      position: 'fixed',
      left: '3rem',
      bottom: '3rem',
      textAlign: 'center',
    }}>
      <div className="mb-2">Linear</div>
      <Joystick
        size={100}
        baseColor="red"
        stickColor="blue"
        move={() => {}}
        stop={() => {}}
      ></Joystick>
    </div>
  );
}
