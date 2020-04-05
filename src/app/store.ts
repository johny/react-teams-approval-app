import { configureStore, Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'

import rootReducer, { RootState } from './rootReducer'
import { saveState, loadState } from '../api/localStorage'

const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState()
})

export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

store.subscribe(() => {
  saveState(store.getState())
})

export default store
