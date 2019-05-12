import * as types from './actionTypes'

const initialState = { isRecording: false }

export const audio = (state = initialState, action) => {
  switch (action.type) {
    case types.START_AUDIO_RECORDING:
      return { ...state, isRecording: true }
    case types.STOP_AUDIO_RECORDING:
      return { ...state, isRecording: false }
    default:
      return state
  }
}
