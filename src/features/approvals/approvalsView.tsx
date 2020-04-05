import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/rootReducer'

interface ApprovalsViewProps {
  teamId: string
  onCancel: () => void
}


export const ApprovalsView: React.FC<ApprovalsViewProps> = ({teamId}) => {
  const team = useSelector((state: RootState) => state.teams.teamsById[teamId])

  if (!team) {
    return null
  }

  return (
    <>
      <h2>Set up approvers</h2>
      <p>Who can approve requests of team {team.name}?</p>
    </>
  )
}
