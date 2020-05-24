import React from 'react';

import Dashboard from '../dashboard';


export default function MachineControlView({ machineId, machines, controlDisabled }) {
  const machine = Array.isArray(machines) &&
    machines.find(x => x.machineId === machineId);

  if (machine) {
    return <Dashboard machine={machine} controlDisabled={controlDisabled} />;
  }
  return null;
}
