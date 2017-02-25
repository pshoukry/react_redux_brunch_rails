import * as constants from '../constants';

const initialState = {
  all: [],
  current: { comments: [] }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case constants.UPDATE_TICKETS:
      return {
        ...state,
        all: action.tickets
      }
      break;
    case constants.UPDATE_CURRENT_TICKET:
      return {
        ...state,
        current: action.ticket
      }
      break;
    default:
      return state
  }
}
