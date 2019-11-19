import React from 'react';
import ConnectedMachineList from '../machine-list/connected-machine-list';

export default function RestrictedView() {
  return (
    <div id="restricted-page">
      <ConnectedMachineList />
    </div>
  );
}
