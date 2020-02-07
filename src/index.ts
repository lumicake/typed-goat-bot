import client from './client'
import { BOT_CONFIGURATION } from './config'
import { handleCommand } from './commandHandler'
const { botPrefix } = BOT_CONFIGURATION

const isPrefixed = (message: string) => {
  return message.substring(0, botPrefix.length) === botPrefix
}

const stripPrefix = (message: string) => message.substring(botPrefix.length)

client.on('message', message => {
  const { content } = message

  if (isPrefixed(content)) {
    handleCommand(stripPrefix(content), message)
  }
})
