import React from 'react';
import { Link } from '@reach/router';

import ButtonsGrid from '../buttons-grid';


function Coordinates({ machine }) {
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
    <div>
      <h5>Coordinates (odometry):</h5>
      <div>
        <span className="text-muted">x:</span>
        {' '}
        { renderX() }
      </div>
      <div>
        <span className="text-muted">y:</span>
        {' '}
        { renderY() }
      </div>
    </div>
  );
}


function CameraImage({ machine }) {
  const { cameraImage } = machine.state;
  function renderImage() {
    const imgStyle = {
      width: '15rem',
      height: '15rem',
      objectFit: 'cover',
    };
    return (
      <img
        style={imgStyle}
        src={cameraImage}
        alt="camera"
      />
    );
  }
  function renderStub() {
    const style = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '15rem',
      height: '15rem',
      backgroundColor: 'lightgray',
      color: 'gray',
    }
    return (
      <div style={style}>camera off</div>
    );
  }
  if (!cameraImage) {
    return renderStub();
  } else {
    return renderImage();
  }
}


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

function MachineMap({ machine }) {
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


export default function DashboardView({ machine }) {
  const { online, controlEnabled } = machine.state;
  const buttonsDisabled = !online || !controlEnabled;

  function renderStatus() {
    if (online) {
      return <b className="text-success">Online</b>;
    }
    return <span className="text-muted">Offline</span>;
  }

  function renderControlDisabled() {
    if (online && controlEnabled === false) {   // explicit `false`
      return (
        <div className="mb-3">
          <b className="text-warning">
            Your machine is currently controlled from another panel. 
            Viewing only.
          </b>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="mb-4">
        <Link to='/panel'>&lt; Back to my machines</Link>
      </div>

      <h1 className="mb-4">{ machine.machineId }</h1>

      <div className="mb-4">Status: { renderStatus() }</div>

      <div>
        { renderControlDisabled() }
      </div>

      <div className="row">
        <div className="col-6 col-lg order-1 text-center mb-4">
          <ButtonsGrid machineId={machine.machineId} disabled={buttonsDisabled} />
        </div>

        <div className="col-6 col-lg order-2 mb-4">
          <CameraImage machine={machine} />
        </div>

        <div className="col-6 col-lg order-3 order-lg-4 mb-4">
          <div className="mb-4">
            <Coordinates machine={machine} />
          </div>

          <div>
            <h5 className="mb-2">Speed:</h5>

            <div className="mb-2">
              <span className="mr-3">linear:</span>
              <input
                style={{ width: '4rem' }}
                type="number"
                min={0}
                step={0.1}
                defaultValue={0.5}
                disabled
              />
            </div>

            <div>
              <span className="mr-1">angular:</span>
              <input
                style={{ width: '4rem' }}
                type="number"
                min={0}
                step={0.1}
                defaultValue={1}
                disabled
              />
            </div>
          </div>
        </div>

        <div className="col-6 col-lg order-4 order-lg-3 mb-4">
          <MachineMap machine={machine} />
        </div>
      </div>

      <div className="d-none text-secondary mt-5">
        <p>
          This is a <b>machine control screen</b>. The machine will be controlled from here.
        </p>
        <p>
          In current version you can see the machine connection status (online/offline), 
          and how it changes in real time.
        </p>
        <p>To see how it works do the following:</p>
        <ol>
          <li>
            Open the
            {' '}
            <a
              href="https://harveynet-machine-simulator.herokuapp.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Machine Simulator
            </a>.
          </li>
          <li>Connect as a "<b>{ machine.machineId }</b>" machine.</li>
          <li>See the status instantly changing to "<i>Online</i>".</li>
          <li>Now disconnect the machine.</li>
          <li>See the status is "<i>Offline</i>" again.</li>
        </ol>
      </div>
    </div>
  );
}
