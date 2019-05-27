import * as types from './actionTypes'
import AudioTrack from 'lib/audio/track'

import { areTwoArraysEqual } from 'lib/utils/array'

const createOrReuseAudioTrack = async (uid, sources) => {
  const audioTrack = getAudioTrackByUid(uid)

  if (audioTrack && areTwoArraysEqual(sources, audioTrack.getSources())) return audioTrack

  return new Promise(resolve => {
    const onStartPlayingNextFragment = index => window.store.dispatch(startPlayingNextAudioTrackFragment(uid, index))
    const onFinishPlaying = () => window.store.dispatch(finishPlayingAudioTrack(uid))

    const newAudioTrack = new AudioTrack.create(sources, { onStartPlayingNextFragment, onFinishPlaying })

    resolve(newAudioTrack)
  })
}

const getAudioTrackByUid = uid => {
  const entry = window.store.getState().audioPlaying.entries[uid]
  const audioTrack = entry && entry.audioTrack

  return audioTrack
}

const getPreviousActiveAudioTrack = () => {
  const { activeEntryUid } = window.store.getState().audioPlaying

  return getAudioTrackByUid(activeEntryUid)
}

export const startPlayingAudioTrack = async (uid, sources) => {
  const previousActiveAudioTrack = getPreviousActiveAudioTrack()
  if (previousActiveAudioTrack) previousActiveAudioTrack.pausePlaying()

  const audioTrack = await createOrReuseAudioTrack(uid, sources)
  audioTrack.startPlaying()

  return { type: types.START_PLAYING_AUDIO_TRACK, audioTrack, uid }
}

const startPlayingNextAudioTrackFragment = (uid, fragmentIndex) => {
  return { type: types.START_PLAYING_NEXT_AUDIO_TRACK_FRAGMENT, uid, fragmentIndex }
}

export const pausePlayingAudioTrack = uid => {
  const audioTrack = getAudioTrackByUid(uid)

  audioTrack.pausePlaying()

  return { type: types.PAUSE_PLAYING_AUDIO_TRACK, uid }
}

export const resumePlayingAudioTrack = uid => {
  const previousActiveAudioTrack = getPreviousActiveAudioTrack()
  if (previousActiveAudioTrack) previousActiveAudioTrack.pausePlaying()

  const audioTrack = getAudioTrackByUid(uid)
  audioTrack.resumePlaying()

  return { type: types.RESUME_PLAYING_AUDIO_TRACK, uid }
}

export const stopPlayingAudioTrack = uid => {
  const audioTrack = getAudioTrackByUid(uid)

  audioTrack.stopPlaying()

  return { type: types.STOP_PLAYING_AUDIO_TRACK, uid }
}

const finishPlayingAudioTrack = uid => ({ type: types.FINISH_PLAYING_AUDIO_TRACK, uid })

export const releasePlayedAudioTrack = uid => {
  const audioTrack = getAudioTrackByUid(uid)

  audioTrack.release()

  return { type: types.RELEASE_PLAYED_AUDIO_TRACK, uid }
}
