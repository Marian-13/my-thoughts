import {
  getMedia as _getMedia,
  startPlayingMedia,
  pausePlayingMedia,
  resumePlayingMedia,
  stopPlayingMedia,
  getPositionOfMedia,
  getDurationOfMedia,
  releaseMedia
} from 'lib/audio'

export default class AudioFile {
  static async create(source, callbacks) {
    return new Promise(resolve => {
      const audioFile = new AudioFile(source, callbacks)

      audioFile.whenReadyToUse().then(resolve)
    })
  }

  isPlaying() {
    return this.playing
  }

  isPaused() {
    return this.paused
  }

  isStopped() {
    return this.stopped
  }

  isFinished() {
    return this.finished
  }

  isReleased() {
    return this.released
  }

  getSource() {
    return this.source
  }

  getPosition() {
    return getPositionOfMedia(this.getMedia())
  }

  getDuration() {
    return this.duration
  }

  startPlaying() {
    this.assertNotReleased()

    this.setStatus({ isPlaying: true })

    startPlayingMedia(this.getMedia())
  }

  pausePlaying() {
    this.assertNotReleased()

    if (this.isPaused()) return
    if (this.isStopped()) return
    if (this.isFinished()) return

    this.setStatus({ isPaused: true })

    pausePlayingMedia(this.getMedia())
  }

  resumePlaying() {
    this.assertNotReleased()

    if (this.isFinished()) return

    this.setStatus({ isPlaying: true })

    resumePlayingMedia(this.getMedia())
  }

  stopPlaying() {
    this.assertNotReleased()

    if (this.isStopped()) return
    if (this.isFinished()) return

    this.setStatus({ isStopped: true })

    stopPlayingMedia(this.getMedia())
  }

  release() {
    this.stopPlaying()

    this.setStatus({ isReleased: true })

    releaseMedia(this.getMedia())
  }

  // private
  constructor(source, callbacks = {}) {
    this.source = source

    this.initializeStatus()
    this.initializeCallbacks(callbacks)
    this.initializeMedia(source)
  }

  async whenReadyToUse() {
    return new Promise(async resolve => {
      this.duration = await getDurationOfMedia(this.getMedia())

      resolve(this)
    })
  }

  initializeStatus() {
    this.setStatus({
      isPlaying: false,
      isPaused: false,
      isStopped: false,
      isFinished: false,
      isReleased: false
    })
  }

  initializeCallbacks({ onPositionChange, onFinishPlaying }) {
    this.onPositionChange = onPositionChange || (_position => {})
    this.onFinishPlaying = onFinishPlaying || (() => {})
  }

  initializeMedia(source) {
    this.media = _getMedia(source, { mediaStatus: this.mediaStatus })
  }

  // setStatus MUST always be called before usage of methods from lib/audio
  setStatus({ isPlaying, isPaused, isStopped, isFinished, isReleased }) {
    this.playing  = isPlaying  || false
    this.paused   = isPaused   || false
    this.stopped  = isStopped  || false
    this.finished = isFinished || false
    this.released = isReleased || false
  }

  getMedia() {
    return this.media
  }

  finishPlaying() {
    this.setStatus({ isFinished: true })

    this.onFinishPlaying()
  }

  // This callback is fired by Cordova Media API
  mediaStatus = status => {
    // Cordova Media API does not distinguish whether media file is stopped or finished
    // It sets `status` to `window.Media.MEDIA_STOPPED` in both cases
    // Thats is why own status tracking is introduced (isPaused, isStopped and so on)
    if (status !== window.Media.MEDIA_STOPPED) return

    if (this.isPaused()) return
    if (this.isStopped()) return
    if (this.isFinished()) return

    this.finishPlaying()
  }

  assertNotReleased() {
    if (this.isReleased()) throw new Error('Method call on already released audio record')
  }
}
