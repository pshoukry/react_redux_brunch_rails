import * as reducers from '../../app/reducers'

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

describe("UI Reducer", function() {
  it("returns default state if action is unknown", function(){
    expect(reducers.ui(undefined, {type: "UNKNOWN"})).toEqual(initialState)
  })

  describe("with admin", function() {
    describe("#SHOW_ELEMENTS", function() {
      it("shows admin UI elements", function() {
        expect(reducers.ui(undefined, { type: "SHOW_ELEMENTS", role: "admin" })).toEqual({
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
        })
      })
    })
  })

  describe("with agent", function() {
    describe("#SHOW_ELEMENTS", function() {
      it("shows agents UI elements", function() {
        expect(reducers.ui(undefined, { type: "SHOW_ELEMENTS", role: "agent" })).toEqual({
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
        })
      })
    })
  })

  describe("with no role", function() {
    describe("#SHOW_ELEMENTS", function() {
      it("return default state", function() {
        expect(reducers.ui(undefined, { type: "SHOW_ELEMENTS", role: undefined })).toEqual(initialState )
      })
    })
  })
})
