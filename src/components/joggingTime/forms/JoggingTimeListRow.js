import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const JoggingTimeListRow = ({joggingTime, manageRoute, queryString = ""}) => {
  let average = (joggingTime.distance / 1000) / (joggingTime.time / 3600);
  average = Math.round(average * 1000) / 1000;
  let minutes = Math.floor(joggingTime.time / 60);
  let seconds = joggingTime.time - (minutes * 60);
  return (
    <tr>
      <th>{joggingTime.month}/{joggingTime.day}/{joggingTime.year}</th>
      <th>{joggingTime.distance}</th>
      <th>{minutes}</th>
      <th>{seconds}</th>
      <th>{average}</th>
      <th><Link to={manageRoute + joggingTime.jogging_times_id + "?" + queryString}>Manage</Link></th>
    </tr>
  );
};

JoggingTimeListRow.propTypes = {
  joggingTime: PropTypes.object.isRequired,
  manageRoute: PropTypes.string.isRequired,
  queryString: PropTypes.string
};

export default JoggingTimeListRow;
