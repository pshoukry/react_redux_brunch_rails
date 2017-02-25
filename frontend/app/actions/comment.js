import * as constants from '../constants'
import * as actions from './'
import {api} from '../api'

export function createComment(comment, ticket_id) {
  return function (dispatch) {
    api.post('/comments', { comment: { comment: comment , ticket_id: ticket_id }})
      .then( res => dispatch(actions.fetchTicket(ticket_id)))
  }
}
