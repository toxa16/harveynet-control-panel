import React from 'react';

import MachineList from './components/machine-list';


export default function Panel() {
  return (
    <div>
      <MachineList onMachineSelect={ () => {} } />
    </div>
  );
}
