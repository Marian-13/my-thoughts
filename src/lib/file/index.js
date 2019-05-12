import { isAndroid } from 'lib/device'

export const getFilePath = fileName => {
  if (isAndroid()) return `file:///android_asset/www/${fileName}`

  return `file:///${fileName}`
}
