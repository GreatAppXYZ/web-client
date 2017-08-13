import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../../actions/userActions';
import UserList from '../forms/UserList';
import {browserHistory} from 'react-router';

class UsersPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddUserPage = this.redirectToAddUserPage.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadUsers();
  }

  redirectToAddUserPage() {
    browserHistory.push('/user');
  }

  render() {
    const {users} = this.props;
    return (
      <div>
        <h3><strong>Users</strong></h3>
        <UserList users={users}/>
        <input type="submit"
               value="Add User"
               className="btn btn-primary"
               onClick={this.redirectToAddUserPage}/>
      </div>
    );
  }
}

UsersPage.propTypes = {
  actions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
