import { SHOW_KEYBOARD, HIDE_KEYBOARD } from './actionsTypes'

const initialState = { isShown: false }

export const keyboard = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_KEYBOARD:
      return { ...state, isShown: true }
    case HIDE_KEYBOARD:
      return { ...state, isShown: false }
    default:
      return state
  }
}
