import { ArgumentsWithContext } from '..'
import { addWatchee } from '../../redux/reducers/watchees'
//import { addWatchee } from '../../redux/reducers/watchees'

interface AddWatcheeCommandType {
  twitchUsernames: string[]
}

export const command = 'add-many-watchees <twitchUsernames...>'
export const describe = 'add many watchees'
export const builder = {
  twitchUsernames: {
    type: 'array',
  },
}
export const handler = ({
  twitchUsernames,
  message,
  store,
}: ArgumentsWithContext & AddWatcheeCommandType) => {
  const { dispatch } = store
  const { id } = message.channel
  console.log(twitchUsernames)
  let added = 0
  twitchUsernames.forEach(twitchUsername => {
    dispatch(addWatchee({ discordChannelId: id, twitchUsername }))
    added++
  })
  message.reply(`added **${added}** watchees.`)
}
