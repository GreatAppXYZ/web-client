import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as logoutActions from "../../actions/logoutActions";
import * as loginActions from "../../actions/loginActions";
import CountDownForm from "./CountDownForm";
import toastr from "toastr";

export class CountDownTimer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      secondsRemaining: 0
    };

    this.tick = this.tick.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
  }

  componentWillMount() {
    this.setState({secondsRemaining: this.props.expires_in});
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining === 21) {
      toastr.warning('Your session is about to expired.');
    }
    if (this.state.secondsRemaining <= 0) {
      clearInterval(this.interval);
      this.props.actions.logoutUser();
      toastr.warning('Your session has expired.');
      this.context.router.push("/");
    }
    sessionStorage.setItem("expires_in", this.state.secondsRemaining);
  }

  refreshToken() {
    this.props.actions.refreshToken();
    this.setState({secondsRemaining: this.props.expires_in});
    toastr.success('Session refreshed.');
  }

  render() {
    let showCountDown = this.state.secondsRemaining < 21;
    return ( showCountDown &&
      <CountDownForm
        secondsRemaining={this.state.secondsRemaining}
        onClick={this.refreshToken}/>
    );
  }
}

CountDownTimer.propTypes = {
  actions: PropTypes.object,
  expires_in: PropTypes.number
};

CountDownTimer.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  let expires_in = parseInt(state.authInfo.expires_in);
  return {
    expires_in: expires_in
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, loginActions, logoutActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CountDownTimer);
