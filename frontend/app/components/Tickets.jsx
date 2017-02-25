import React from 'react'
import TicketsList from './TicketsList'
import { Link } from 'react-router'
import * as actions from '../actions'
import { connect } from 'react-redux'
import _ from "underscore"
import moment from 'moment'
import jsPDF from 'jspdf'
require('jspdf-autotable')

const mapStateToProps = state => {
  return {
    tickets: state.tickets.all,
    visibleLinks: state.ui.visibleTicketsLinks,
    allowedActions: state.ui.allowedActions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMyTickets: () => { dispatch(actions.fetchMyTickets()) },
    fetchMyAssignedTickets: () => { dispatch(actions.fetchMyAssignedTickets()) },
    fetchTickets: () => { dispatch(actions.fetchTickets()) },
    fetchClosedTickets: () => { dispatch(actions.fetchClosedTickets()) },
    assignMeTicket: (id, active) => { dispatch(actions.assignMeTicket(id, active)) },
    updateTicket: (id, active, params) => { dispatch(actions.updateTicket(id, active, params)) }
  }
}

class Tickets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {active: "mine"}
  }

  assignMeTicket = (id) => {
    this.props.assignMeTicket(id, this.state.active)
  }

  updateTicket = (id, params) => {
    this.props.updateTicket(id, this.state.active, params)
  }

  componentDidMount = () => {
    this.props.fetchMyTickets()
  }

  onLinkClick = (event) => {
    const target = event.target

    switch(target.name) {
      case "mine":
        this.props.fetchMyTickets()
        break
      case "assigned":
        this.props.fetchMyAssignedTickets()
        break
      case "all":
        this.props.fetchTickets()
        break
      case "closedLast30Days":
        this.props.fetchClosedTickets()
        break
      default:
        this.props.fetchMyTickets()
        break
    }
    this.setState({ active: target.name })
    event.preventDefault()
  }

  formatDate(dateTime) {
    return moment(dateTime).format('l')
  }


  onClickExport = (event) => {
    var doc = new jsPDF()

    var columns = ["ID", "TITLE", "DESCRIPTION", "CREATOR", "PRIORITY", "CREATED", "UPDATED"]
    var rows = _.map(this.props.tickets, (ticket) => {
      return [ticket.id,
        ticket.title,
        ticket.description,
        ticket.creator.full_name,
        ticket.priority,
        this.formatDate(ticket.created_at),
        this.formatDate(ticket.updated_at)]
    })

    doc.autoTable(columns, rows);
    doc.save('closed_last_30_days.pdf')
    event.preventDefault()
  }

  render() {
    var mineTicketsClasses = 'flex-sm-fill text-sm-center nav-link ' + (this.state.active == "mine" ? "active" : "");
    var assignedTicketsClasses = 'flex-sm-fill text-sm-center nav-link ' + (this.state.active == "assigned" ? "active" : "");
    var allTicketsClasses = 'flex-sm-fill text-sm-center nav-link ' + (this.state.active == "all" ? "active" : "");
    var closedTicketsClasses = 'flex-sm-fill text-sm-center nav-link ' + (this.state.active == "closedLast30Days" ? "active" : "");

    return (
      <div className="container">
        <nav className="nav nav-pills flex-column flex-sm-row subnav">
          <h3 className="flex-sm-fill text-sm-center" href="#">Tickets</h3>
          { this.props.visibleLinks.mine &&
            <Link name="mine" className={mineTicketsClasses} to="#" onClick={this.onLinkClick}>My Tickets</Link>
          }
          { this.props.visibleLinks.assigned &&
              <Link name="assigned" className={assignedTicketsClasses} to="#" onClick={this.onLinkClick}>Assigned To Me</Link>
          }
          { this.props.visibleLinks.all &&
              <Link name="all" className={allTicketsClasses} to="#" onClick={this.onLinkClick}>All Tickets</Link>
          }
          { this.props.visibleLinks.closedLast30Days &&
              <Link name="closedLast30Days" className={closedTicketsClasses} to="#" onClick={this.onLinkClick}>Closed Last 30 days</Link>
          }
          <Link className="flex-sm-fill text-sm-center nav-link active" to="/new_ticket">
            <i className="fa fa-plus" aria-hidden="true"></i> Create New Ticket
          </Link>
        </nav>
        { this.state.active == "closedLast30Days" &&
          <Link to="#" onClick={this.onClickExport}>Export PDF</Link>
        }
        <div className="row">
          <div className="col-sm-8" ref={(report) => { this.report = report }}>
            <TicketsList tickets={this.props.tickets} assign={this.assignMeTicket} update={this.updateTicket} allowedActions={this.props.allowedActions}/>
          </div>
          <div className="col-sm-4">
            {this.props.children &&
              this.props.children
            }
            {!this.props.children &&
                <div>Please select a ticket to view details</div>
            }
          </div>
        </div>
      </div>
    )
  }
}

Tickets.contextTypes = {
  store: React.PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Tickets)
