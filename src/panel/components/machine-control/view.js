import React from 'react';
import { Link } from '@reach/router';


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

      <div>{ renderStatus() }</div>
    </div>
  );
}
