import { generateUniqueId } from 'lib/uuid'
import { isAndroid } from 'lib/device'

const defaultMediaSuccess = () => console.log('defaultMediaSuccess')
const defaultMediaError = error => { console.log('defaultMediaError'); console.log(Object.entries(error)) }
const defaultMediaStatus = status => { console.log('defaultMediaStatus'); console.log(status) }

const generateFileName = () => `my-thoughts-${generateUniqueId()}`
const generateSrc = () => `${generateFileName()}.${getAudioFileExtention()}`

export const getAudioFileExtention = () => isAndroid() ? 'mp3' : 'wav'

export const createAudioFile = () => {
  const src = generateSrc()

  return new window.Media(src, defaultMediaSuccess, defaultMediaError, defaultMediaStatus)
}

export const getAudioFile = (src, { mediaSuccess, mediaError, mediaStatus } = {}) => {
  return new window.Media(
    src,
    mediaSuccess || defaultMediaSuccess,
    mediaError || defaultMediaError,
    mediaStatus || defaultMediaStatus
  )
}

export const startRecordingToAudioFile = audioFile => audioFile.startRecord()
export const stopRecordingToAudioFile = audioFile => audioFile.stopRecord()

export const startPlayingAudioFile = audioFile => audioFile.play()
export const pausePlayingAudioFile = audioFile => audioFile.pause()
export const resumePlayingAudioFile = audioFile => audioFile.play()
export const stopPlayingAudioFile = audioFile => audioFile.stop()

export const releaseAudioFile = audioFile => audioFile.release()

// media.pauseRecord() and meadia resumeRecord() are not working,
// use startRecord() and stopRecord() of new media instance instead
