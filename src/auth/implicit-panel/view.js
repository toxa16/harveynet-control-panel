import React from 'react';

import Panel from '../../panel';


export default function ImplicitPanelView({ accessToken }) {
  if (!accessToken) {
    return (
      <div>
        I'm now going to redirect to auth0...
      </div>
    )
  }
  return <Panel />;
}
