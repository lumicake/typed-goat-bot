import { ArgumentsWithContext } from '..'

export const command = 'expose-state'
export const describe = "exposes the bot's internal state"
export const builder = {}
export const handler = async ({ message, store }: ArgumentsWithContext) => {
  const { getState } = store
  const { watcheesSlice, streamsSlice } = getState()
  const { id } = message.channel

  let watcheesThisChannel: string[] = []
  if (id in watcheesSlice) {
    watcheesThisChannel = watcheesSlice[id]
  }

  let watchees = watcheesThisChannel.reduce((acc, item) => {
    acc = `${acc} ${item},`
    return acc
  }, '')
  watchees = watchees.slice(0, -1) + '.'

  message.reply(
    `channel id: **${id}**\n` +
      `number of channels with watchees: **${
        Object.keys(watcheesSlice).length
      }**\n` +
      `this channel in watchee channels: **${id in watcheesSlice}**\n` +
      `entries in streams slice: **${Object.keys(streamsSlice).length}**` +
      `number of watchees this channel: **${watcheesThisChannel.length}**\n` +
      (watcheesThisChannel.length > 0
        ? `\nwatchees this channel: ${watchees}`
        : '')
  )
}
