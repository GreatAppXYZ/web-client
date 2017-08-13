import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as userActions from "../../../actions/userActions";
import * as joggingTimeActions from "../../../actions/joggingTimeActions";
import * as joggingTimeByUserActions from "../../../actions/joggingTimeByUserActions";
import UserForm from "../forms/UserForm";
import GoBackLink from "../../common/GoBackLink";
import {browserHistory} from "react-router";
import toastr from "toastr";
import Messages from '../../common/Messages';

export class ManageUserPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: Object.assign({}, this.props.user),
      errors: {},
      saving: false,
      deleting: false,
      showingJoggingTimes: false
    };
    this.updateUserState = this.updateUserState.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.showingJoggingTimes = this.showingJoggingTimes.bind(this);
    this.showingChangePassword = this.showingChangePassword.bind(this);
    this.redirectToUsers = this.redirectToUsers.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user.user_id !== nextProps.user.user_id) {
      // Necessary when page is loaded directly
      this.setState({user: Object.assign({}, nextProps.user)});
    }
  }

  updateUserState(event) {
    const field = event.target.name;
    let user = Object.assign({}, this.state.user);
    user[field] = event.target.value;
    return this.setState({user: user});
  }

  userFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.user.email.length < 0) {
      errors.email = 'Email should not be empty';
      formIsValid = false;
    }

    if (this.state.user.role !== 'USER' &&
      this.state.user.role !== 'MANAGER' &&
      this.state.user.role !== 'ADMIN') {
      errors.role = 'Please provide valid role in uppercase (USER, MANAGER, ADMIN)';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  saveUser(event) {
    event.preventDefault();

    if (!this.userFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    if (this.state.user.user_id) {
      this.props.actions.updateUser(this.state.user)
        .then(() => {
          toastr.success('User saved.');
          this.redirect('/users');
        })
        .catch(error => {
          toastr.error(Messages.getMessage(error));
          this.setState({saving: false});
        });
    }
    else {
      this.props.actions.createUser(this.state.user)
        .then(() => {
          toastr.success('User saved.');
          this.redirect('/users');
        })
        .catch(error => {
          toastr.error(Messages.getMessage(error));
          this.setState({saving: false});
        });
    }
  }

  deleteUser(event) {
    event.preventDefault();

    if (!confirm('Are you sure you want to delete it?')) {
      return;
    }

    this.setState({deleting: true});
    this.props.actions.deleteUser(this.state.user)
      .then(() => {
        toastr.success('User deleted.');
        this.redirect('/users');
      })
      .catch(error => {
        toastr.error(Messages.getMessage(error));
        this.setState({deleting: false});
      });
  }

  showingJoggingTimes(event) {
    event.preventDefault();
    this.setState({showingJoggingTimes: true});
    this.redirect('/user/' + this.props.user.user_id + '/joggingTimes');
    this.setState({showingJoggingTimes: false});
  }

  showingChangePassword(event) {
    event.preventDefault();
    this.redirect('/user/' + this.props.user.user_id + '/changePassword');
  }

  redirect(route) {
    this.setState({saving: false});
    this.context.router.push(route);
  }

  redirectToUsers(event) {
    event.preventDefault();
    browserHistory.push('/users/');
  }

  render() {
    let subheader = null;
    if (this.props.user.name) {
      subheader = <h4>{this.props.user.name} - <i>{this.props.user.email}</i></h4>;
    } else {
      subheader = <h4>{this.props.user.email}</h4>;
    }
    let isManagerUpdatingManagerOrAdmin = sessionStorage.getItem("role") === "ROLE_MANAGER" &&
      (this.props.user.role === "MANAGER" || this.props.user.role === "ADMIN");
    return (
      <div>
        <h3>
          <GoBackLink onClick={this.redirectToUsers} value="Users"/>
          {" "} &gt; {" "}
          <strong>Manage user</strong>
        </h3>
        {subheader}
        <br />
        <br />
        <UserForm
          user={this.state.user}
          errors={this.state.errors}
          onSave={this.saveUser}
          onDelete={this.deleteUser}
          onShowJoggingTimes={this.showingJoggingTimes}
          onShowingChangePassword={this.showingChangePassword}
          onChange={this.updateUserState}
          saving={this.state.saving}
          deleting={this.state.deleting}
          showingJoggingTimes={this.state.showingJoggingTimes}
          showOptionsForExistingUser={this.props.showOptionsForExistingUser}
          onCancel={this.redirectToUsers}
          isManagerUpdatingManagerOrAdmin={isManagerUpdatingManagerOrAdmin}/>
      </div>
    );
  }
}

ManageUserPage.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  showOptionsForExistingUser: PropTypes.bool.isRequired
};

ManageUserPage.contextTypes = {
  router: PropTypes.object
};

function getUserById(users, id) {
  const user = users.filter(user => user.user_id.toString() === id);
  if (user.length > 0) return user[0];
  return getNewUser();
}

function getNewUser() {
  return {
    user_id: 0,
    name: '',
    email: '',
    role: ''
  };
}

function mapStateToProps(state, ownProps) {
  const userId = ownProps.params.id;
  let user = getNewUser();
  if (userId && state.users.length > 0) {
    user = getUserById(state.users, userId);
  }
  let showOptionsForExistingUser = userId && userId !== '' ? true : false;
  return {
    user: user,
    showOptionsForExistingUser: showOptionsForExistingUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, userActions, joggingTimeActions, joggingTimeByUserActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUserPage);
