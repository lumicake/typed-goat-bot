import { combineReducers } from '@reduxjs/toolkit'
import watcheesSlice from './watchees'

const rootReducer = combineReducers({
  watcheesSlice,
})
export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
