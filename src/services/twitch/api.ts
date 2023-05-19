import axios from 'axios'
import { TWITCH_CREDENTIALS } from '../../config'
import { authenticate } from './authentication'

const TWITCH_API_URL_BASE = 'https://api.twitch.tv/helix'
const TWITCH_API_STREAMS_ENDPOINT = `${TWITCH_API_URL_BASE}/streams`

export interface StreamDataResponse {
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

export const fetchStreamsDataForUsers = async (
  usernames: string[]
): Promise<{ data: StreamDataResponse[] }> => {
  const queryString = usernames.reduce((acc, value, index) => {
    if (index === 0) {
      return `?user_login=${value}`
    }
    return `${acc}&user_login=${value}`
  }, '')

  const response = await axios({
    method: 'GET',
    url: `${TWITCH_API_STREAMS_ENDPOINT}${queryString}`,
    headers: {
      'Client-ID': TWITCH_CREDENTIALS.clientId,
      Authorization: `Bearer ${await authenticate(TWITCH_CREDENTIALS)}`,
    },
  })

  return response.data
}
