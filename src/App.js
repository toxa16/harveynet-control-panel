import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App" data-cy="homepage">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>v0.0.1</p>
      </header>
    </div>
  );
}

export default App;
