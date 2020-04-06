import React, { useState } from 'react';

import './App.css'

import { TeamsListView } from '../features/teams/teamsListView'
import { ApprovalStepsView } from '../features/approvalSteps/approvalStepsView'

function App() {
  const [currentTeam, setCurrentTeam] = useState<string|null>(null)

  const handleTeamSelect = (id: string) => setCurrentTeam(id)
  const onCancel = () => setCurrentTeam(null)

  return (
    <div className="App">
      <header className="App__header">
        <h1>Team approvals admin</h1>
      </header>
      <main className="App__main">
        <TeamsListView onTeamSelect={handleTeamSelect} />
      </main>
      {currentTeam && (
        <div className="App__overlay">
          <div className="App__overlay-content">
            <button className="App__overlay-cancel" onClick={onCancel}>&times;</button>
            <ApprovalStepsView teamId={currentTeam} onCancel={onCancel} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
