import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'

import { RootState } from '../../app/rootReducer'

import { createApprovalRule, deleteApprovalRule } from './approvalRulesSlice'

import { ApprovalStep } from './approvalStep'
import { ApprovalStepForm } from './approvalStepForm'
import { getUserName } from '../../helpers'

interface ApprovalRulesViewProps {
  teamId: string
  onCancel: () => void
}

export const ApprovalRulesView: React.FC<ApprovalRulesViewProps> = ({teamId}) => {
  const team = useSelector((state: RootState) => state.teams.teamsById[teamId])
  const approvalRules = useSelector((state: RootState) => state.approvalRules.approvalRulesById)
  const usersById = useSelector((state: RootState) => state.teams.usersById)

  const dispatch = useDispatch()

  const [ isAdding, setIsAdding ] = useState(false)


  if (!team) {
    return null
  }

  const teamApprovalRules = Object.values(approvalRules).filter(rule => rule.teamId === team.id)
  const teamUsers = team.users.map(userId => {
    const user = usersById[userId]
    return { id: user.id, name: getUserName(user) }
  })

  const handleSubmit = (lowerBound: string, upperBound: string | undefined, userId: string) => {
    dispatch(createApprovalRule({
      id: nanoid(),
      lowerBound: parseInt(lowerBound, 10),
      upperBound: upperBound ? parseInt(upperBound, 10) : Infinity,
      userId,
      teamId: team.id
    }))

    setIsAdding(false)
  }

  const handleCancel = () => { setIsAdding(false)}
  const handleRemove = (ruleId: string) => {
    dispatch(deleteApprovalRule(ruleId))
  }

  const renderApprovalRules = () => {
    const rules = teamApprovalRules.map(rule => {
    return (
      <ApprovalStep
        key={rule.id} rule={rule}
        onRemove={() => handleRemove(rule.id)}
        approvalUser={getUserName(usersById[rule.userId])}
      />
    )})

    return <>{rules}</>
  }


  return (
    <>
      <h2>Set up approvers</h2>
      <p>Who can approve requests of team {team.name}?</p>

      {renderApprovalRules()}
      {isAdding ?
        <ApprovalStepForm users={teamUsers} onCancel={handleCancel} onSubmit={handleSubmit} />
        : <button onClick={() => setIsAdding(true)}>Add approval step</button>}
    </>
  )
}
