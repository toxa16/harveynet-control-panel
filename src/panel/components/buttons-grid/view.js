import React from 'react';

const style = {
  display: 'inline-grid',
  gridTemplateColumns: '1fr 1fr 1fr',
};

function DirectionalButton({ children, disabled }) {
  const style = {
    width: '4rem',
    height: '4rem',
    fontSize: '1.5rem',
  };
  return (
    <button style={style} disabled={disabled}>
      { children }
    </button>
  );
}

export default function ButtonsGridView() {
  return (
    <div style={style}>
      <DirectionalButton>&#8598;</DirectionalButton>
      <DirectionalButton>&uarr;</DirectionalButton>
      <DirectionalButton>&#8599;</DirectionalButton>
      <DirectionalButton>&larr;</DirectionalButton>
      <DirectionalButton disabled>x</DirectionalButton>
      <DirectionalButton>&rarr;</DirectionalButton>
      <DirectionalButton>&#8601;</DirectionalButton>
      <DirectionalButton>&darr;</DirectionalButton>
      <DirectionalButton>	&#8600;</DirectionalButton>
    </div>
  );
}
