import * as types from './actionTypes'

import {
  createTextNote as _createTextNote,
  createAudioNote as _createAudioNote
} from 'domain/note'

export const createTextNote = data => {
  const noteType = window.store.getState().homeScreen.noteType
  const note = _createTextNote(noteType, data)

  return { type: types.CREATE_TEXT_NOTE, note }
}

export const createAudioNote = data => {
  const noteType = window.store.getState().homeScreen.noteType
  const note = _createAudioNote(noteType, data)

  return { type: types.CREATE_AUDIO_NOTE, note }
}

export const changeNoteType = noteType => ({ type: types.CHANGE_NOTE_TYPE, noteType })
