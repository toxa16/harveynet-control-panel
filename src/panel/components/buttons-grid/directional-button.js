import React from 'react';


export default function DirectionalButton({ children, disabled, onPress, onRelease }) {
  const style = {
    width: '4rem',
    height: '4rem',
    fontSize: '1.5rem',
    userSelect: 'none',
  };
  return (
    <button
      style={style}
      disabled={disabled}
      onMouseDown={ e => onPress() }
      onMouseUp={ e => onRelease() }
      onTouchStart={ e => onPress() }
      onTouchEnd={ e => onRelease() }
    >
      { children }
    </button>
  );
}