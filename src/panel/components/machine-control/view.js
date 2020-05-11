import React from 'react';
import { Link } from '@reach/router';


export default function MachineControlView({ machineId }) {
  return (
    <div>
      <div className="mb-4">
        <Link to='/panel'>&lt; Back to my machines</Link>
      </div>

      <h1 className="mb-4">{ machineId }</h1>

      <div>{ machineId }</div>
    </div>
  );
}
