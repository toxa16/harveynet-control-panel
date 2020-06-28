import React from 'react';


export default function Coords({ machine }) {
  const { x, y } = machine.state;
  const formatNumber = n => n.toLocaleString('de-DE', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
  function renderX() {
    if (x === null) {
      return <span className="text-muted">N/A</span>;
    }
    return <span className="text-danger">{ formatNumber(x) }</span>;
  }
  function renderY() {
    if (y === null) {
      return <span className="text-muted">N/A</span>;
    }
    return <span className="text-success">{ formatNumber(y) }</span>;
  }
  return (
    <div className="d-inline-block text-left">
      <h5>Coordinates (odometry):</h5>
      <div className="ml-3">
        <span className="text-muted">x:</span>
        {' '}
        { renderX() }
      </div>
      <div className="ml-3">
        <span className="text-muted">y:</span>
        {' '}
        { renderY() }
      </div>
    </div>
  );
}
