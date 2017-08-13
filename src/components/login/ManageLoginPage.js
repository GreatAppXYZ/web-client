import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as loginActions from "../../actions/loginActions";
import LoginForm from "./LoginForm";
import toastr from "toastr";

export class ManageLoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: Object.assign({}, this.props.user),
      serviceResult: Object.assign({}, this.props.loginResult),
      errors: {},
      saving: false
    };
    this.updateUserState = this.updateUserState.bind(this);
    this.loginUser = this.loginUser.bind(this);
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

  loginUser(event) {
    event.preventDefault();
    if (!this.userFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    this.props.actions.loginUser(this.state.user)
      .then(() => {
        this.setState({saving: false});
        if (this.props.loginResult.success) {
          this.getUserRole();
        } else {
          toastr.error(this.props.loginResult.message);
        }
      })
      .catch(error => {
        this.setState({saving: false});
        toastr.error(error);
      });
  }

  getUserRole() {
    this.setState({saving: true});
    this.props.actions.getUserRole()
      .then(() => {
        this.setState({saving: false});
        if (this.props.loginResult.success) {
          this.props.actions.clearJoggingTimes();
          this.redirect('/myJoggingTimes');
          toastr.success('Welcome!', '', {timeOut: 2000});
        } else {
          toastr.error(this.props.loginResult.message);
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
        <h3><strong>Login</strong></h3>
        <LoginForm
          user={this.state.user}
          errors={this.state.errors}
          onSave={this.loginUser}
          onChange={this.updateUserState}
          saving={this.state.saving}
          onCancel={this.redirectToHome}/>
      </div>
    );
  }
}

ManageLoginPage.propTypes = {
  actions: PropTypes.object.isRequired,
  loginResult: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

ManageLoginPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  let user = {
    email: '',
    password: ''
  };
  return {
    loginResult: state.loginResult,
    user: user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, loginActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageLoginPage);
