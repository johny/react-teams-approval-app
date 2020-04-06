import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderWithRedux } from '../../test-utils';

import { TeamsListView } from './teamsListView';
import { RootState } from '../../app/rootReducer';

describe('teams list', () => {
  const initialState: Partial<RootState> = {
    teams: {
      teamsById: {
        'T1': { id: 'T1', name: 'Team 1', users: ['U1', 'U3'] },
        'T2': { id: 'T2', name: 'Team 2', users: ['U1', 'U2', 'U3', 'U4'] }
      },
      usersById: {
        'U1': { id: 'U1', firstName: 'User', lastName: 'One'},
        'U2': { id: 'U2', firstName: 'User', lastName: 'Two'},
        'U3': { id: 'U3', firstName: 'User', lastName: 'Three'},
        'U4': { id: 'U3', firstName: 'User', lastName: 'Four'},
      },
      isLoading: false,
      error: null
    },
  }

  const onTeamSelect = jest.fn()

  it('renders all teams in a list', () => {
    const { getAllByTestId, getByText } = renderWithRedux(<TeamsListView onTeamSelect={onTeamSelect} />, { initialState: initialState});

    expect(getAllByTestId(/Team/)).toHaveLength(2)

    // check for 1st team
    expect(getByText(/Team 1/)).toBeInTheDocument()
  })

  it('renders only first 3 users', () => {
    const { getByText, queryByText } = renderWithRedux(<TeamsListView onTeamSelect={onTeamSelect} />, { initialState: initialState});

    // User three is listed...
    expect(getByText(/User Three.../)).toBeInTheDocument()

    // ... but not the fourth
    expect(queryByText(/User Four/)).not.toBeInTheDocument()
  })

  it('handles click on team', () => {
    const onSelect = jest.fn()
    const { getByTestId } = renderWithRedux(<TeamsListView onTeamSelect={onSelect} />, { initialState: initialState});

    const teamOne = getByTestId(/Team-T1/)

    fireEvent.click(teamOne)

    expect(onSelect).toHaveBeenCalledWith('T1')
  })
})
