import React from 'react';

import Dashboard from '../dashboard';


export default function MachineControlView({ machineId, machines }) {
  const machine = Array.isArray(machines) &&
    machines.find(x => x.machineId === machineId);

  if (machine) {
    return <Dashboard machine={machine} />;
  }
  return null;
}
