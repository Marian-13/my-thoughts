import last from 'lodash/last'

import * as types from './actionTypes'
import {
  createAudioFile,
  startRecordingToAudioFile,
  stopRecordingToAudioFile,
  releaseAudioFile
} from 'lib/audio'

export const startRecordingAudio = () => {
  const audioFile = createAudioFile()

  startRecordingToAudioFile(audioFile)

  return { type: types.START_RECORDING_AUDIO, fragment: audioFile }
}

export const stopRecordingAudio = () => {
  const audioFile = last(window.store.getState().audioRecording.fragments)

  stopRecordingToAudioFile(audioFile)

  return { type: types.STOP_RECORDING_AUDIO }
}

export const releaseRecordedAudio = () => {
  const audioFiles = window.store.getState().audioRecording.fragments

  audioFiles.forEach(releaseAudioFile)

  return { type: types.RELEASE_RECORDED_AUDIO }
}
