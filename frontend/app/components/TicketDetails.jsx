import React from 'react'
import * as actions from '../actions'
import { connect } from 'react-redux'
import Comment from './Comment'

const mapStateToProps = state => {
  return {
    ticket: state.tickets.current
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTicket: (id) => {
      dispatch(actions.fetchTicket(id))
    },
    createComment: (comment, ticket_id) => {
      dispatch(actions.createComment(comment, ticket_id))
    }
  }
}

class TicketDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {comment: ''}

  }

  onChange = (event) => {
    this.setState({ comment: event.target.value })
    event.preventDefault()
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.createComment(this.state.comment, this.props.params.id)
    this.setState({comment: ''})
  }

  componentDidMount = () => {
    this.props.fetchTicket(this.props.params.id)
  }

  componentDidUpdate = (privProps) => {
    if (privProps.params.id != this.props.params.id) {
      this.props.fetchTicket(this.props.params.id)
    }
  }

  render() {
    return (
      <div className="details">
        <h3>{this.props.ticket.title}</h3>
        {this.props.ticket.description}
        {
          this.props.ticket.comments.map( comment => {
            return <Comment key={comment.id} comment={comment} />
          })
        }
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>
              Comment:
            </label>
            <textarea type="text" className="form-control" value={this.state.comment} onChange={this.onChange}> </textarea>
          </div>
          <div className="form-group">
            <input className="btn btn-primary" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    )
  }
}

TicketDetails.contextTypes = {
  store: React.PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketDetails)
