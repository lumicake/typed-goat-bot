import { ArgumentsWithMessageContext } from '..'

export const command = 'hello'
export const describe = 'hello world command'
export const builder = {}
export const handler = (args: ArgumentsWithMessageContext) => {
  args.message.reply('Hello world!')
}
