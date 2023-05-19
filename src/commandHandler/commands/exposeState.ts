import { ArgumentsWithContext } from '..'
import { addWatchee } from '../../redux/reducers/watchees'

export const command = 'expose-state'
export const describe = "exposes the bot's internal state"
export const builder = {}
export const handler = ({ message, dispatch }: ArgumentsWithContext) => {
  message.reply('Hello world!')
  dispatch(addWatchee({ twitchUsername: message.content }))
}
