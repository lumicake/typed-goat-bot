import { combineReducers } from '@reduxjs/toolkit'
import watcheesSlice from './watchees'
import streamsSlice from './streams'

const rootReducer = combineReducers({
  watcheesSlice,
  streamsSlice,
})
export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
