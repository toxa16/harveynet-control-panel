import React, { useEffect } from 'react';

import Dashboard from '../dashboard';


export default function MachineControlView({ machineId, machines, onMount, onUnmount }) {
  // component mount & unmount hook
  useEffect(() => {
    setTimeout(() => onMount(machineId), 500);  // delaying onMount
    return () => onUnmount();
  }, []);

  const machine = Array.isArray(machines) &&
    machines.find(x => x.machineId === machineId);

  if (machine) {
    return <Dashboard machine={machine} />;
  }
  return null;
}
