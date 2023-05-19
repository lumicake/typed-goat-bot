import { ArgumentsWithContext } from '..'
import { addWatchee } from '../../redux/reducers/watchees'

export const command = 'hello'
export const describe = 'hello world command'
export const builder = {}
export const handler = ({ message, dispatch }: ArgumentsWithContext) => {
  message.reply('Hello world!')
  dispatch(addWatchee({ twitchUsername: message.content }))
}
