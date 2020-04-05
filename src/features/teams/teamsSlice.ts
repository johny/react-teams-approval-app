import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getTeams, Team as ApiTeam } from '../../api'
import { AppThunk } from '../../app/store'

// Team interface is exactly the same like the one from API so we re-export it
export interface Team {
  id: string
  name: string
  users: string[]
}

interface TeamsState {
  teamsById: Record<string, Team>
  isLoading: boolean
  error: string | null
}

const teamsInitialState: TeamsState = {
  teamsById: {},
  isLoading: false,
  error: null
}

// Create slice of redux store using redux-toolkit
const teams = createSlice({
  name: 'teams',
  initialState: teamsInitialState,
  reducers: {
    getTeamsStart: (state: TeamsState) => {
      state.isLoading = true
      state.error = null
    },
    getTeamsSuccess: (state: TeamsState, action : PayloadAction<ApiTeam[]>) => {
      state.isLoading = false
      state.error = null

      const teams = action.payload
      teams.forEach(team => {
        state.teamsById[team.id] = team
      })
    },
    getTeamsError: (state: TeamsState, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

// Export slice reducer
export default teams.reducer

// Get action creators
const { getTeamsStart, getTeamsSuccess, getTeamsError } = teams.actions

// Provide Thunk for fetching data
export const fetchTeams = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getTeamsStart())
    const teams = await getTeams()
    dispatch(getTeamsSuccess(teams))
  } catch (error) {
    dispatch(getTeamsError(error.toString()))
  }
}

