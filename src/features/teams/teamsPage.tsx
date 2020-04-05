import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../app/rootReducer'
import { fetchTeams, Team } from './teamsSlice'

import './teams.css'

interface TeamProps {
  team: Team
}

const TeamItem: React.FC<TeamProps> = ({team}) => (
  <div className="Team">
    <strong>{team.name}</strong>
  </div>
)

export const TeamsPage: React.FC = () => {
  const dispatch = useDispatch()

  const { isLoading, error, teamsById } = useSelector((state: RootState) => state.teams)

  useEffect(() => {
    dispatch(fetchTeams())
  }, [dispatch])

  const entries = Object.entries(teamsById)

  return (
    <div className="Page">
      <h2>Teams</h2>
      {isLoading
          ? 'Loading teams...' : error
            ? `Error: ${error}` : entries.map(([id, team]) => <TeamItem key={id} team={team} />)
      }
    </div>
  )
}
