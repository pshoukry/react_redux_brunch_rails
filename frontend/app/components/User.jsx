import React from 'react';
import { Link, browserHistory } from 'react-router'


export default class User extends React.Component {
  onClick = (event) => {
    this.props.update(this.props.user.id, { role: event.target.name })
    event.preventDefault()
  }
  render(){
    return (
      <tr>
        <td>{this.props.user.full_name}</td>
        <td>{this.props.user.email}</td>
        <td>
          {this.props.user.role}
          <br/>
          <Link name="customer" className="badge badge-success" onClick={this.onClick} to="#">Customer</Link>
          <Link name="agent" className="badge badge-warning" onClick={this.onClick} to="#">Agent</Link>
          <Link name="admin" className="badge badge-danger" onClick={this.onClick} to="#">Admin</Link>
        </td>
      </tr>
    )
  }
}
