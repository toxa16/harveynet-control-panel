import React from 'react';
import { Provider } from 'react-redux';

import sessionStore from './logic/store';
import StateSessionContent from './components/state-session-content';

export default function Session({ ControlComponent }) {
  return (
    <div data-cy="session">
      <h2>Session</h2>
      
      <div className="mt-5">
        <Provider store={sessionStore}>
          <StateSessionContent ControlComponent={ControlComponent} />
        </Provider>
      </div>
    </div>
  );
}
