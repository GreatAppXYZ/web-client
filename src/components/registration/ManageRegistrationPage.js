import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as registrationActions from '../../actions/registrationActions';
import RegistrationForm from './RegistrationForm';
import toastr from 'toastr';
import Messages from '../common/Messages';

export class ManageRegistrationPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: Object.assign({}, this.props.user),
      serviceResult: Object.assign({}, this.props.registrationResult),
      errors: {},
      saving: false
    };
    this.updateUserState = this.updateUserState.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.redirect = this.redirect.bind(this);
    this.redirectToHome = this.redirectToHome.bind(this);
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
    if (this.state.user.email.length === 0) {
      errors.email = 'Provide a valid email.';
      formIsValid = false;
    }

    if (this.state.user.password.length === 0) {
      errors.password = 'Provide a valid password.';
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
    this.props.actions.createUser(this.state.user)
      .then(() => {
        if (this.props.registrationResult.success) {
          this.setState({saving: false});
          toastr.success('Registration successful.');
          this.redirect('/login');
        } else {
          this.setState({saving: false});
          toastr.error(Messages.getMessage(this.props.registrationResult.message));
        }
      })
      .catch(error => {
        this.setState({saving: false});
        toastr.error(error);
      });
  }

  redirect(route) {
    this.context.router.push(route);
  }

  redirectToHome(event) {
    event.preventDefault();
    this.redirect("/");
  }

  render() {
    return (
      <div>
        <h3><strong>Registration</strong></h3>
        <RegistrationForm
          user={this.state.user}
          errors={this.state.errors}
          onSave={this.saveUser}
          onChange={this.updateUserState}
          saving={this.state.saving}
          onCancel={this.redirectToHome}/>
      </div>
    );
  }
}

ManageRegistrationPage.propTypes = {
  actions: PropTypes.object.isRequired,
  registrationResult: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

ManageRegistrationPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  let user = {
    email: '',
    password: ''
  };

  return {
    registrationResult: state.registrationResult,
    user: user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(registrationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRegistrationPage);
