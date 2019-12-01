import React from 'react';

import SessionConnecting from './session-connecting';
import SessionOpen from './session-open';

export default function SessionContent({ isWebSocketOpen, ControlComponent }) {
  function renderBody() {
    return isWebSocketOpen ?
      <SessionOpen ControlComponent={ControlComponent} /> :
      <SessionConnecting /> ;
  }

  return (
    <div>
      <h2>SessionContent</h2>

      { renderBody() }
    </div>
  );
}
