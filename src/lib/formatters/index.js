import moment from 'moment'

const PLAYER_FORMAT = 'mm:ss'

export const secondsToPlayerFormat = seconds => {
  return moment.utc((seconds || 0) * 1000).format(PLAYER_FORMAT)
}
