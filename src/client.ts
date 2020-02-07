import { Client } from 'discord.js'
import { BOT_CREDENTIALS } from './config'

const client = new Client()

client.once('ready', () => {
  console.log('Ready!')
})

client.login(BOT_CREDENTIALS.token)

export default client
