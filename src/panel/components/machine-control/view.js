import React from 'react';
import { Link } from '@reach/router';


export default function MachineControlView({ machineId }) {
  return (
    <div>
      <div className="mb-4">
        <Link to='/panel'>Back to my machines</Link>
      </div>

      <h1 className="mb-4">MachineControlView</h1>

      <div>{ machineId }</div>
    </div>
  );
}
