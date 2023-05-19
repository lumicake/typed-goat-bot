import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface StreamData {
  streamStartedAt: string
}

interface StreamDataSliceType {
  [twitchUsername: string]: StreamData
}

interface StreamDataResponse {
  id: string
  user_id: string
  user_name: string
  game_id: string
  type: string
  title: string
  viewer_count: number
  started_at: string
  language: string
  thumbnail_url: string
  tag_ids: string[]
}

interface PushStreamData {
  twitchUsername: string
  streamData: StreamDataResponse
}

const initialState: StreamDataSliceType = {}

const streamsSlice = createSlice({
  name: 'streamsSlice',
  initialState,
  reducers: {
    pushStreamData(state, { payload }: PayloadAction<PushStreamData>) {
      const { twitchUsername, streamData } = payload
      state[twitchUsername] = {
        streamStartedAt: streamData.started_at,
      }
    },
    removeStreamData(
      state,
      { payload }: PayloadAction<{ twitchUsername: string }>
    ) {
      const { twitchUsername } = payload
      delete state[twitchUsername]
    },
  },
})

export const { pushStreamData, removeStreamData } = streamsSlice.actions
export default streamsSlice.reducer
