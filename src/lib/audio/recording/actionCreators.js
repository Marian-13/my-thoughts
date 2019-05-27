import last from 'lodash/last'

import * as types from './actionTypes'
import {
  createMedia,
  startRecordingMedia,
  stopRecordingMedia,
  releaseMedia
} from 'lib/audio'

export const startRecordingAudio = () => {
  const audioFile = createMedia()

  startRecordingMedia(audioFile)

  return { type: types.START_RECORDING_AUDIO, fragment: audioFile }
}

export const stopRecordingAudio = () => {
  const audioFile = last(window.store.getState().audioRecording.fragments)

  stopRecordingMedia(audioFile)

  return { type: types.STOP_RECORDING_AUDIO }
}

export const releaseRecordedAudio = () => {
  const audioFiles = window.store.getState().audioRecording.fragments

  audioFiles.forEach(releaseMedia)

  return { type: types.RELEASE_RECORDED_AUDIO }
}
