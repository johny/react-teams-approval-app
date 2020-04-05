import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../app/rootReducer'
import { fetchTeamsAndUsers, Team, User } from './teamsSlice'

import './teams.css'

interface TeamProps {
  team: Team
  users: User[]
}

const TeamItem: React.FC<TeamProps> = ({team, users}) => (
  <div className="Team">
    <strong className="Team__name">{team.name}</strong>
    <div className="Team__users">
      Users: {users.map(user => `${user.firstName} ${user.lastName}`).join(', ')}
    </div>
  </div>
)

export const TeamsPage: React.FC = () => {
  const dispatch = useDispatch()

  const { isLoading, error, teamsById, usersById } = useSelector((state: RootState) => state.teams)

  useEffect(() => {
    dispatch(fetchTeamsAndUsers())
  }, [dispatch])

  const renderTeamsWithUsers = () => {
    return Object.keys(teamsById).map(teamId => {
      const team = teamsById[teamId]
      const users = team.users.map(userId => usersById[userId])
      return <TeamItem key={teamId} team={team} users={users} />
    })
  }

  return (
    <div className="Page">
      <h2>Teams</h2>
      {isLoading ? 'Loading teams...' : error ? `Error: ${error}` : renderTeamsWithUsers()}
    </div>
  )
}
