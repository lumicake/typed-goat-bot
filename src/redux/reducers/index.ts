import { combineReducers } from '@reduxjs/toolkit'
import watcheesReducer from './watchees'

const rootReducer = combineReducers({
  watcheesReducer,
})
export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
