import {
  getAudioFile,
  startPlayingAudioFile,
  pausePlayingAudioFile,
  resumePlayingAudioFile,
  stopPlayingAudioFile,
  getPositionOfAudioFile,
  getDurationOfAudioFile,
  releaseAudioFile
} from 'lib/audio'

export default class AudioRecord {
  constructor(sources, callbacks = {}) {
    this.setStatus({
      isPlaying: false,
      isPaused: false,
      isStopped: false,
      isFinished: false,
      isReleased: false
    })

    this.setCallbacks(callbacks)

    this.sources = sources

    this.fragmentIndex = 0
    this.fragments = sources.map(src => getAudioFile(src, { mediaStatus: this.mediaStatus }))
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

  isCurrentFragmentFinal() {
    return this.getCurrentFragmentIndex() === this.getFragmentsCount() - 1
  }

  getSources() {
    return this.sources
  }

  getFragments() {
    return this.fragments
  }

  getCurrentFragmentIndex() {
    return this.fragmentIndex
  }

  getCurrentFragment() {
    return this.getFragments()[this.getCurrentFragmentIndex()]
  }

  getFragmentsCount() {
    return this.getFragments().length
  }

  getPosition() {
    return this.calculateDuration(this.getFinishedFragments()) + getPositionOfAudioFile(this.getCurrentFragment())
  }

  getDuration() {
    return this.calculateDuration(this.getFragments())
  }

  startPlaying() {
    this.assertNotReleased()

    this.setStatus({ isPlaying: true })

    this.resetFragmentIndex()

    startPlayingAudioFile(this.getCurrentFragment())
  }

  pausePlaying() {
    this.assertNotReleased()

    if (this.isPaused()) return
    if (this.isFinished()) return

    this.setStatus({ isPaused: true })

    pausePlayingAudioFile(this.getCurrentFragment())
  }

  resumePlaying() {
    this.assertNotReleased()

    if (this.isFinished()) return

    this.setStatus({ isPlaying: true })

    resumePlayingAudioFile(this.getCurrentFragment())
  }

  stopPlaying() {
    this.assertNotReleased()

    if (this.isStopped()) return
    if (this.isFinished()) return

    this.setStatus({ isStopped: true })

    stopPlayingAudioFile(this.getCurrentFragment())
  }

  release() {
    this.stopPlaying()

    this.setStatus({ isReleased: true })

    this.getFragments().forEach(releaseAudioFile)
  }

  // private
  startPlayingNextFragment() {
    this.setStatus({ isPlaying: true })

    this.incrementFragmentIndex()

    startPlayingAudioFile(this.getCurrentFragment())

    this.onStartPlayingNextFragment(this.getCurrentFragmentIndex())
  }

  finishPlaying() {
    this.setStatus({ isFinished: true })

    this.resetFragmentIndex()

    this.onFinishPlaying()
  }

  // This callback is fired by Cordova Media API
  mediaStatus = (status) => {
    // HACK If a record is paused right before its finish,
    //      `mediaStatus` callback is called twice in a row.
    //      Since guard clause `if (this.isPaused()) return` is satisfied in the second call,
    //      `fragmentIndex` is not incremented.
    //      As a result, `resumePlaying` starts playing a record from the beginning, instead of resuming it.
    //      The following line fixes this issue
    if (this.isPaused() && status === window.Media.MEDIA_STOPPED && !this.isCurrentFragmentFinal()) {
      this.incrementFragmentIndex()
    }

    // Cordova Media API does not distinguish whether media file is stopped or finished
    // It sets `status` to `window.Media.MEDIA_STOPPED` in both cases
    // Thats is why own status tracking is introduced (isPaused, isStopped and so on)
    if (status !== window.Media.MEDIA_STOPPED) return

    if (this.isPaused()) return
    if (this.isStopped()) return
    if (this.isFinished()) return

    if (!this.isCurrentFragmentFinal()) {
      return this.startPlayingNextFragment()
    }

    this.finishPlaying()
  }

  // setStatus MUST always be called before usage of methods from lib/audio
  setStatus({ isPlaying, isPaused, isStopped, isFinished, isReleased }) {
    this.playing  = isPlaying  || false
    this.paused   = isPaused   || false
    this.stopped  = isStopped  || false
    this.finished = isFinished || false
    this.released = isReleased || false
  }

  setCallbacks({ onStartPlayingNextFragment, onFinishPlaying }) {
    this.onStartPlayingNextFragment = onStartPlayingNextFragment || (fragmentIndex => {})

    this.onFinishPlaying = onFinishPlaying || (() => {})
  }

  resetFragmentIndex() {
    this.fragmentIndex = 0
  }

  incrementFragmentIndex() {
    this.fragmentIndex += 1
  }

  getFinishedFragments() {
    return this.getFragments().slice(0, this.getCurrentFragmentIndex())
  }

  calculateDuration(fragments) {
    return fragments.reduce((duration, fragment) => (duration += getDurationOfAudioFile(fragment)), 0)
  }

  assertNotReleased() {
    if (this.isReleased()) throw new Error('Method call on already released audio record')
  }
}
