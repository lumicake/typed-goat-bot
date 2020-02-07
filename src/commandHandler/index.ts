import { Message } from 'discord.js'
import { Arguments } from 'yargs'
import yargs from 'yargs'
import { BOT_CONFIGURATION } from '../config'

export interface ArgumentsWithMessageContext extends Arguments {
  message: Message
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
    { message },
    (error: Error | undefined, args: yargs.Arguments, output: string) => {
      console.log(error)
      console.log(args)
      console.log(output)
      if (error) {
        console.error(error)
      }
      if (output) {
        let massagedOutput = output
          .replace('index.js ', '')
          .replace('argument', 'command')
        if (args._[0] === 'help') {
          massagedOutput = massagedOutput.substring(
            0,
            massagedOutput.lastIndexOf('\n')
          )
        }
        message.reply(massagedOutput)
      }
    }
  )
}
