import React from 'react';

import ConnectedMachineList from '../machine-list/connected-machine-list';
import ConnectedMachineControl from '../machine-control/connected-machine-control';

export default function RestrictedView({ currentMachine }) {
  function renderBody() {
    if (currentMachine) {
      return <ConnectedMachineControl />;
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
