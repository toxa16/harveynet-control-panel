import React from 'react';

import Navbar from './navbar';

export default function Main({ SessionComponent, ControlComponent }) {
  return (
    <div data-cy="main">
      <Navbar />
       
      <main className="container mt-5">
        <h1>Main Sub-App</h1>
        <SessionComponent ControlComponent={ControlComponent} />
      </main>
    </div>
  );
}
