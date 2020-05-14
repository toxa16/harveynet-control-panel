import React from 'react';
import { Link } from '@reach/router';

import ButtonsGrid from '../buttons-grid';


function Coordinates({ machine }) {
  const { x, y } = machine.state;
  function renderX() {
    if (x === null) {
      return <span className="text-muted">N/A</span>;
    }
    return <span className="text-danger">{ x }</span>;
  }
  function renderY() {
    if (y === null) {
      return <span className="text-muted">N/A</span>;
    }
    return <span className="text-success">{ y }</span>;
  }
  return (
    <div>
      <h5>Coordinates:</h5>
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


export default function DashboardView({ machine }) {
  const { online } = machine.state;

  function renderStatus() {
    if (online) {
      return <b className="text-success">Online</b>;
    }
    return <span className="text-muted">Offline</span>;
  }

  return (
    <div>
      <div className="mb-4">
        <Link to='/panel'>&lt; Back to my machines</Link>
      </div>

      <h1 className="mb-4">{ machine.machineId }</h1>

      <div className="mb-4">Status: { renderStatus() }</div>

      <div className="row">
        <div className="col text-center mb-4">
          <ButtonsGrid machineId={machine.machineId} disabled={!online} />
        </div>

        <div className="col mb-4">
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
