import React, {PropTypes} from "react";

const AvgSpeedRow = ({week, averageData}) => {
  let average = Math.round(averageData.averageSpeed * 1000) / 1000;
  let minutes = Math.floor(averageData.time / 60);
  let seconds = averageData.time - (minutes * 60);
  return (
    <tr>
      <th>{week}</th>
      <th>{averageData.startDate}</th>
      <th>{averageData.distance}</th>
      <th>{minutes}</th>
      <th>{seconds}</th>
      <th>{average}</th>
    </tr>
  );
};

AvgSpeedRow.propTypes = {
  week: PropTypes.number.isRequired,
  averageData: PropTypes.object.isRequired
};

export default AvgSpeedRow;
