import * as types from './actionTypes'

import {
  createTextNote as _createTextNote,
  createAudioNote as _createAudioNote
} from 'domain/note'

export const createTextNote = (noteType, data) => {
  const note = _createTextNote(noteType, data)

  return { type: types.CREATE_TEXT_NOTE, note }
}

export const createAudioNote = (noteType, data) => {
  const note = _createAudioNote(noteType, data)

  return { type: types.CREATE_AUDIO_NOTE, note }
}

export const changeNoteType = noteType => ({ type: types.CHANGE_NOTE_TYPE, noteType })
