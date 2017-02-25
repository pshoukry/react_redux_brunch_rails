import React from 'react'
import moment from 'moment'
import { Link, browserHistory } from 'react-router'

class Ticket extends React.Component {
  onClickAssign = (event) => {
    this.props.assign(this.props.ticket.id)
    event.preventDefault()
  }

  onClickPriority = (event) => {
    this.props.update(this.props.ticket.id, {priority: event.target.name})
    event.preventDefault()
  }

  onClickStatus = (event) => {
    this.props.update(this.props.ticket.id, {status: event.target.name})
    event.preventDefault()
  }

  formatDate(dateTime) {
    return moment(dateTime).format('l')
  }

  render() {
    return (
      <tr>
        <td><Link to={"/tickets/" + this.props.ticket.id}>{this.props.ticket.title}</Link></td>
        <td>
          {this.props.ticket.priority}
          { this.props.allowedActions.assign &&
              <div>
                <Link name="low" className="badge badge-success" onClick={this.onClickPriority} to="#">low</Link>
                <Link name="medium" className="badge badge-warning" onClick={this.onClickPriority} to="#">medium</Link>
                <Link name="high" className="badge badge-danger" onClick={this.onClickPriority} to="#">high</Link>
              </div>
          }
        </td>
        <td>
          {this.props.ticket.status}
          { this.props.allowedActions.assign &&
              <div>
                <Link name="new" className="badge badge-default" onClick={this.onClickStatus} to="#">new</Link>
                <Link name="in progress" className="badge badge-default" onClick={this.onClickStatus} to="#">in progress</Link>
                <Link name="closed" className="badge badge-default" onClick={this.onClickStatus} to="#">closed</Link>
              </div>
          }
        </td>
        <td>
          {this.props.ticket.assignee ? this.props.ticket.assignee.full_name : "unassigned"}
          { this.props.allowedActions.assign &&
              <div>
                <Link className="badge badge-primary" onClick={this.onClickAssign} to="#">assign to me</Link>
              </div>
          }
        </td>
        <td>{this.formatDate(this.props.ticket.created_at)}</td>
        <td>{this.formatDate(this.props.ticket.updated_at)}</td>
      </tr>
    )
  }
}

export default Ticket
