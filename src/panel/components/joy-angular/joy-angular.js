import React from 'react';
import { Joystick } from 'react-joystick-component';


export default function JoyAngular() {
  return (
    <div style={{
      position: 'fixed',
      right: '3rem',
      bottom: '3rem',
      textAlign: 'center',
    }}>
      <div className="mb-2">Angular</div>
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
