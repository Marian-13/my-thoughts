import { DEFAULT_NOTE_TYPE } from 'domain/note'
import * as types from './actionTypes'

const initialState = { notes: [], noteType: DEFAULT_NOTE_TYPE }

export const homeScreen = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_NOTE:
      return { ...state, notes: [ action.note, ...state.notes] }
    case types.CHANGE_NOTE_TYPE:
      return { ...state, noteType: action.noteType }
    default:
      return state
  }
}
