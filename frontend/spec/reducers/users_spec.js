import * as reducers from '../../app/reducers'

const initialState = {
  all: []
}

describe("User Reducer", function() {
  it("returns default state if action is unknown", function(){
    expect(reducers.users(undefined, {type: "UNKNOWN"})).toEqual(initialState)
  })

  describe("#UPDATE_USERS", function() {
    it("shows section links", function() {
      expect(reducers.users(undefined, { type: "UPDATE_USERS", users: [] })).toEqual({
        all: []
      })
    })
  })
})
