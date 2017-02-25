import * as constants from '../constants'
import * as actions from './'
import fetch from 'isomorphic-fetch'
import {api} from '../api'

export function fetchUser() {
  return function (dispatch) {
    api.get('/users/current')
      .then( res => res.json())
      .then(user => {
        switch(user.role){
          case "admin":
            dispatch(actions.showElements("admin"))
            break
          case "agent":
            dispatch(actions.showElements("agent"))
            break
          case "customer":
            dispatch(actions.showElements("customer"))
            break
          default:
            break
        }
      })
  }
}

export function fetchUsers() {
  return function (dispatch) {
    api.get('/users')
      .then( res => res.json())
      .then(users => {
        dispatch(actions.updateUsers(users))
      })
  }
}

export function updateUser(id, params) {
  return function (dispatch) {
    api.patch('/users/' + id , { user: params })
      .then( () => {
        dispatch(actions.fetchUsers())
      })
  }
}

export function updateUsers(users) {
  return {
    type: constants.UPDATE_USERS,
    users: users
  }
}
