import { generateUniqueId } from 'lib/uuid'
import { getFilePath } from 'lib/file'
import { isAndroid } from 'lib/device'

const getAudioFilePath = fileName => {
  if (isAndroid()) return getFilePath(`audio/${fileName}.mp3`)
}

// success is never fired on Android
const success = () => console.log('Success')
const fail = error => console.log(`Error: ${error}`)
const statusChange = status => console.log(`Status: ${status}`)

export const getAudioFile = fileName => {
  const path = getAudioFilePath(fileName)

  return new window.Media(path, success, fail, statusChange)
}
