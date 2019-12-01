import React, { useState } from 'react';

import MachineList from '../machine-list';
import ControlContainer from '../control-container';

export default function SessionOpen({ ControlComponent }) {
  const [isControlOpen, setControlOpen] = useState(false);

  function renderBody() {
    return isControlOpen ?
      <ControlContainer
        onSessionClick={ () => setControlOpen(false) }
        ControlComponent={ControlComponent}
      /> :
      <MachineList onControlClick={ () => setControlOpen(true) } />;
  }

  return (
    <div data-cy="session-open">
      <h3>SessionOpen</h3>

      { renderBody() }
    </div>
  );
}
