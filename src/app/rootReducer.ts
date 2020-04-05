import { combineReducers } from '@reduxjs/toolkit'

import teamsReducer from '../features/teams/teamsSlice'
import approvalRulesResucer from '../features/approvalRules/approvalRulesSlice'

const rootReducer = combineReducers({
  teams: teamsReducer,
  approvalRules: approvalRulesResucer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
