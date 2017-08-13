import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const UserListRow = ({user}) => {
  return (
    <tr>
      <th>{user.name}</th>
      <th>{user.email}</th>
      <th>{user.role}</th>
      <th><Link to={'/user/' + user.user_id}>Manage</Link></th>
    </tr>
  );
};

UserListRow.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserListRow;
