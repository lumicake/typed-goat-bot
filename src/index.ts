import discordAPI from './services/discord/api'
const { client } = discordAPI
import { BOT_CONFIGURATION } from './config'
import { handleCommand } from './commandHandler'
const { botPrefix } = BOT_CONFIGURATION
import { fetchStreamsDataForUsers } from './services/twitch/api'
import store from './redux'
import { pushStreamData, removeStreamData } from './redux/reducers/streams'
import { DateTime } from 'luxon'

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

const difference = <T>(setA: Set<T>, setB: Set<T>) => {
  const _difference = new Set(setA)
  for (const elem of setB) {
    _difference.delete(elem)
  }
  return _difference
}

setInterval(() => {
  const { getState, dispatch } = store
  const { watcheesSlice, streamsSlice } = getState()
  Object.keys(watcheesSlice).forEach(async channelId => {
    const watchees = watcheesSlice[channelId]
    const response = await fetchStreamsDataForUsers(watchees)
    const { data } = response
    const onlineArray = data.map(item => item.user_name)
    const onlineWatchees = new Set(onlineArray)
    const allWatchees = new Set(watchees)
    const offlineWatchees = difference(allWatchees, onlineWatchees)
    // console.log('all watchees', allWatchees)
    // console.log('online watchees', onlineWatchees)
    // console.log('offline watchees', offlineWatchees)

    offlineWatchees.forEach((twitchUsername: string) =>
      dispatch(removeStreamData({ twitchUsername }))
    )

    onlineWatchees.forEach((twitchUsername: string) => {
      if (!(twitchUsername in streamsSlice)) {
        const streamData = data.find(item => item.user_name === twitchUsername)!
        dispatch(
          pushStreamData({
            twitchUsername,
            streamData,
          })
        )

        const wentOnlineAt = DateTime.fromISO(streamData.started_at)
        const diffNowThen = wentOnlineAt.diffNow('minutes')
        let agoString = ''
        if (diffNowThen.minutes <= -2) {
          agoString = `**${Math.round(
            Math.abs(diffNowThen.minutes)
          )}** minutes ago`
        } else if (diffNowThen.minutes > -2 && diffNowThen.minutes <= -1) {
          agoString = '**1** minute ago'
        } else if (diffNowThen.minutes > -1 && diffNowThen.minutes <= 0) {
          agoString = 'just **now**'
        }

        const ad = `https://twitch.tv/${twitchUsername}`
        const message = `${twitchUsername} went online ${agoString}!\n${ad}`
        discordAPI.sendMessageToChannel(channelId, message)
      }
    })
  })
}, 1000 * 30)
