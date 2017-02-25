import React from 'react'
import { IndexLink, Link } from 'react-router'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    visibleLinks: state.ui.visibleSectionLinks
  }
}

class Menu extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <IndexLink to="/" className="navbar-brand" activeClassName="active">Tickets</IndexLink>
        <div className="collapse navbar-collapse menu" id="navbarMenu">
          <ul className="nav navbar-nav">
            <li className="nav-item>">
              <Link className="nav-link" to="/tickets" style={{display: this.props.visibleLinks.tickets ? "" : "none"}}>Tickets</Link>
            </li>
            <li className="nav-item>">
              <Link className="nav-link" to="/users" style={{display: this.props.visibleLinks.users ? "" : "none"}}>Users</Link>
            </li>
            <li className="nav-item>">
              <a href="/users/sign_out" className="nav-link">Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

Menu.contextTypes = {
  store: React.PropTypes.object
}

export default connect(mapStateToProps)(Menu)
