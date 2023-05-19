import { ArgumentsWithContext } from '..'

export const command = 'expose-state'
export const describe = "exposes the bot's internal state"
export const builder = {}
export const handler = async ({ message, store }: ArgumentsWithContext) => {
  const { getState } = store
  const { watcheesSlice } = getState()
  const { id } = message.channel

  if (!(id in watcheesSlice)) {
    message.reply('Not watching anyone on this channel :pensive:')
    return
  }

  let watchees = watcheesSlice[id].reduce((acc, item) => {
    acc = `${acc} ${item},`
    return acc
  }, '')
  watchees = watchees.slice(0, -1) + '.'

  message.reply(
    `Number of watchees: ${watcheesSlice[id].length}` +
      (watcheesSlice[id].length > 0 ? `\nWatchees: ${watchees}` : '')
  )
}
