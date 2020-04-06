import { combineReducers } from '@reduxjs/toolkit'

import teamsReducer from '../features/teams/teamsSlice'
import approvalStepsResucer from '../features/approvalSteps/approvalStepsSlice'

const rootReducer = combineReducers({
  teams: teamsReducer,
  approvalSteps: approvalStepsResucer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
