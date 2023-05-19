import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type twitchWatchee = string

interface WatcheesSliceType {
  [discordChannel: string]: twitchWatchee[]
}

interface AddWatcheeType {
  discordChannelId: string
  twitchUsername: string
}

//const initialState: WatcheesSliceType = { 493002349590347787: ['lumigia'] }
const initialState: WatcheesSliceType = {}

const watcheesSlice = createSlice({
  name: 'watchees',
  initialState,
  reducers: {
    addWatchee(state, { payload }: PayloadAction<AddWatcheeType>) {
      const { discordChannelId, twitchUsername } = payload
      if (!(discordChannelId in state)) {
        state[discordChannelId] = []
      }
      state[discordChannelId].push(twitchUsername)
    },
  },
})

export const { addWatchee } = watcheesSlice.actions
export default watcheesSlice.reducer
