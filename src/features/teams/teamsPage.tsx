import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../app/rootReducer'
import { fetchTeamsAndUsers, Team, User } from './teamsSlice'

import './teams.css'

interface TeamProps {
  team: Team
  users: User[]
}

const USERS_TO_DISPLAY = 3

const TeamItem: React.FC<TeamProps> = ({team, users}) => {
  let usersList = users.slice(0, USERS_TO_DISPLAY).map(user => `${user.firstName} ${user.lastName}`).join(', ')
  if (users.length > USERS_TO_DISPLAY) {
    usersList = `${usersList}...`
  }

  return (
    <div className="Team">
      <strong className="Team__name">{team.name}</strong>
      <div className="Team__users Team__users--all">Users: {usersList}</div>
      {/* <div className="Team__users Team__users--approvers">Approvers: TBD</div> */}
    </div>
  )
}

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
