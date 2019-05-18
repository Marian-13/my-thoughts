import first from 'lodash/first'
import last from 'lodash/last'

import * as types from './actionTypes'
import {
  createAudioFile,
  getAudioFile,
  startRecordingToAudioFile,
  stopRecordingToAudioFile,
  startPlayingAudioFile,
  pausePlayingAudioFile,
  resumePlayingAudioFile,
  stopPlayingAudioFile,
  releaseAudioFile
} from 'lib/audio'

const finishPlayingAudio = () => {
  return { type: types.FINISH_PLAYING_AUDIO }
}

const startPlayingNextAudioFragment = () => {
  const state = window.store.getState().audio

  const nextFragmentIndex = state.fragmentIndex + 1
  const audioFile = state.filesForPlaying[nextFragmentIndex]

  startPlayingAudioFile(audioFile)

  return { type: types.START_PLAYING_NEXT_AUDIO_FRAGMENT }
}

export const startRecordingAudio = () => {
  const audioFile = createAudioFile()

  startRecordingToAudioFile(audioFile)

  return { type: types.START_RECORDING_AUDIO, file: audioFile }
}

export const stopRecordingAudio = () => {
  const audioFile = last(window.store.getState().audio.filesForRecording)

  stopRecordingToAudioFile(audioFile)

  return { type: types.STOP_RECORDING_AUDIO }
}

export const releaseRecordedAudio = () => {
  const audioFiles = window.store.getState().audio.filesForRecording

  audioFiles.forEach(releaseAudioFile)

  return { type: types.RELEASE_RECORDED_AUDIO }
}

export const startPlayingAudio = sources => {
  const mediaStatus = status => {
    const { fragmentIndex, isStopped, filesForPlaying } = window.store.getState().audio

    if (status !== 4) return
    if (isStopped) return

    if (fragmentIndex < filesForPlaying.length - 1) {
      return window.store.dispatch(startPlayingNextAudioFragment())
    }

    window.store.dispatch(finishPlayingAudio())
  }

  const audioFiles = sources.map(src => getAudioFile(src, { mediaStatus }))

  startPlayingAudioFile(first(audioFiles))

  return { type: types.START_PLAYING_AUDIO, files: audioFiles }
}

export const pausePlayingAudio = () => {
  const { fragmentIndex, filesForPlaying } = window.store.getState().audio

  pausePlayingAudioFile(filesForPlaying[fragmentIndex])

  return { type: types.PAUSE_PLAYING_AUDIO }
}

export const resumePlayingAudio = () => {
  const { fragmentIndex, filesForPlaying } = window.store.getState().audio

  // TODO
  resumePlayingAudioFile(filesForPlaying[fragmentIndex])

  return { type: types.RESUME_PLAYING_AUDIO }
}

export const stopPlayingAudio = () => {
  const { fragmentIndex, filesForPlaying } = window.store.getState().audio

  stopPlayingAudioFile(filesForPlaying[fragmentIndex])

  return { type: types.STOP_PLAYING_AUDIO }
}

export const releasePlayedAudio = () => {
  const audioFiles = window.store.getState().audio.filesForRecording

  audioFiles.forEach(releaseAudioFile)

  return { type: types.RELEASE_PLAYED_AUDIO }
}
