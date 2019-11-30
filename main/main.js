import React from 'react';
import Navbar from './navbar';

export default function Main() {
  return (
    <div data-cy="main">
      <Navbar />
       
      <main className="container mt-5">
        <h1>Main Sub-App</h1>
      </main>
    </div>
  );
}
