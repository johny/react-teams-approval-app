import React, { useState, useRef } from 'react'

import './approvalStepForm.css'

type User = {
  id: string
  name: string
}

interface ApprovalStepFormProps {
  onCancel: () => void
  onSubmit: (lowerValue: string, upperValue: string | undefined, userIdValue: string) => void
  users: User[]
}

export const ApprovalStepForm: React.FC<ApprovalStepFormProps> = ({ onCancel, onSubmit, users}) => {
  const lowerInputRef = useRef<HTMLInputElement>(null)
  const upperInputRef = useRef<HTMLInputElement>(null)
  const userSelectRef = useRef<HTMLSelectElement>(null)

  const handleSubmit = () => {
    const lowerValue = lowerInputRef?.current?.value
    const upperValue = upperInputRef?.current?.value
    const userId = userSelectRef?.current?.value

    if (userId && lowerValue) {
      onSubmit(lowerValue, upperValue, userId)
    }
  }

  const handleCancel = () => {
    onCancel()
  }

  return (
    <div className="Form ApprovalStepForm">
      <div className="Form__row">
        <label>
          {'From '}
          <input type="number" defaultValue={0} ref={lowerInputRef} />
        </label>
        <label>
          {'To '}
          <input type="number" ref={upperInputRef} />
        </label>
      </div>
      <div className="Form__row">
        <label>
          {'Approval by '}
          <select ref={userSelectRef} placeholder="Select user">
            <option value=""></option>
            {users.map(u => <option value={u.id} key={u.id}>{u.name}</option>)}
          </select>
        </label>
      </div>
      <div className="Form__actions">
        <button onClick={handleSubmit}>Submit approval step</button>
        {' or '}
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  )
}
