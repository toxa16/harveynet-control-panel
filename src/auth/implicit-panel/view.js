import React from 'react';


export default function ImplicitPanelView({ accessToken }) {
  if (!accessToken) {
    return (
      <div>
        I'm now going to redirect to auth0...
      </div>
    )
  }
  return (
    <div>
      HERE PANEL WILL BE RENDERED
    </div>
  );
}
