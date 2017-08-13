import React, {PropTypes} from "react";
import {connect} from "react-redux";
import * as userActions from "../../../actions/userActions";
import ChangePasswordByUserForm from "../forms/ChangePasswordByUserForm";
import * as passwordActions from "../../../actions/passwordActions";
import GoBackLink from "../../common/GoBackLink";
import {browserHistory} from "react-router";
import {bindActionCreators} from "redux";
import toastr from "toastr";
import Messages from '../../common/Messages';

class ChangePasswordPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      passwordChanging: {verificationPassword: "", newPasswordForUser: ""},
      errors: {},
      saving: false
    };
    this.changePassword = this.changePassword.bind(this);
    this.updatePasswordChangingState = this.updatePasswordChangingState.bind(this);
    this.clearPasswordChangingState = this.clearPasswordChangingState.bind(this);
    this.redirectToManageUser = this.redirectToManageUser.bind(this);
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
    let isManagerUpdatingManagerOrAdmin = sessionStorage.getItem("role") === "ROLE_MANAGER" &&
      (nextProps.user.role === "MANAGER" || nextProps.user.role === "ADMIN");
    if (isManagerUpdatingManagerOrAdmin) {
      browserHistory.push('/');
    }
  }

  userFormIsValid() {
    let formIsValid = true;
    let errors = {};
    if (this.state.passwordChanging.verificationPassword.length === 0) {
      errors.verificationPassword = 'Enter your current password';
      formIsValid = false;
    }

    if (this.state.passwordChanging.newPasswordForUser.length === 0) {
      errors.newPasswordForUser = 'Provide a valid new password.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  changePassword(event) {
    event.preventDefault();
    if (!this.userFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    this.props.actions.changePasswordByUser(this.state.passwordChanging, this.props.user.user_id)
      .then(() => {
        if (this.props.passwordChangingByUserResult.success) {
          toastr.success('Password changed successfully');
          this.clearPasswordChangingState();
        } else {
          toastr.error(Messages.getMessage(this.props.passwordChangingByUserResult.message));
        }
        this.setState({saving: false});
      })
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  clearPasswordChangingState() {
    let passwordChanging = Object.assign({}, this.state.passwordChanging);
    passwordChanging.verificationPassword = '';
    passwordChanging.newPasswordForUser = '';
    return this.setState({passwordChanging: passwordChanging});
  }

  updatePasswordChangingState(event) {
    const field = event.target.name;
    let passwordChanging = Object.assign({}, this.state.passwordChanging);
    passwordChanging[field] = event.target.value;
    return this.setState({passwordChanging: passwordChanging});
  }

  redirectToUsers() {
    browserHistory.push('/users/');
  }

  redirectToManageUser(event) {
    event.preventDefault();
    browserHistory.push('/user/' + this.props.user.user_id);
  }

  render() {
    let subheader = null;
    if (this.props.user.name) {
      subheader = <h4>{this.props.user.name} - <i>{this.props.user.email}</i></h4>;
    } else {
      subheader = <h4>{this.props.user.email}</h4>;
    }
    return (
      <div>
        <h3>
          <GoBackLink onClick={this.redirectToUsers} value="Users"/>
          {" "} &gt; {" "}
          <GoBackLink onClick={this.redirectToManageUser} value="Manage user"/>
          {" "} &gt; {" "}
          <strong>Change password</strong>
        </h3>
        {subheader}
        <br />
        <br />
        <ChangePasswordByUserForm
          passwordChanging={this.state.passwordChanging}
          onSave={this.changePassword}
          onChange={this.updatePasswordChangingState}
          saving={this.state.saving}
          errors={this.state.errors}
          user={this.props.user}
          onCancel={this.redirectToManageUser}/>
      </div>
    );
  }
}

ChangePasswordPage.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  passwordChangingByUserResult: PropTypes.object.isRequired
};

ChangePasswordPage.contextTypes = {
  router: PropTypes.object
};

function getNewUser() {
  return {
    user_id: 0,
    name: '',
    email: '',
    role: ''
  };
}

function getUserById(users, id) {
  const user = users.filter(user => user.user_id.toString() === id);
  if (user.length > 0) return user[0];
  return getNewUser();
}

function mapStateToProps(state, ownProps) {
  const userId = ownProps.params.id;
  let user = getNewUser();

  if (userId && state.users.length > 0) {
    user = getUserById(state.users, userId);
  }

  return {
    passwordChangingByUserResult: state.passwordChangingByUserResult,
    user: user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, userActions, passwordActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordPage);

