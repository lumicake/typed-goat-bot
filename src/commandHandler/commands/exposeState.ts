import { ArgumentsWithContext } from '..'

export const command = 'expose-state'
export const describe = "exposes the bot's internal state"
export const builder = {}
export const handler = async ({ message, store }: ArgumentsWithContext) => {
  const { getState } = store
  const { watcheesSlice } = getState()
  const { id } = message.channel

  let watcheesThisChannel = []
  if (id in watcheesSlice) {
    watcheesThisChannel = watcheesSlice[id]
  }

  let watchees = watcheesSlice[id].reduce((acc, item) => {
    acc = `${acc} ${item},`
    return acc
  }, '')
  watchees = watchees.slice(0, -1) + '.'

  message.reply(
    `number of channels with watchees: **${
      Object.keys(watcheesSlice).length
    }**` +
      `this channel in watchee channels: **${id in watcheesSlice}**\n` +
      `number of watchees this channel: **${watcheesThisChannel.length}**` +
      (watcheesThisChannel.length > 0
        ? `\nwatchees this channel: ${watchees}`
        : '')
  )
}
