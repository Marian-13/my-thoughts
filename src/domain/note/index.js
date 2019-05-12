import { generateUniqueId } from 'lib/uuid'

export const NOTE_TYPES = {
  THOUGHT: 'thought',
  TASK: 'task'
}

export const DEFAULT_NOTE_TYPE = NOTE_TYPES.THOUGHT

export const createNote = (type, data) => {
  const { text } = data

  return { uid: generateUniqueId(), type, text }
}
