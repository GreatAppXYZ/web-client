import React, {PropTypes} from "react";
import JoggingTimeListRow from "./JoggingTimeListRow";
import DateRangeFilter from "../../common/DateRangeFilter";
import _ from 'lodash/lodash';

const JoggingTimeList = ({joggingTimes, onUpdateFilter, manageRoute, filterFrom, filterTo, queryString}) => {
  joggingTimes = _.sortBy(joggingTimes, (j) => {
    return j.year + j.month + j.day;
  }).reverse();
  return (
    <div>
      <DateRangeFilter
        onChange={onUpdateFilter}
        filterFrom={filterFrom}
        filterTo={filterTo}/>
      <table className="table">
        <thead>
        <tr>
          <th>Date (mm/dd/yyyy)</th>
          <th>Distance (meters)</th>
          <th>Minutes</th>
          <th>Seconds</th>
          <th>Average speed (km/h)</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        {joggingTimes.map(joggingTime =>
          <JoggingTimeListRow
            key={joggingTime.jogging_times_id}
            joggingTime={joggingTime}
            manageRoute={manageRoute}
            queryString={queryString}/>
        )}
        </tbody>
      </table>
    </div>
  );
};

JoggingTimeList.propTypes = {
  joggingTimes: PropTypes.array.isRequired,
  onUpdateFilter: PropTypes.func.isRequired,
  manageRoute: PropTypes.string.isRequired,
  filterFrom: React.PropTypes.string.isRequired,
  filterTo: React.PropTypes.string.isRequired,
  queryString: PropTypes.string
};

export default JoggingTimeList;
