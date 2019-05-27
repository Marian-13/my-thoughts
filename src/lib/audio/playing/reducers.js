import * as types from './actionTypes'
import { updatePropertyInObject, deletePropertyFromObject } from 'lib/utils/immutableObject'

const defaultState = { entries: {}, activeEntryUid: null }

const initialState = defaultState

const extractPropertiesFromAudioTrack = audioTrack => ({
  isPlaying: audioTrack.isPlaying(),
  isPaused: audioTrack.isPaused(),
  isStopped: audioTrack.isStopped(),
  isFinished: audioTrack.isFinished(),
  isReleased: audioTrack.isReleased(),
  fragmentIndex: audioTrack.getCurrentFragmentIndex(),
  // position: audioTrack.getPosition(),
  // `audioTrack` is intented only for internal usage, do NOT refer on it in React Components
  // TODO consider moving `audioTrack` to another storage
  audioTrack
})

const updatePreviousActiveEntry = (state, _action) => {
  if (!state.activeEntryUid) return state

  const entries = updatePropertyInObject(
    state.entries,
    state.activeEntryUid,
    extractPropertiesFromAudioTrack(state.entries[state.activeEntryUid].audioTrack)
  )

  return { ...state, entries }
}

const updateEntryAndMakeItActive = (state, action) => {
  const entries = updatePropertyInObject(
    state.entries,
    action.uid,
    extractPropertiesFromAudioTrack(state.entries[action.uid].audioTrack)
  )

  return { ...state, activeEntryUid: action.uid, entries }
}

const addNewEntryAndMakeItActive = (state, action) => {
  const entries = updatePropertyInObject(
    state.entries,
    action.uid,
    extractPropertiesFromAudioTrack(action.audioTrack)
  )

  return { ...state, activeEntryUid: action.uid, entries }
}

const deleteEntry = (state, action) => {
  return { ...state, activeEntryUid: null, entries: deletePropertyFromObject(state.entries, action.uid) }
}

export const audioPlaying = (state = initialState, action) => {
  if (action.type === types.START_PLAYING_AUDIO_TRACK) {
    let newState = updatePreviousActiveEntry(state, action);
    newState = addNewEntryAndMakeItActive(newState, action)

    return newState
  }

  if (action.type === types.START_PLAYING_NEXT_AUDIO_TRACK_FRAGMENT) {
    return updateEntryAndMakeItActive(state, action)
  }

  if (action.type === types.PAUSE_PLAYING_AUDIO_TRACK) {
    return updateEntryAndMakeItActive(state, action)
  }

  if (action.type === types.RESUME_PLAYING_AUDIO_TRACK) {
    let newState = updatePreviousActiveEntry(state, action);
    newState = updateEntryAndMakeItActive(newState, action)

    return newState
  }

  if (action.type === types.STOP_PLAYING_AUDIO_TRACK) {
    return updateEntryAndMakeItActive(state, action)
  }

  if (action.type === types.FINISH_PLAYING_AUDIO_TRACK) {
    return updateEntryAndMakeItActive(state, action)
  }

  if (action.type === types.RELEASE_PLAYED_AUDIO_TRACK) {
    return deleteEntry(state, action)
  }

  return state
}
