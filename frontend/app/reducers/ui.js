import * as constants from '../constants';

const initialState = {
  visibleSectionLinks: {
    tickets: false,
    users: false
  },
  visibleTicketsLinks: {
    mine: true,
    assigned: false,
    closedLast30Days: false,
    all: false
  },
  allowedActions: {
    assign: false
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case constants.SHOW_ELEMENTS:
      switch(action.role) {
        case "admin":
          return {
            ...state,
            visibleSectionLinks: {
              tickets: true,
              users: true
            },
            visibleTicketsLinks: {
              mine: true,
              assigned: true,
              closedLast30Days: false,
              all: true
            },
            allowedActions: {
                  assign: true
                }
          }
          break;
        case "agent":
          return {
            ...state,
            visibleSectionLinks: {
              tickets: false,
              users: false
            },
            visibleTicketsLinks: {
              mine: true,
              assigned: true,
              closedLast30Days: true,
              all: true
            },
            allowedActions: {
                  assign: true
                }
          }
          break;
        default:
          return state;
      }
      break;
    default:
      return state
  }
}
