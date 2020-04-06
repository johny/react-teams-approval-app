import React, { useState } from "react";

import { ApprovalStep as ApprovalStepInterface } from "./approvalStepsSlice";
import { Money } from "../../components/money";

import "./approvalStep.css";

interface ApprovalStepProps {
  step: ApprovalStepInterface;
  approvalUser: string;
  onRemove: () => void;
}

export const ApprovalStep: React.FC<ApprovalStepProps> = ({
  step,
  approvalUser,
  onRemove,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const renderBounds = (step: ApprovalStepInterface) => {
    return step.lowerBound === 0 && step.upperBound ? (
      <>
        Up to <Money value={step.upperBound} />
      </>
    ) : step.upperBound === null ? (
      <>
        Above <Money value={step.lowerBound} />
      </>
    ) : (
      <>
        From <Money value={step.lowerBound} /> to{" "}
        <Money value={step.upperBound} />
      </>
    );
  };

  return (
    <div className="ApprovalStep">
      <div className="ApprovalStep__bounds">
        {renderBounds(step)}
        <div className="ApprovalStep__actions">
          {!isEditing && (
            <>
              <button onClick={() => setIsEditing(true)}>edit</button>
              <button onClick={onRemove}>remove</button>
            </>
          )}
        </div>
      </div>
      <div className="ApprovalStep__user">{approvalUser}</div>
    </div>
  );
};
