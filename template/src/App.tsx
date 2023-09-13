import React from 'react';
import logo from './logo.svg';
import './App.css';

import manifest from "./manifest.json";

function listContracts() {
  return manifest.contracts.map((contract) => {
    return <li>{contract.name}</li>;
  });
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{manifest.app.title}</h1>
        <ul>
          {listContracts()}
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
