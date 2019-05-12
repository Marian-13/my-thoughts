import { CHANGE_SCREEN_ORIENTATION } from 'lib/screenOrientation/actionTypes'
import { getScreenOrientationType } from 'lib/screenOrientation'
import { updateBackgroundImage } from 'lib/backgroundImage'

window.addEventListener('orientationchange', () => {
  window.store.dispatch({ type: CHANGE_SCREEN_ORIENTATION, screenOrientationType: getScreenOrientationType() })
})

let previousScreenOrientationType = getScreenOrientationType()

window.store.subscribe(() => {
  const state = window.store.getState().screenOrientation
  const currentScreenOrientationType = state.screenOrientationType

  if (currentScreenOrientationType !== previousScreenOrientationType) updateBackgroundImage()

  previousScreenOrientationType = currentScreenOrientationType
})
