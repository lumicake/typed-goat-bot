import { Message } from 'discord.js'
import { Arguments } from 'yargs'
import yargs from 'yargs'
import { BOT_CONFIGURATION } from '../config'
import store from '../redux'

export interface ArgumentsWithContext extends Arguments {
  message: Message
  store: typeof store
}

const parser = yargs
  .usage(`${BOT_CONFIGURATION.botPrefix}<command> [options]`)
  .commandDir('commands')
  .demandCommand(1)
  .strict()
  .help(false)
  .version(false)

export const handleCommand = (command: string, message: Message) => {
  parser.parse(
    command,
    { message, store },
    (error: Error | undefined, args: yargs.Arguments, output: string) => {
      if (output) {
        let massagedOutput = output
          .replace(/index.js /g, '')
          .replace(/argument/g, 'command')
        if (args._[0] === 'help') {
          massagedOutput = massagedOutput.substring(
            0,
            massagedOutput.lastIndexOf('\n')
          )
        }
        message.reply('```' + massagedOutput + '```')
      }
    }
  )
}
