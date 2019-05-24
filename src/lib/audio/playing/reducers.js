import * as types from './actionTypes'
import AudioRecord from 'lib/audio/record'

const defaultState = {
  audioRecord: new AudioRecord([]),
  isPlaying: false,
  isPaused: false,
  isStopped: false,
  isFinished: false,
  isReleased: false,
  position: 0,
  duration: 0
}

const initialState = defaultState

const extractPropertiesFromAudioRecord = audioRecord => ({
  isPlaying: audioRecord.isPlaying(),
  isPaused: audioRecord.isPaused(),
  isStopped: audioRecord.isStopped(),
  isFinished: audioRecord.isFinished(),
  isReleased: audioRecord.isReleased(),
  position: audioRecord.getPosition(),
  duration: audioRecord.getDuration()
})

export const audioPlaying = (state = initialState, action) => {
  switch (action.type) {
    case types.START_PLAYING_AUDIO_RECORD:
      return { ...state, audioRecord: action.audioRecord, ...extractPropertiesFromAudioRecord(action.audioRecord) }
    case types.START_PLAYING_NEXT_AUDIO_RECORD_FRAGMENT:
      return { ...state, ...extractPropertiesFromAudioRecord(state.audioRecord) }
    case types.PAUSE_PLAYING_AUDIO_RECORD:
      return { ...state, ...extractPropertiesFromAudioRecord(state.audioRecord) }
    case types.RESUME_PLAYING_AUDIO_RECORD:
      return { ...state, ...extractPropertiesFromAudioRecord(state.audioRecord) }
    case types.STOP_PLAYING_AUDIO_RECORD:
      return { ...state, ...extractPropertiesFromAudioRecord(state.audioRecord) }
    case types.FINISH_PLAYING_AUDIO_RECORD:
      return { ...state, ...extractPropertiesFromAudioRecord(state.audioRecord) }
    case types.RELEASE_PLAYED_AUDIO_RECORD:
      return { ...state, ...defaultState }
    default:
      return state
  }
}
