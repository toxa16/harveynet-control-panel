import React from 'react';
import { Link } from '@reach/router';

import ButtonsGrid from '../buttons-grid';
import Coords from './coords';
import CameraImage from './camera-image';
import SatMap from '../sat-map';


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
        <div className="col-6 col-lg text-center mb-4">
          { <ButtonsGrid machineId={machine.machineId} disabled={buttonsDisabled} /> }
        </div>

        <div className="col-6 col-lg mb-4">
          {  <CameraImage machine={machine} />  }
        </div>

        <div className="col-6 col-lg  mb-4">
          { /* <SatMap machine={machine} /> */ }
        </div>
      </div>

      <div className="d-flex mb-4">
        <div className="mb-4">
          { /* <Coords machine={machine} /> */ }
        </div>

        <div className="d-none">
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
