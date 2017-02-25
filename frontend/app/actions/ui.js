import * as constants from '../constants'

export function showElements(role) {
  return {
    type: constants.SHOW_ELEMENTS,
    role: role
  }
}
