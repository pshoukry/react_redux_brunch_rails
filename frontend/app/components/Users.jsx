import React from 'react';
import UsersList from './UsersList';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    users: state.users.all
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => { dispatch(actions.fetchUsers()) },
    updateUser: (id, params) => { dispatch(actions.updateUser(id, params)) }
  }
}

class Users extends React.Component {
  updateUser = (id, params) => {
    this.props.updateUser(id, params)
  }

  componentDidMount = () => {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <UsersList users={this.props.users} update={this.updateUser}/>
          </div>
        </div>
      </div>
    );
  }
}

Users.contextTypes = {
  store: React.PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
