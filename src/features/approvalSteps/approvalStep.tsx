import React from 'react'

import { ApprovalStep as ApprovalStepInterface } from './approvalStepsSlice'
import { Money } from '../../components/money'

import './approvalStep.css'

interface ApprovalStepProps {
  step: ApprovalStepInterface
  approvalUser: string
  onRemove: () => void
}

export const ApprovalStep: React.FC<ApprovalStepProps> = ({ step, approvalUser, onRemove }) => {
  return (
    <div className="ApprovalStep">
      <div className="ApprovalStep__bounds">
        {(step.lowerBound === 0 && step.upperBound)? (
          <>
            Up to <Money value={step.upperBound} />
          </>
        ) : step.upperBound === null ? (
          <>
            Above <Money value={step.lowerBound} />
          </>
        ) : <>
          From <Money value={step.lowerBound} />
          {' '}
          to <Money value={step.upperBound} />
          </>
        }

        <button onClick={onRemove} className="ApprovalStep__remove">remove</button>
      </div>
      <div className="ApprovalStep__user">
        {approvalUser}
      </div>
    </div>
  )
}
