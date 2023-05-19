import { ArgumentsWithContext } from '..'

interface AddWatcheeCommandType {
  twitchUsername: string
}

export const command = 'list-watchees'
export const describe = 'Lists all watchees for channel'
export const builder = {}
export const handler = ({
  message,
  store,
}: ArgumentsWithContext & AddWatcheeCommandType) => {
  const { getState } = store
  const { watcheesSlice } = getState()
  const { id } = message.channel

  if (!(id in watcheesSlice)) {
    message.reply('not watching anyone on this channel :pensive:')
    return
  }

  let watchees = watcheesSlice[id].reduce((acc, item) => {
    acc = `${acc} ${item},`
    return acc
  }, '')
  watchees = watchees.slice(0, -1) + '.'

  message.reply(
    `number of watchees: **${watcheesSlice[id].length}**` +
      (watcheesSlice[id].length > 0 ? `\nWatchees: ${watchees}` : '')
  )
}
