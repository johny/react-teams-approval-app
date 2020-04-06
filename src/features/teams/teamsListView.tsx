import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../app/rootReducer";

import { fetchTeamsAndUsers, Team, User } from "./teamsSlice";

import "./teams.css";
import { getUserName } from "../../helpers";

interface TeamProps {
  team: Team;
  users: User[];
  approvers: User[];
  onTeamSelect: (id: string) => void;
}

const USERS_TO_DISPLAY = 3;

const TeamItem: React.FC<TeamProps> = ({
  team,
  users,
  approvers,
  onTeamSelect,
}) => {
  let usersList = users.slice(0, USERS_TO_DISPLAY).map(getUserName).join(", ");
  if (users.length > USERS_TO_DISPLAY) {
    usersList = `${usersList}...`;
  }

  let approversList = approvers
    .slice(0, USERS_TO_DISPLAY)
    .map(getUserName)
    .join(", ");
  if (approvers.length > USERS_TO_DISPLAY) {
    approversList = `${approversList}...`;
  }

  return (
    <div
      className="Team"
      onClick={() => onTeamSelect(team.id)}
      data-testid={`Team-${team.id}`}
    >
      <strong className="Team__name">{team.name}</strong>
      <div className="Team__users Team__users--all">Users: {usersList}</div>
      <div className="Team__users Team__users--approvers">
        Approvers: {approversList}
      </div>
    </div>
  );
};

interface TeamsListViwProps {
  onTeamSelect: (id: string) => void;
}

export const TeamsListView: React.FC<TeamsListViwProps> = ({
  onTeamSelect,
}) => {
  const dispatch = useDispatch();

  const { isLoading, error, teamsById, usersById } = useSelector(
    (state: RootState) => state.teams
  );
  const { approvalStepsById } = useSelector(
    (state: RootState) => state.approvalSteps
  );

  useEffect(() => {
    if (Object.keys(teamsById).length === 0) {
      dispatch(fetchTeamsAndUsers());
    }
  }, [teamsById, dispatch]);

  const renderTeamsList = () => {
    return Object.keys(teamsById).map((teamId) => {
      const team = teamsById[teamId];
      const users = team.users.map((userId) => usersById[userId]);
      const approvers = Object.values(approvalStepsById)
        .filter((step) => step.teamId === teamId)
        .map((step) => usersById[step.userId]);

      return (
        <TeamItem
          key={teamId}
          team={team}
          users={users}
          approvers={approvers}
          onTeamSelect={onTeamSelect}
        />
      );
    });
  };

  return (
    <div className="Page">
      <h2>Teams</h2>
      {isLoading && "Loading teams..."}
      {error && `Error: ${error}`}
      {!isLoading && !error && renderTeamsList()}
    </div>
  );
};
