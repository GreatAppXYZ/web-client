import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as joggingTimeActions from '../../../actions/joggingTimeActions';
import JoggingTimeList from '../forms/JoggingTimeList';
import {browserHistory} from 'react-router';
import moment from 'moment';

class MyJoggingTimesPage extends React.Component {

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

  static redirectToAddJoggingTimePage() {
    browserHistory.push('/myJoggingTime');
  }

  constructor(props, context) {
    super(props, context);

    MyJoggingTimesPage.redirectToAddJoggingTimePage = MyJoggingTimesPage.redirectToAddJoggingTimePage.bind(this);
    this.updateFilterFields = this.updateFilterFields.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadJoggingTimes(MyJoggingTimesPage.getDateRangeFilter(this.props.dateRangeFilter));
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
    if (from === "Invalid date" || to === "Invalid date" ) {
      return;
    }
    this.context.router.push('/myJoggingTimes?' + 'from=' + from + '&to=' + to);

    let filter = {
      from: moment(from, "YYYY-MM-DD"),
      to: moment(to, "YYYY-MM-DD")
    };

    this.props.actions.loadJoggingTimes(MyJoggingTimesPage.getDateRangeFilter(filter));
  }

  render() {
    let from = this.props.dateRangeFilter.from.format("YYYY-MM-DD");
    let to = this.props.dateRangeFilter.to.format("YYYY-MM-DD");
    let queryString = "from=" + from + "&to=" + to;
    const {joggingTimes} = this.props;
    return (
      <div>
        <h3><strong>My Jogging Times</strong></h3>
        <br />
        <JoggingTimeList
          onUpdateFilter={this.updateFilterFields}
          joggingTimes={joggingTimes}
          manageRoute="/myJoggingTime/"
          filterFrom={from}
          filterTo={to}
          queryString={queryString}/>
        <input type="submit"
               value="Add Jogging Time"
               className="btn btn-primary"
               onClick={MyJoggingTimesPage.redirectToAddJoggingTimePage}/>
      </div>
    );
  }
}

MyJoggingTimesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  joggingTimes: PropTypes.array.isRequired,
  dateRangeFilter: PropTypes.object.isRequired
};

MyJoggingTimesPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const queryParams = ownProps.location.query;
  let dateRangeFilter = {from: moment().subtract(7, "days"), to: moment()};
  if (queryParams && moment(queryParams.from, "YYYY-MM-DD").isValid() && moment(queryParams.to, "YYYY-MM-DD").isValid()) {
    dateRangeFilter.from = moment(queryParams.from, "YYYY-MM-DD");
    dateRangeFilter.to = moment(queryParams.to, "YYYY-MM-DD");
  }
  return {
    joggingTimes: state.joggingTimes,
    dateRangeFilter: dateRangeFilter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(joggingTimeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyJoggingTimesPage);
