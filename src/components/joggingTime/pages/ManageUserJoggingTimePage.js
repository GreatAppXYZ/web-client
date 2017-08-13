import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as joggingTimeByUserActions from '../../../actions/joggingTimeByUserActions';
import * as userActions from '../../../actions/userActions';
import JoggingTimeForm from '../forms/JoggingTimeForm';
import GoBackLink from '../../common/GoBackLink';
import {browserHistory} from 'react-router';
import toastr from 'toastr';
import moment from 'moment';
import Messages from '../../common/Messages';

export class ManageUserJoggingTimePage extends React.Component {

  static getDateRangeFilter(dateRangeFilter) {
    return {
      "from": {
        "day": dateRangeFilter.from.format('DD'),
        "month": dateRangeFilter.from.format('MM'),
        "year": dateRangeFilter.from.format('YYYY')
      },
      "to": {
        "day": dateRangeFilter.to.format('DD'),
        "month": dateRangeFilter.to.format('MM'),
        "year": dateRangeFilter.to.format('YYYY')
      }
    };
  }

  static updateJoggingMinutesTime(joggingTime, event) {
    let value = parseInt(event.target.value) || 0;
    let seconds = 0;
    let currentTime = parseInt(joggingTime.time);
    if (currentTime >= 60) {
      seconds = currentTime % 60;
    } else {
      seconds = currentTime;
    }
    joggingTime.time = seconds + (value * 60);
  }

  static updateJoggingSecondsTime(joggingTime, event) {
    let value = parseInt(event.target.value) || 0;
    let minutes = Math.floor(joggingTime.time / 60);
    joggingTime.time = (minutes * 60) + value;
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      joggingTime: Object.assign({}, this.props.joggingTime),
      errors: {},
      saving: false,
      deleting: false
    };
    this.updateJoggingTimeState = this.updateJoggingTimeState.bind(this);
    this.saveJoggingTime = this.saveJoggingTime.bind(this);
    this.deleteJoggingTime = this.deleteJoggingTime.bind(this);
    this.redirectToManageUser = this.redirectToManageUser.bind(this);
    this.redirectToUsers = this.redirectToUsers.bind(this);
    this.redirectToUserJoggingTimes = this.redirectToUserJoggingTimes.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadUsers().then(() => {
      this.props.actions.getJoggingTimesByUser(this.props.user, ManageUserJoggingTimePage.getDateRangeFilter(this.props.dateRangeFilter));
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.joggingTime.jogging_times_id !== nextProps.joggingTime.jogging_times_id) {
      // Necessary when page is loaded directly
      this.setState({joggingTime: Object.assign({}, nextProps.joggingTime)});
    }
  }

  updateJoggingTimeState(event) {
    const field = event.target.name;
    let joggingTime = Object.assign({}, this.state.joggingTime);
    if (field === 'date') {
      let moment_date = moment(event.target.value, "YYYY-MM-DD");
      if (moment_date.format("YYYY-MM-DD") === "Invalid date" ) {
        return;
      }
      joggingTime.day = moment_date.format('DD');
      joggingTime.month = moment_date.format('MM');
      joggingTime.year = moment_date.format('YYYY');
    } else if (field === 'minutes') {
      ManageUserJoggingTimePage.updateJoggingMinutesTime(joggingTime, event);
    } else if (field === 'seconds') {
      ManageUserJoggingTimePage.updateJoggingSecondsTime(joggingTime, event);
    } else if(field === 'distance'){
      joggingTime[field] = parseInt(event.target.value) || 0;
    } else {
      joggingTime[field] = event.target.value;
    }
    return this.setState({joggingTime: joggingTime});
  }

  joggingTimeFormIsValid() {
    let formIsValid = true;
    let errors = {};

    this.setState({errors: errors});
    return formIsValid;
  }

  saveJoggingTime(event) {
    event.preventDefault();

    if (!this.joggingTimeFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    if (this.state.joggingTime.jogging_times_id) {
      this.props.actions.updateJoggingTimeForUser(this.state.joggingTime, this.props.user)
        .then(() => {
          toastr.success('Jogging time saved.');
          this.redirect();
        })
        .catch(error => {
          toastr.error(Messages.getMessage(error));
          this.setState({saving: false});
        });
    }
    else {
      this.props.actions.createJoggingTimeForUser(this.state.joggingTime, this.props.user)
        .then(() => {
          toastr.success('Jogging time saved.');
          this.redirect();
        })
        .catch(error => {
          toastr.error(Messages.getMessage(error));
          this.setState({saving: false});
        });
    }
  }

  deleteJoggingTime(event) {
    event.preventDefault();

    if (!confirm('Are you sure you want to delete it?')) {
      return;
    }

    this.setState({deleting: true});
    this.props.actions.deleteJoggingTimeForUser(this.state.joggingTime, this.props.user)
      .then(() => {
        toastr.success('Jogging time deleted.');
        this.redirect();
      })
      .catch(error => {
        toastr.error(error);
        this.setState({deleting: false});
      });
  }

  redirect() {
    this.setState({saving: false, deleting: false});
    this.context.router.goBack();
  }

  redirectToUsers(event) {
    event.preventDefault();
    browserHistory.push('/users/');
  }

  redirectToManageUser(event) {
    event.preventDefault();
    browserHistory.push('/user/' + this.props.user.user_id);
  }

  redirectToUserJoggingTimes(event) {
    event.preventDefault();
    browserHistory.push('/user/' + this.props.user.user_id + '/joggingTimes');
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
          <GoBackLink onClick={this.redirectToUserJoggingTimes} value="Jogging times"/>
          {" "} &gt; {" "}
          Manage jogging time
        </h3>
        {subheader}
        <br />
        <br />
        <JoggingTimeForm
          joggingTime={this.state.joggingTime}
          errors={this.state.errors}
          onSave={this.saveJoggingTime}
          onDelete={this.deleteJoggingTime}
          onChange={this.updateJoggingTimeState}
          saving={this.state.saving}
          deleting={this.state.deleting}
          showDeleteButton={this.props.showDeleteButton}
          onCancel={this.redirectToUserJoggingTimes} />
      </div>
    );
  }
}

ManageUserJoggingTimePage.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  joggingTime: PropTypes.object.isRequired,
  showDeleteButton: PropTypes.bool.isRequired,
  dateRangeFilter: PropTypes.object.isRequired
};

ManageUserJoggingTimePage.contextTypes = {
  router: PropTypes.object
};

function getJoggingTimeById(joggingTimes, id) {
  const joggingTime = joggingTimes.filter(joggingTime => joggingTime.jogging_times_id.toString() === id);
  if (joggingTime.length > 0) {
    return joggingTime[0];
  }
  return getNewJoggingTime();
}

function getUserById(users, id) {
  const user = users.filter(user => user.user_id.toString() === id);
  if (user.length > 0) return user[0];
  return getNewUser();
}

function getNewJoggingTime() {
  return {
    jogging_times_id: '',
    day: moment().format('DD'),
    month: moment().format('MM'),
    year: moment().format('YYYY'),
    distance: '0',
    time: '0'
  };
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
  const joggingTimeId = ownProps.params.jogging_times_id;
  const userId = ownProps.params.user_id;
  let joggingTime = getNewJoggingTime();
  let user = getNewUser();

  if (joggingTimeId && state.joggingTimesByUser.length > 0) {
    joggingTime = getJoggingTimeById(state.joggingTimesByUser, joggingTimeId);
  }
  if (userId && state.users.length > 0) {
    user = getUserById(state.users, userId);
  }
  let showDeleteButton = joggingTimeId && joggingTimeId !== '' ? true : false;

  const queryParams = ownProps.location.query;
  let dateRangeFilter = {from: moment().subtract(7, "days"), to: moment()};
  if (queryParams && moment(queryParams.from, "YYYY-MM-DD").isValid() && moment(queryParams.to, "YYYY-MM-DD").isValid()) {
    dateRangeFilter.from = moment(queryParams.from, "YYYY-MM-DD");
    dateRangeFilter.to = moment(queryParams.to, "YYYY-MM-DD");
  }

  return {
    joggingTime: joggingTime,
    showDeleteButton: showDeleteButton,
    user: user,
    dateRangeFilter: dateRangeFilter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, joggingTimeByUserActions, userActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUserJoggingTimePage);
