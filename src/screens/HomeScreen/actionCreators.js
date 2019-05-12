import * as types from './actionTypes'

export const addNote = note => ({ type: types.ADD_NOTE, note })
export const changeNoteType = noteType => ({ type: types.CHANGE_NOTE_TYPE, noteType })
