import { generateUniqueId } from 'lib/uuid'
import { isAndroid } from 'lib/device'

const defaultMediaSuccess = (argument) => { console.log('defaultMediaSuccess'); console.log(argument); return argument }
const defaultMediaError = error => { console.log('defaultMediaError'); console.log(Object.entries(error)) }
const defaultMediaStatus = status => { console.log('defaultMediaStatus'); console.log(status) }

const generateFileName = () => `my-thoughts-${generateUniqueId()}`
const generateSrc = () => `${generateFileName()}.${getFileExtention()}`

export const getFileExtention = () => isAndroid() ? 'mp3' : 'wav'

export const createMedia = () => {
  const src = generateSrc()

  return new window.Media(src, defaultMediaSuccess, defaultMediaError, defaultMediaStatus)
}

export const getMedia = (src, { mediaSuccess, mediaError, mediaStatus } = {}) => {
  return new window.Media(
    src,
    mediaSuccess || defaultMediaSuccess,
    mediaError || defaultMediaError,
    status => { defaultMediaStatus(status); mediaStatus(status); }
  )
}

export const startRecordingMedia = media => media.startRecord()
export const stopRecordingMedia = media => media.stopRecord()

export const startPlayingMedia = media => media.play()
export const pausePlayingMedia = media => media.pause()
export const resumePlayingMedia = media => media.play()
export const stopPlayingMedia = media => media.stop()

export const getSourceOfMedia = media => media.src

export const getDurationOfMedia = async media => {
  // https://stackoverflow.com/questions/13367593/phonegap-unable-to-getduration-out-of-media-api-but-other-methods-work/25801286#25801286
  media.play()
  media.stop()

  // https://github.com/ionic-team/ng-cordova/issues/1040#issuecomment-340020846
  // https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-media/#mediagetduration
  return new Promise((resolve, reject) => {
    let counter = 0

    const timer = setInterval(() => {
      if (counter >= 2000) {
        clearInterval(timer)

        reject()
      }

      let duration = media.getDuration()

      if (duration > 0) {
        clearInterval(timer)

        resolve(duration)
      }
    }, 100)
  })
}

export const getPositionOfMedia = media => {
  let position = null

  const mediaSuccess = mediaPosition => (position = mediaPosition && mediaPosition > -1 ? mediaPosition : 0)

  media.getCurrentPosition(mediaSuccess, defaultMediaError)

  return position
}

export const releaseMedia = audioFile => audioFile.release()

// media.pauseRecord() and media.resumeRecord() are not working, at least in Android, but it does not make difference
// use startRecord() and stopRecord() of new media instance instead
