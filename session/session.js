import React, { useState } from 'react';
import { Provider } from 'react-redux';

import MachineList from './machine-list';
import ControlContainer from './control-container';
import SessionContent from './components/session-content';
import sessionStore from './logic/store';
import StateSessionContent from './components/state-session-content';

export default function Session({ ControlComponent }) {
  const [isControlOpen, setControlOpen] = useState(false);

  function renderBody() {
    return isControlOpen ?
      <ControlContainer
        onSessionClick={ () => setControlOpen(false) }
        ControlComponent={ControlComponent}
      /> :
      <SessionContent />;
    // <MachineList onControlClick={ () => setControlOpen(true) } />
  }

  return (
    <div data-cy="session">
      <h2>Session</h2>
      
      <div className="mt-5">
        { /*renderBody()*/ }
        <Provider store={sessionStore}>
          <StateSessionContent />
        </Provider>
      </div>
    </div>
  );
}
