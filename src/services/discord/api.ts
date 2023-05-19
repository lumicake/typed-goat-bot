import client from '../../client'

export const getDiscordApi = () => {
  const wrappedApi = {
    client,
    sendMessageToChannel: (channelId: string, message: string) => {
      ;(client.channels.get(channelId) as any).send(message)
    },
  }

  return wrappedApi
}

export default getDiscordApi()
