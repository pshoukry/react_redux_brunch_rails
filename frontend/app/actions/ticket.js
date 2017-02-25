import * as constants from '../constants'
import * as actions from './'
import {api} from '../api'

export function createTicket(title, desc) {
  return function (dispatch) {
    api.post('/tickets', {ticket: { title: title , description: desc }})
      .then( res => dispatch(actions.fetchMyTickets()))
  }
}

export function updateTicket(id, active, params) {
  return function (dispatch) {
    api.patch('/tickets/' + id , { ticket: params })
      .then( () => {
        dispatchActive(active, dispatch)
      })
  }
}

export function fetchTicket(id) {
  return function (dispatch) {
    api.get('/tickets/' + id)
      .then( res => res.json())
      .then(ticket => {
        dispatch(actions.updateCurrentTicket(ticket))
      })
  }
}

function dispatchActive(active, dispatch) {
  switch(active) {
    case "mine":
      dispatch(actions.fetchMyTickets())
      break
    case "assigned":
      dispatch(actions.fetchMyAssignedTickets())
      break
    case "all":
      dispatch(actions.fetchTickets())
      break
    case "closedLast30Days":
      dispatch(actions.fetchClosedTickets())
      break
  }
}

export function assignMeTicket(id, active) {
  return function (dispatch) {
    api.patch('/tickets/' + id + '/assign_to_me', { id: id })
      .then( () => {
        dispatchActive(active, dispatch)
      })
  }
}

export function fetchTickets() {
  return function (dispatch) {
    api.get('/tickets')
      .then( res => res.json())
      .then(tickets => {
        dispatch(actions.updateTickets(tickets))
      })
  }
}

export function fetchMyTickets() {
  return function (dispatch) {
    api.get('/tickets/mine')
      .then( res => res.json())
      .then(tickets => {
        dispatch(actions.updateTickets(tickets))
      })
  }
}

export function fetchClosedTickets() {
  return function (dispatch) {
    api.get('/tickets/closed_last_30_days')
      .then( res => res.json())
      .then(tickets => {
        dispatch(actions.updateTickets(tickets))
      })
  }
}

export function fetchMyAssignedTickets() {
  return function (dispatch) {
    api.get('/tickets/assigned_to_me')
      .then( res => res.json())
      .then(tickets => {
        dispatch(actions.updateTickets(tickets))
      })
  }
}

export function updateTickets(tickets) {
  return {
    type: constants.UPDATE_TICKETS,
    tickets: tickets
  }
}

export function updateCurrentTicket(ticket) {
  return {
    type: constants.UPDATE_CURRENT_TICKET,
    ticket: ticket
  }
}
