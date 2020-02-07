import { config } from 'dotenv-safe'
config()

export const BOT_CREDENTIALS = Object.freeze({
  clientId: process.env.CLIENT_ID!,
  token: process.env.BOT_TOKEN!,
})

export const BOT_CONFIGURATION = Object.freeze({
  botPrefix: process.env.BOT_PREFIX!,
})
