import React from 'react';


function Vline({ y }) {
  const style = {
    position: 'absolute',
    left: `${y}%`,
    width: 1,
    height: '100%',
    backgroundColor: '#9c9c9c',
  };
  return <div style={style}></div>
}
function Hline({ x }) {
  const style = {
    position: 'absolute',
    top: `${x}%`,
    width: '100%',
    height: 1,
    backgroundColor: '#9c9c9c',
  };
  return <div style={style}></div>
}
function MapPointer({ x, y }) {
  const pointerStyle = {
    position: 'absolute',
    width: 7,
    height: 7,
    marginTop: -3,
    marginLeft: -3,
    backgroundColor: 'yellow',
    top: `${x}%`,
    left: `${y}%`,
  }
  return <div style={pointerStyle}></div>;
}
function BaseMap({ x, y }) {
  const coord = z => (z + 10) * 100 / 20;
  const mapStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: 'gray',
  };
  function renderPointer() {
    if (x !== null || y !== null) {   // explicit `null`
      return <MapPointer x={coord(x)} y={coord(y)} />;
    }
  }
  return (
    <div style={mapStyle}>
      <Hline x={10}></Hline>
      <Hline x={20}></Hline>
      <Hline x={30}></Hline>
      <Hline x={40}></Hline>
      <Hline x={50}></Hline>
      <Hline x={60}></Hline>
      <Hline x={70}></Hline>
      <Hline x={80}></Hline>
      <Hline x={90}></Hline>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '50%',
        height: 1,
        backgroundColor: 'lightgreen',
      }}></div>

      <Vline y={10}></Vline>
      <Vline y={20}></Vline>
      <Vline y={30}></Vline>
      <Vline y={40}></Vline>
      <Vline y={50}></Vline>
      <Vline y={60}></Vline>
      <Vline y={70}></Vline>
      <Vline y={80}></Vline>
      <Vline y={90}></Vline>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 1,
        height: '50%',
        backgroundColor: 'red',
      }}></div>
      { renderPointer() }
    </div>
  );
}

export default function MachineMap({ machine }) {
  const { x, y } = machine.state;
  const style = {
    width: '15rem',
    height: '15rem',
  };
  return (
    <div style={style}>
      <BaseMap x={x} y={y} />
    </div>
  );
}
