import React from 'react';
import { Link } from '@reach/router';

import ButtonsGrid from '../buttons-grid';


export default function MachineControlView({ machineId, machines }) {
  const currentMachine = machines &&
    machines.find(x => x.machineId === machineId);

  function renderStatus() {
    if (currentMachine && currentMachine.state.online) {
      return <b className="text-success">Online</b>;
    }
    return <span className="text-muted">Offline</span>;
  }

  return (
    <div>
      <div className="mb-4">
        <Link to='/panel'>&lt; Back to my machines</Link>
      </div>

      <h1 className="mb-4">{ machineId }</h1>

      <div className="mb-4">Status: { renderStatus() }</div>

      <div className="row">
        <div className="col text-center">
          <ButtonsGrid />
        </div>

        <div className="col">
          <div className="mb-4">
            <b className="mr-3">Coordinates:</b><br />
            <span className="mr-3">
              <span className="text-muted">x:</span>
              {' '}
              <span className="text-danger">0.765</span>
            </span>
            <span>
              <span className="text-muted">y:</span>
              {' '}
              <span className="text-success">-1.033</span>
            </span>
          </div>

          <div>
            <b className="mb-2">Speed:</b>

            <div className="mb-2">
              <span>linear:</span>{' '}
              <input type="number" min={0} step={0.1} defaultValue={0.5} />
            </div>

            <div>
              <span>angular:</span>{' '}
              <input type="number" min={0} step={0.1} defaultValue={1} />
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
          <li>Connect as a "<b>{ currentMachine && currentMachine.machineId }</b>" machine.</li>
          <li>See the status instantly changing to "<i>Online</i>".</li>
          <li>Now disconnect the machine.</li>
          <li>See the status is "<i>Offline</i>" again.</li>
        </ol>
      </div>
    </div>
  );
}
