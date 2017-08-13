import React, {PropTypes} from "react";
import Header from "./common/Header";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as logoutActions from "../actions/logoutActions";
import toastr from "toastr";

class App extends React.Component {

  static isManagerOrAdmin() {
    return sessionStorage.getItem("role") === "ROLE_MANAGER" ||
      sessionStorage.getItem("role") === "ROLE_ADMIN";
  }

  constructor(props, context) {
    super(props, context);

    this.logout = this.logout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({user: Object.assign({}, nextProps.user)});
  }

  logout() {
    this.props.actions.logoutUser();
    toastr.success('Good bye!', '', {timeOut: 2000});
    this.context.router.push('/');
  }

  render() {
    return (
      <div className="container-fluid">
        <Header
          loading={this.props.loading}
          authenticated={this.props.authenticated}
          onLogout={this.logout}
          isManagerOrAdmin={App.isManagerOrAdmin}/>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired
};

App.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    loading: state.ajaxCallsInProgress > 0,
    authenticated: state.authInfo.authenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(logoutActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
