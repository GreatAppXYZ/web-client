import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as avgSpeedReportActions from '../../../actions/avgSpeedReportActions';
import AvgSpeedList from '../forms/AvgSpeedList';
import _ from 'lodash/lodash';

class MyAvgSpeedPerWeekPage extends React.Component {

  constructor(props, context) {
    super(props, context);

  }

  componentWillMount() {
    this.props.actions.loadAvgSpeedReport();
  }

  render() {
    let avgInfo = this.props.avgSpeedPerWeek;
    avgInfo = _.sortBy(avgInfo, (a) => {
      return a.year;
    }).reverse();
    return (
      <div>
        <h3><strong>Avg Speed Per Week</strong></h3>
        <br />
        {
          avgInfo.map(avg =>
            <div key={avg.year}>
              <h3><strong><i>{avg.year}</i></strong></h3>
              <AvgSpeedList
                weeks={avg.weeks}
              />
              <br />
            </div>
          )}
      </div>
    );
  }
}

MyAvgSpeedPerWeekPage.propTypes = {
  actions: PropTypes.object.isRequired,
  avgSpeedPerWeek: PropTypes.array.isRequired
};

MyAvgSpeedPerWeekPage.contextTypes = {};

function mapStateToProps(state) {
  return {
    avgSpeedPerWeek: state.avgSpeedPerWeek
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(avgSpeedReportActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAvgSpeedPerWeekPage);
