import * as constants from '../constants';

const initialState = {
  all: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case constants.UPDATE_USERS:
      return {
        all: action.users
      }
      break;
    default:
      return state;
  }
}
