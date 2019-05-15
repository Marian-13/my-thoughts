import { generateUniqueId } from 'lib/uuid'

export const NOTE_TYPES = {
  THOUGHT: 'thought',
  TASK: 'task'
}

export const NOTE_SUBTYPES = {
  TEXT: 'text',
  AUDIO: 'audio'
}

export const DEFAULT_NOTE_TYPE = NOTE_TYPES.THOUGHT

export const createTextNote = (type, data) => {
  const { text } = data

  return { uid: generateUniqueId(), type, subtype: NOTE_SUBTYPES.TEXT, text }
}

export const createAudioNote = (type, data) => {
  const { sources } = data

  return { uid: generateUniqueId(), type, subtype: NOTE_SUBTYPES.TEXT, sources }
}
