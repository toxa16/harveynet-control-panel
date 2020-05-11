import React from 'react';
import { Router } from '@reach/router';

import MachineList from './components/machine-list';
import MachineControl from './components/machine-control';


export default function Panel() {
  return (
    <Router>
      <MachineList default onMachineSelect={ () => {} } />
      <MachineControl path="machine" />
    </Router>
  );
}
