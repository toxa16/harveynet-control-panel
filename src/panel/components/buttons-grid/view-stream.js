import React from 'react';

import DirectionalButton from './directional-button';


export default function ButtonsGridView({ machineId, disabled, onMoveCommandStart, onMoveCommandStop
 }) {
  function handleRelease() {
    onMoveCommandStart({ l: 0, a: 0 })
  }

  const style = {
    display: 'inline-grid',
    gridTemplateColumns: '1fr 1fr 1fr',
  };
  return (
    <div style={style}>
      <DirectionalButton
        disabled={disabled}
        onPress={ e => onMoveCommandStart({ l: 1, a: 1 }) }
        onRelease={handleRelease}
      >&#8598;</DirectionalButton>

      <DirectionalButton
        disabled={disabled}
        onPress={ e => onMoveCommandStart({ l: 1, a: 0 }) }
        onRelease={handleRelease}
      >&uarr;</DirectionalButton>

      <DirectionalButton
        disabled={disabled}
        onPress={ e => onMoveCommandStart({ l: 1, a: -1 }) }
        onRelease={handleRelease}
      >&#8599;</DirectionalButton>

      <DirectionalButton
        disabled={disabled}
        onPress={ e => onMoveCommandStart({ l: 0, a: 1 }) }
        onRelease={handleRelease}
      >&larr;</DirectionalButton>

      <DirectionalButton disabled>x</DirectionalButton>

      <DirectionalButton
        disabled={disabled}
        onPress={ e => onMoveCommandStart({ l: 0, a: -1 }) }
        onRelease={handleRelease}
      >&rarr;</DirectionalButton>

      <DirectionalButton
        disabled={disabled}
        onPress={ e => onMoveCommandStart({ l: -1, a: -1 }) }
        onRelease={handleRelease}
      >&#8601;</DirectionalButton>

      <DirectionalButton
        disabled={disabled}
        onPress={ e => onMoveCommandStart({ l: -1, a: 0 }) }
        onRelease={handleRelease}
      >&darr;</DirectionalButton>

      <DirectionalButton
        disabled={disabled}
        onPress={ e => onMoveCommandStart({ l: -1, a: 1 }) }
        onRelease={handleRelease}
      >&#8600;</DirectionalButton>
    </div>
  );
}
