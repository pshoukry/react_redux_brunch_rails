import React from 'react'
import * as actions from '../actions'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

const mapDispatchToProps = dispatch => {
  return {
    createTicket: (title, desc) => {
      dispatch(actions.createTicket(title, desc))
    }
  }
}

class TicketForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {title: '', description: ''}

  }

  onChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({[name]: value})
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.createTicket(this.state.title, this.state.description)
    browserHistory.push("/tickets")
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>
              Title:
            </label>
            <input name="title" type="text" className="form-control" value={this.state.title} onChange={this.onChange} />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea name="description" type="text" className="form-control" value={this.state.description} onChange={this.onChange}> </textarea>
          </div>
          <div className="form-group">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    )
  }
}
TicketForm.contextTypes = {
  store: React.PropTypes.object
}

export default connect(undefined, mapDispatchToProps)(TicketForm)
