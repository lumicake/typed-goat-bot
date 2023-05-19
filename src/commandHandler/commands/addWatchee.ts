import { ArgumentsWithContext } from '..'
import { addWatchee } from '../../redux/reducers/watchees'

interface AddWatcheeCommandType {
  twitchUsername: string
}

export const command = 'add-watchee <twitchUsername>'
export const describe = 'Command to add-watchees'
export const builder = {}
export const handler = ({
  twitchUsername,
  message,
  store,
}: ArgumentsWithContext & AddWatcheeCommandType) => {
  const { dispatch } = store
  const { id } = message.channel
  const watchee = addWatchee({ discordChannelId: id, twitchUsername })
  dispatch(watchee)
  message.reply(`adding watchee **${twitchUsername}**.`)
}
