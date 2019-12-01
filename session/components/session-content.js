import React from 'react';

import SessionConnecting from './session-connecting';
import SessionOpen from './session-open';

export default function SessionContent({ isWebSocketOpen }) {
  function renderBody() {
    return isWebSocketOpen ?
      <SessionOpen /> :
      <SessionConnecting /> ;
  }

  return (
    <div>
      <h2>SessionContent</h2>

      { renderBody() }
    </div>
  );
}
