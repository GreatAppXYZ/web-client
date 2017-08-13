import React, {PropTypes}  from 'react';
import {connect} from 'react-redux';
import ChangePasswordForm from './ChangePasswordForm';
import * as passwordActions from '../../actions/passwordActions';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import Messages from '../common/Messages';

class AccountPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      passwordChanging: {currentPassword: "", newPassword: ""},
      errors: {},
      saving: false
    };
    this.changePassword = this.changePassword.bind(this);
    this.updatePasswordChangingState = this.updatePasswordChangingState.bind(this);
    this.clearPasswordChangingState = this.clearPasswordChangingState.bind(this);
  }

  userFormIsValid() {
    let formIsValid = true;
    let errors = {};
    if (this.state.passwordChanging.currentPassword.length === 0) {
      errors.currentPassword = 'Enter your current password';
      formIsValid = false;
    }

    if (this.state.passwordChanging.newPassword.length === 0) {
      errors.newPassword = 'Provide a valid new password.';
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
    this.props.actions.changePassword(this.state.passwordChanging)
      .then(() => {
        if (this.props.passwordChangingResult.success) {
          toastr.success('Password changed successfully');
          this.clearPasswordChangingState();
        } else {
          toastr.error(Messages.getMessage(this.props.passwordChangingResult.message));
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
    passwordChanging.currentPassword = '';
    passwordChanging.newPassword = '';
    return this.setState({passwordChanging: passwordChanging});
  }

  updatePasswordChangingState(event) {
    const field = event.target.name;
    let passwordChanging = Object.assign({}, this.state.passwordChanging);
    passwordChanging[field] = event.target.value;
    return this.setState({passwordChanging: passwordChanging});
  }

  render() {
    return (
      <div>
        <h3>Change password</h3>
        <br />
        <ChangePasswordForm
          passwordChanging={this.state.passwordChanging}
          onSave={this.changePassword}
          onChange={this.updatePasswordChangingState}
          saving={this.state.saving}
          errors={this.state.errors}/>
      </div>
    );
  }
}

AccountPage.propTypes = {
  actions: PropTypes.object.isRequired,
  passwordChangingResult: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    passwordChangingResult: state.passwordChangingResult
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, passwordActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);

