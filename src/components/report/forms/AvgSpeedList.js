import React, {PropTypes} from 'react';
import AvgSpeedRow from './AvgSpeedRow';
import _ from 'lodash/lodash';

const AvgSpeedList = ({weeks}) => {
  weeks = _.sortBy(weeks, (w) => {
    return w.week;
  });
  return (
    <div>
      <table className="table">
        <thead>
        <tr>
          <th>Week</th>
          <th>Start date (mm/dd/yyyy)</th>
          <th>Distance (meters)</th>
          <th>Minutes</th>
          <th>Seconds</th>
          <th>Average speed (km/h)</th>
        </tr>
        </thead>
        <tbody>
        {weeks.map(w =>
          <AvgSpeedRow
            key={w.week}
            week={w.week}
            averageData={w.averageData} />
        )}
        </tbody>
      </table>
    </div>
  );
};

AvgSpeedList.propTypes = {
  weeks: PropTypes.array.isRequired
};

export default AvgSpeedList;
