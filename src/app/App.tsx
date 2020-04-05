import React from 'react';

import './App.css';

import { TeamsPage } from '../features/teams/teamsPage';

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <strong>Team approvals admin</strong>
      </header>
      <main className="App__main">
        <TeamsPage />
      </main>
    </div>
  );
}

export default App;
