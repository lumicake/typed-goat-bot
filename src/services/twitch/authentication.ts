import querystring from 'querystring'
import axios from 'axios'
import { DateTime } from 'luxon'

let accessToken: string | null = null
let accessTokenExpiresAt: DateTime = DateTime.local()

const fetchAccessToken = async (clientId: string, clientSecret: string) => {
  const response = await axios({
    method: 'POST',
    url: 'https://id.twitch.tv/oauth2/token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    /* eslint-disable @typescript-eslint/camelcase */
    data: querystring.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    }),
    /* eslint-enable @typescript-eslint/camelcase */
  })

  accessToken = response.data.access_token
  accessTokenExpiresAt = DateTime.local().plus({
    seconds: response.data.expires_in,
  })

  return accessToken
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isCacheValid = (cache: any, expiresAt: DateTime): boolean => {
  const currentTime = DateTime.local()

  return cache !== null && currentTime < expiresAt
}

export const authenticate = async ({
  clientId,
  clientSecret,
}: {
  clientId: string
  clientSecret: string
}): Promise<string> => {
  if (!isCacheValid(accessToken, accessTokenExpiresAt)) {
    await fetchAccessToken(clientId, clientSecret)
  }

  return accessToken as string
}
