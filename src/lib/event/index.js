export const isEnter = event => event.keyCode === 13 && !isShift(event)
export const isShift = event => event.shiftKey
export const isAlt = event => event.altKey
export const isCtrl = event => event.ctrlKey
