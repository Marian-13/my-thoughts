import AudioFile from 'lib/audio/file'

export default class AudioTrack {
  static async create(sources, callbacks) {
    return new Promise((resolve, _reject) => {
      const audioTrack = new AudioTrack(sources, callbacks)

      audioTrack.whenReadyToUse().then(resolve)
    })
  }

  isPlaying() {
    return this.getCurrentFragment().isPlaying()
  }

  isPaused() {
    return this.getCurrentFragment().isPaused()
  }

  isStopped() {
    return this.isCurrentFragmentFirst() && this.getFragments.every(fragment => fragment.isStopped())
  }

  isFinished() {
    return this.isCurrentFragmentLast() && this.getFragments.every(fragment => fragment.isFinished())
  }

  isReleased() {
    return this.getFragments().every(fragment => fragment.isReleased())
  }

  isCurrentFragmentFirst() {
    return this.getCurrentFragmentIndex() === 0
  }

  isCurrentFragmentLast() {
    return this.getCurrentFragmentIndex() === this.getFragmentsCount() - 1
  }

  getSources() {
    return this.getFragments().map(fragment => fragment.getSource())
  }

  getFragments() {
    return this.fragments
  }

  getFinishedFragments() {
    return this.getFragments().filter(fragment => fragment.isFinished())
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
    return this.calculateDuration(this.getFinishedFragments()) + this.getCurrentFragment().getPosition()
  }

  getDuration() {
    return this.getFragments().reduce((duration, fragment) => (duration += fragment.getFragment()), 0)
  }

  startPlaying() {
    this.resetFragmentIndex()

    this.getCurrentFragment().startPlaying()
  }

  pausePlaying() {
    this.getCurrentFragment().pausePlaying()
  }

  resumePlaying() {
    this.getCurrentFragment().resumePlaying()
  }

  stopPlaying() {
    this.getCurrentFragment().stopPlaying()
  }

  release() {
    this.stopPlaying()

    this.getFragments().forEach(fragment => fragment.release())
  }

  // private
  constructor(sources, callbacks = {}) {
    this.fragmentIndex = 0

    this.initializeCallbacks(callbacks)
  }

  async whenReadyToUse() {
    return new Promise(async (resolve, _reject) => {
      const callbacks = {
        onPositionChange: this.handleFragmentPositionChange,
        onFinishPlaying: this.handleFragmentFinishPlaying
      }

      this.fragments = await Promise.all(this.getSources().map(source => AudioFile.create(source, callbacks)))

      resolve(this)
    })
  }

  initializeCallbacks({ onPositionChange, onFinishPlaying }) {
    this.onPositionChange = onPositionChange || (_position => {})
    this.onFinishPlaying = onFinishPlaying || (() => {})
  }

  handleFragmentPositionChange = () => {

  }

  handleFragmentFinishPlaying = () => {
    if (!this.isCurrentFragmentLast()) {
      return this.startPlayingNextFragment()
    }

    this.finishPlaying()
  }

  resetFragmentIndex() {
    this.fragmentIndex = 0
  }

  incrementFragmentIndex() {
    this.fragmentIndex += 1
  }

  startPlayingNextFile() {
    this.incrementFragmentIndex()

    this.getCurrentFragment().startPlaying()

    this.onStartPlayingNextFragment(this.getCurrentFragmentIndex())
  }

  finishPlaying() {
    this.resetFragmentIndex()

    this.onFinishPlaying()
  }

  calculateDuration(fragments) {
    return fragments.reduce((duration, fragment) => (duration += fragment.getDuration()), 0)
  }
}
