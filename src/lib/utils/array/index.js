import isEmpty from 'lodash/isEmpty'
import difference from 'lodash/difference'

export const areTwoArraysEqual = (firstArray, secondArray) => {
  if (!Array.isArray(firstArray) || !Array.isArray(secondArray)) return false

  return isEmpty(difference(firstArray, secondArray)) && isEmpty(difference(secondArray, firstArray));
}
