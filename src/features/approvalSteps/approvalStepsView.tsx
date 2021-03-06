import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";

import { RootState } from "../../app/rootReducer";

import {
  createApprovalStep,
  deleteApprovalStep,
  ApprovalStep as ApprovalStepInterface,
} from "./approvalStepsSlice";

import { ApprovalStep } from "./approvalStep";
import { ApprovalStepForm } from "./approvalStepForm";
import { getUserName } from "../../helpers";

interface ApprovalStepsViewProps {
  teamId: string;
  onCancel: () => void;
}

export const ApprovalStepsView: React.FC<ApprovalStepsViewProps> = ({
  teamId,
}) => {
  const team = useSelector((state: RootState) => state.teams.teamsById[teamId]);
  const approvalSteps = useSelector(
    (state: RootState) => state.approvalSteps.approvalStepsById
  );
  const usersById = useSelector((state: RootState) => state.teams.usersById);

  const dispatch = useDispatch();

  const [isAdding, setIsAdding] = useState(false);

  if (!team) {
    return null;
  }

  const teamApprovalSteps = Object.values(approvalSteps)
    .filter((step) => step.teamId === team.id)
    .sort((a, b) => a.lowerBound - b.lowerBound);
  const teamUsers = team.users
    .filter(
      (userId) => !teamApprovalSteps.some((step) => step.userId === userId)
    ) // filter out user that were already selected
    .map((userId) => {
      const user = usersById[userId];
      return { id: user.id, name: getUserName(user) };
    });

  const handleSubmit = (
    lowerBound: string,
    upperBound: string | undefined,
    userId: string
  ) => {
    const draftStep: ApprovalStepInterface = {
      id: nanoid(),
      lowerBound: parseInt(lowerBound, 10),
      upperBound: upperBound ? parseInt(upperBound, 10) : null, // If not set by form, we use null
      userId,
      teamId: team.id,
    };

    dispatch(createApprovalStep(draftStep));
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };
  const handleRemove = (stepId: string) => {
    dispatch(deleteApprovalStep(stepId));
  };

  const renderApprovalSteps = () => {
    const steps = teamApprovalSteps.map((step) => {
      return (
        <ApprovalStep
          key={step.id}
          step={step}
          onRemove={() => handleRemove(step.id)}
          approvalUser={getUserName(usersById[step.userId])}
        />
      );
    });

    return <>{steps}</>;
  };

  return (
    <>
      <h2>Set up approvers</h2>
      <p>Who can approve requests of team {team.name}?</p>

      {renderApprovalSteps()}
      {isAdding ? (
        <ApprovalStepForm
          users={teamUsers}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      ) : (
        <button onClick={() => setIsAdding(true)}>Add approval step</button>
      )}
    </>
  );
};
