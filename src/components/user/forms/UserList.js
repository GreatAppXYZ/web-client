import React, {PropTypes} from 'react';
import UserListRow from './UserListRow';
import _ from 'lodash/lodash';

const UserList = ({users}) => {
  users = _.sortBy(users, (u) => {
    return u.name;
  });
  return (
    <table className="table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th/>
      </tr>
      </thead>
      <tbody>
      {users.map(user =>
        <UserListRow key={user.user_id} user={user} />
        )}
      </tbody>
    </table>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired
};

export default UserList;
