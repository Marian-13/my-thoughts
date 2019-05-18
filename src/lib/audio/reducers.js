import * as types from './actionTypes'

const initialState = {
  isRecording: false,
  filesForRecording: [],
  isPlaying: false,
  isPaused: false,
  isStopped: false,
  isFinished: false,
  fragmentIndex: 0,
  filesForPlaying: []
}

export const audio = (state = initialState, action) => {
  switch (action.type) {
    case types.START_RECORDING_AUDIO:
      return { ...state, isRecording: true, filesForRecording: [...state.filesForRecording, action.file] }
    case types.STOP_RECORDING_AUDIO:
      return { ...state, isRecording: false }
    case types.RELEASE_RECORDED_AUDIO:
      return { ...state, isRecording: false, filesForRecording: [] }
    case types.FINISH_PLAYING_AUDIO:
      return { ...state, isPlaying: false, isPaused: false, isFinished: true, fragmentIndex: 0 }
    case types.START_PLAYING_NEXT_AUDIO_FRAGMENT:
      return { ...state, fragmentIndex: state.fragmentIndex + 1 }
    case types.START_PLAYING_AUDIO:
      return { ...state, isPlaying: true, isPaused: false, isFinished: false, isStopped: false, filesForPlaying: action.files }
    case types.PAUSE_PLAYING_AUDIO:
      return { ...state, isPlaying: false, isPaused: true, isFinished: false, isStopped: false }
    case types.RESUME_PLAYING_AUDIO:
      return { ...state, isPlaying: true, isPaused: false, isFinished: false, isStopped: false }
    case types.STOP_PLAYING_AUDIO:
      return { ...state, isPlaying: false, isPaused: false, isFinished: false, isStopped: true }
    case types.RELEASE_PLAYED_AUDIO:
      return { ...state, isPlaying: false, isPaused: false, isFinished: false, isStopped: false, fragmentIndex: 0, filesForPlaying: [] }
    default:
      return state
  }
}
