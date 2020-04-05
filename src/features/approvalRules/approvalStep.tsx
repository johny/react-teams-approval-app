import React from 'react'

import { ApprovalRule } from './approvalRulesSlice'
import { Money } from '../../components/money'

import './approvalStep.css'

interface ApprovalStepProps {
  rule: ApprovalRule
  approvalUser: string
  onRemove: () => void
}

export const ApprovalStep: React.FC<ApprovalStepProps> = ({ rule, approvalUser, onRemove }) => {
  return (
    <div className="ApprovalStep">
      <div className="ApprovalStep__bounds">
        {rule.lowerBound === 0 ? (
          <>
            Up to <Money value={rule.upperBound} />
          </>
        ) : rule.upperBound === Infinity ? (
          <>
            Above <Money value={rule.lowerBound} />
          </>
        ) : <>
          From <Money value={rule.lowerBound} />
          {' '}
          to <Money value={rule.upperBound} />
          </>
        }

        <button onClick={onRemove} className="ApprovalStep__remove">remove rule</button>
      </div>
      <div className="ApprovalStep__user">
        {approvalUser}
      </div>
    </div>
  )
}
