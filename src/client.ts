import { Client } from 'discord.js'
import { BOT_CREDENTIALS } from './config'

const client = new Client()

client.once('ready', () => {
  console.log('Ready!')
})

client.login(BOT_CREDENTIALS.token)

export const wrapDiscordClient = (client: Client) => {
  const wrappedApi = {
    client,
    sendMessageToChannel: (channelId: string, message: string) => {
      let channel = client.channels.get(channelId) as any
      if (channel === undefined) {
        channel = (client.channels as any).fetch(channelId)
      }

      channel.send(message)
    },
  }

  return wrappedApi
}

export default client
