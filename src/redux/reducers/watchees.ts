import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Watchee {
  twitchUsername: string
}

const initialState: string[] = []

const watcheesSlice = createSlice({
  name: 'watchees',
  initialState,
  reducers: {
    addWatchee(state, { payload }: PayloadAction<Watchee>) {
      const { twitchUsername } = payload
      state.push(twitchUsername)
    },
  },
})

export const { addWatchee } = watcheesSlice.actions
export default watcheesSlice.reducer
