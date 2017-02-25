import React from 'react';
import User from './User';

export default class UsersList extends React.Component {
  render() {
    return (
      <div>
        <table className="table table-striped">
          <thead className="thead-inverse">
            <tr>
              <th>Full name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
					<tbody>
						{
							this.props.users.map( user => {
								return <User key={user.id} user={user} update={this.props.update}/>
								})
								}
          </tbody>
        </table>
      </div>
    )
  }
}

