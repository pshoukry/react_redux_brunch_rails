import React from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import Menu from './Menu';

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => {
      dispatch(actions.fetchUser())
    }
  }
}

class App extends React.Component {
  componentDidMount = () => {
    this.props.fetchUser()
  }
  render() {
    return(<div>
      <Menu />
      {this.props.children}
    </div>);
  }
}

App.contextTypes = {
  store: React.PropTypes.object
}

export default connect(undefined, mapDispatchToProps)(App);
