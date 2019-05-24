import * as types from './actionTypes'
import AudioRecord from 'lib/audio/record'

import { areTwoArraysEqual } from 'lib/utils/array'

const createOrReuseAudioRecord = (sources, audioRecord) => {
  if (areTwoArraysEqual(sources, audioRecord.getSources())) return audioRecord

  const onStartPlayingNextFragment = index => window.store.dispatch(startPlayingNextAudioRecordFragment(index))
  const onFinishPlaying = () => window.store.dispatch(finishPlayingAudioRecord())
  const newAudioRecord = new AudioRecord(sources, { onStartPlayingNextFragment, onFinishPlaying })

  return newAudioRecord
}

const startPlayingNextAudioRecordFragment = fragmentIndex => {
  return { type: types.START_PLAYING_NEXT_AUDIO_RECORD_FRAGMENT, fragmentIndex }
}

const finishPlayingAudioRecord = () => ({ type: types.FINISH_PLAYING_AUDIO_RECORD })

export const startPlayingAudioRecord = sources => {
  const { audioRecord } = window.store.getState().audioPlaying

  const maybeNewAudioRecord = createOrReuseAudioRecord(sources, audioRecord)

  maybeNewAudioRecord.startPlaying()

  return { type: types.START_PLAYING_AUDIO_RECORD, audioRecord: maybeNewAudioRecord }
}

export const pausePlayingAudioRecord = () => {
  const { audioRecord } = window.store.getState().audioPlaying

  audioRecord.pausePlaying()

  return { type: types.PAUSE_PLAYING_AUDIO_RECORD }
}

export const resumePlayingAudioRecord = () => {
  const { audioRecord } = window.store.getState().audioPlaying

  audioRecord.resumePlaying()

  return { type: types.RESUME_PLAYING_AUDIO_RECORD }
}

export const stopPlayingAudioRecord = () => {
  const { audioRecord } = window.store.getState().audioPlaying

  audioRecord.stopPlaying()

  return { type: types.STOP_PLAYING_AUDIO_RECORD }
}

export const releasePlayedAudioRecord = () => {
  const { audioRecord } = window.store.getState().audioPlaying

  audioRecord.release()

  return { type: types.RELEASE_PLAYED_AUDIO_RECORD }
}
