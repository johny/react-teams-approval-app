import { combineReducers } from '@reduxjs/toolkit'

import teamsReducer from '../features/teams/teamsSlice'

const rootReducer = combineReducers({
  teams: teamsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
