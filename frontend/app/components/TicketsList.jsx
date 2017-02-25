import React from 'react';
import Ticket from './Ticket';

export default class TicketsList extends React.Component {
  render() {
    return (
      <div>
        <table className="table table-striped">
          <thead className="thead-inverse">
            <tr>
              <th>Title</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assignee</th>
              <th>Created</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.tickets.map( ticket => {
                return <Ticket key={ticket.id} ticket={ticket} assign={this.props.assign} update={this.props.update} allowedActions={this.props.allowedActions}/>
              })
            }
        </tbody></table>
      </div>
    )
  }
}
