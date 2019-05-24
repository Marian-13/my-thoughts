import * as types from './actionTypes'

const initialState = {
  isRecording: false,
  fragments: []
}

export const audioRecording = (state = initialState, action) => {
  switch (action.type) {
    case types.START_RECORDING_AUDIO:
      return { ...state, isRecording: true, fragments: [...state.fragments, action.fragment] }
    case types.STOP_RECORDING_AUDIO:
      return { ...state, isRecording: false }
    case types.RELEASE_RECORDED_AUDIO:
      return { ...state, isRecording: false, fragments: [] }
    default:
      return state
  }
}
