import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getTeams, getUsers, ApiTeam, ApiUser } from '../../api'
import { AppThunk } from '../../app/store'
export interface Team {
  id: string
  name: string
  users: string[]
}

export interface User {
  id: string
  firstName: string
  lastName: string
}

interface TeamsState {
  teamsById: Record<string, Team>
  usersById: Record<string, User>
  isLoading: boolean
  error: string | null
}

interface GetDataActionPayload {
  teams: ApiTeam[]
  users: ApiUser[]
}

const teamsInitialState: TeamsState = {
  teamsById: {},
  usersById: {},
  isLoading: false,
  error: null
}

// Create slice of redux store using redux-toolkit
const teams = createSlice({
  name: 'teams',
  initialState: teamsInitialState,
  reducers: {
    getDataStart: (state: TeamsState) => {
      state.isLoading = true
      state.error = null
    },

    getDataSuccess: (state: TeamsState, action : PayloadAction<GetDataActionPayload>) => {
      state.isLoading = false
      state.error = null
      const { teams, users } = action.payload

      // normalize teams and users
      users.forEach(user => state.usersById[user.id] = {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
      })

      teams.forEach(team => state.teamsById[team.id] = {...team})
    },

    getDataError: (state: TeamsState, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

// Export slice reducer
export default teams.reducer

// Get action creators
const { getDataStart, getDataSuccess, getDataError } = teams.actions

// Provide Thunk for fetching data
export const fetchTeamsAndUsers = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getDataStart())
    const [teams, users] = await Promise.all([
      getTeams(), getUsers()
    ])
    dispatch(getDataSuccess({ teams, users }))
  } catch (error) {
    dispatch(getDataError(error.toString()))
  }
}

