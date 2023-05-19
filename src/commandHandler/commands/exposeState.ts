import { ArgumentsWithContext } from '..'

export const command = 'expose-state'
export const describe = "exposes the bot's internal state"
export const builder = {}
export const handler = async ({ message, store }: ArgumentsWithContext) => {
  const { getState } = store
  const { watcheesSlice } = getState()
  let watchees = watcheesSlice.reduce((acc, item) => {
    acc = `${acc} ${item},`
    return acc
  }, '')
  watchees = watchees.slice(0, -1) + '.'
  message.reply(
    `Number of watchees: ${watcheesSlice.length}` +
      (watcheesSlice.length > 0 ? `\nWatchees: ${watchees}` : '')
  )
}
