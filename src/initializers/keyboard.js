import { SHOW_KEYBOARD, HIDE_KEYBOARD } from 'lib/keyboard/actionsTypes'

window.addEventListener('keyboardWillShow', () => window.store.dispatch({ type: SHOW_KEYBOARD }))
window.addEventListener('keyboardWillHide', () => window.store.dispatch({ type: HIDE_KEYBOARD }))
