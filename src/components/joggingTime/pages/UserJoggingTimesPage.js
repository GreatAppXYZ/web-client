import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as joggingTimeByUserActions from "../../../actions/joggingTimeByUserActions";
import * as userActions from "../../../actions/userActions";
import JoggingTimeList from "../forms/JoggingTimeList";
import GoBackLink from "../../common/GoBackLink";
import {browserHistory} from "react-router";
import moment from "moment";

class UserJoggingTimesPage extends React.Component {

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

  constructor(props, context) {
    super(props, context);
    this.redirectToAddJoggingTimePage = this.redirectToAddJoggingTimePage.bind(this);
    this.updateFilterFields = this.updateFilterFields.bind(this);
    this.redirectToManageUser = this.redirectToManageUser.bind(this);
    this.redirectToUsers = this.redirectToUsers.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadUsers().then(() => {
      this.props.actions.getJoggingTimesByUser(this.props.user, UserJoggingTimesPage.getDateRangeFilter(this.props.dateRangeFilter));
    });
  }

  updateFilterFields(event) {
    let from = this.props.dateRangeFilter.from.format("YYYY-MM-DD");
    let to = this.props.dateRangeFilter.to.format("YYYY-MM-DD");
    if (event.target.name === 'from') {
      from = moment(event.target.value, "YYYY-MM-DD").format("YYYY-MM-DD");
    }
    if (event.target.name === 'to') {
      to = moment(event.target.value, "YYYY-MM-DD").format("YYYY-MM-DD");
    }
    if (from === "Invalid date" || to === "Invalid date") {
      return;
    }
    this.context.router.push('/user/' + this.props.user.user_id + '/joggingTimes?' + 'from=' + from + '&to=' + to);

    let filter = {
      from: moment(from, "YYYY-MM-DD"),
      to: moment(to, "YYYY-MM-DD")
    };

    this.props.actions.getJoggingTimesByUser(this.props.user, UserJoggingTimesPage.getDateRangeFilter(filter));
  }

  redirectToManageUser(event) {
    event.preventDefault();
    browserHistory.push('/user/' + this.props.user.user_id);
  }

  redirectToAddJoggingTimePage() {
    browserHistory.push('/user/' + this.props.user.user_id + '/joggingTime');
  }

  redirectToUsers() {
    browserHistory.push('/users/');
  }

  render() {
    const {joggingTimes} = this.props;
    let subheader = null;
    if (this.props.user.name) {
      subheader = <h4>{this.props.user.name} - <i>{this.props.user.email}</i></h4>;
    } else {
      subheader = <h4>{this.props.user.email}</h4>;
    }
    let from = this.props.dateRangeFilter.from.format("YYYY-MM-DD");
    let to = this.props.dateRangeFilter.to.format("YYYY-MM-DD");
    let queryString = "from=" + from + "&to=" + to;
    let routeToManage = "/user/" + this.props.user.user_id + "/joggingTime/";
    let actionsStyle = {
      marginRight: 20,
      marginTop: 10
    };

    let submitStyle = {
      marginTop: 10,
      marginRight: 50
    };
    return (
      <div>
        <h3>
          <GoBackLink onClick={this.redirectToUsers} value="Users"/>
          {" "} &gt; {" "}
          <GoBackLink onClick={this.redirectToManageUser} value="Manage user"/>
          {" "} &gt; {" "}
          <strong>Jogging times</strong>
        </h3>
        {subheader}
        <br />
        <br />
        <JoggingTimeList
          onUpdateFilter={this.updateFilterFields}
          joggingTimes={joggingTimes}
          manageRoute={routeToManage}
          filterFrom={from}
          filterTo={to}
          queryString={queryString}/>
        <input type="submit"
               value="Add Jogging Time"
               className="btn btn-primary"
               onClick={this.redirectToAddJoggingTimePage}
               style={submitStyle}/>
        <input
          id="cancel"
          type="submit"
          value="Cancel"
          className="btn btn-default"
          onClick={this.redirectToManageUser}
          style={actionsStyle}/>
      </div>
    );
  }
}

UserJoggingTimesPage.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  joggingTimes: PropTypes.array.isRequired,
  dateRangeFilter: PropTypes.object.isRequired
};

UserJoggingTimesPage.contextTypes = {
  router: PropTypes.object
};

function getUserById(users, id) {
  const user = users.filter(user => user.user_id.toString() === id);
  if (user.length > 0) return user[0];
  return {};
}

function mapStateToProps(state, ownProps) {
  const userId = ownProps.params.id;
  let user = {};
  if (userId && state.users.length > 0) {
    user = getUserById(state.users, userId);
  }

  const queryParams = ownProps.location.query;
  let dateRangeFilter = {from: moment().subtract(7, "days"), to: moment()};
  if (queryParams && moment(queryParams.from, "YYYY-MM-DD").isValid() && moment(queryParams.to, "YYYY-MM-DD").isValid()) {
    dateRangeFilter.from = moment(queryParams.from, "YYYY-MM-DD");
    dateRangeFilter.to = moment(queryParams.to, "YYYY-MM-DD");
  }

  return {
    joggingTimes: state.joggingTimesByUser,
    user: user,
    dateRangeFilter: dateRangeFilter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, joggingTimeByUserActions, userActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserJoggingTimesPage);
