import * as types from './actionTypes'
import { getScreenOrientationType } from 'lib/screenOrientation'

const initialState = { screenOrientationType: getScreenOrientationType() }

export const screenOrientation = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_SCREEN_ORIENTATION:
      return { ...state, screenOrientationType: action.screenOrientationType }
    default:
      return state
  }
}
