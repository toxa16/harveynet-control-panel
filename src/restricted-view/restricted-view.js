import React from 'react';

import ConnectedMachineList from '../machine-list/connected-machine-list';
import MachineControl from '../machine-control/machine-control';

export default function RestrictedView({ currentMachine }) {
  function renderBody() {
    if (currentMachine) {
      return <MachineControl />;
    } else {
      return <ConnectedMachineList />
    }
  }

  return (
    <div id="restricted-page">
      { renderBody() }
    </div>
  );
}
