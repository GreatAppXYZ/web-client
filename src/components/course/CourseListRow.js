import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const CourseListRow = ({course}) => {
  return (
    <tr>
      <th><a href={course.watchHref} target="_blank">Watch</a></th>
      <th><Link to={'/course/' + course.id}>{course.title}</Link></th>
      <th>{course.authorId}</th>
      <th>{course.category}</th>
      <th>{course.length}</th>
    </tr>
  );
};

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired
};

export default CourseListRow;
