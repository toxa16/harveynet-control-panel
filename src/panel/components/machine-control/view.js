import React, { useEffect } from 'react';

import Dashboard from '../dashboard';


export default function MachineControlView({ machineId, machines, onUnmount }) {
  // component unmount hook
  useEffect(() => () => onUnmount(), []);

  const machine = Array.isArray(machines) &&
    machines.find(x => x.machineId === machineId);

  if (machine) {
    return <Dashboard machine={machine} />;
  }
  return null;
}
