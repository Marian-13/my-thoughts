import { generateUniqueId } from 'lib/uuid'
import { isAndroid } from 'lib/device'

const mediaSuccess = () => console.log('mediaSuccess')
const mediaError = error => { console.log('mediaError'); console.log(Object.entries(error)) }
const mediaStatus = status => { console.log('mediaStatus'); console.log(status) }

const generateFileName = () => `my-thoughts-${generateUniqueId()}`
const generateSrc = () => `${generateFileName()}.${getAudioFileExtention()}`

export const getAudioFileExtention = () => isAndroid() ? 'mp3' : 'wav'

export const createAudioFile = () => {
  const src = generateSrc()

  return new window.Media(src, mediaSuccess, mediaError, mediaStatus)
}

export const getAudioFile = src => {
  return new window.Media(src, mediaSuccess, mediaError, mediaStatus)
}

export const startRecordingToAudioFile = audioFile => audioFile.startRecord()
export const stopRecordingToAudioFile = audioFile => audioFile.stopRecord()

export const startPlayingAudioFile = audioFile => audioFile.play()
export const pausePlayingAudioFile = audioFile => audioFile.pause()

export const releaseAudioFile = audioFile => audioFile.release()

// media.pauseRecord() and meadia resumeRecord() are not working,
// use startRecord() and stopRecord() of new media instance instead
