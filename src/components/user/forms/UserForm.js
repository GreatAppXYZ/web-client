import React from 'react';
import TextInput from '../../common/TextInput';
import PasswordInput from '../../common/PasswordInput';

const UserForm = ({
                    user, onSave, onDelete, onShowJoggingTimes, onChange, onCancel, saving, deleting,
                    showingJoggingTimes, showOptionsForExistingUser, errors, onShowingChangePassword,
                    isManagerUpdatingManagerOrAdmin
                  }) => {

  let actionsStyle = {
    marginRight: 20,
    marginTop: 10
  };

  let submitStyle = {
    marginTop: 10,
    marginRight: 50
  };

  return (
    <form>
      <TextInput
        name="name"
        label="Name"
        placeholder="Name"
        value={user.name}
        onChange={onChange}
        error={errors.name}/>

      <TextInput
        name="email"
        label="Email"
        placeholder="Email"
        value={user.email}
        onChange={onChange}
        error={errors.email}/>

      <TextInput
        name="role"
        label="Role"
        placeholder="Role (USER, MANAGER, ADMIN)"
        value={user.role}
        onChange={onChange}
        error={errors.role}/>

      <PasswordInput
        hidden={showOptionsForExistingUser}
        name="password"
        label="Password"
        placeholder="Password"
        value={user.password}
        onChange={onChange}
        error={errors.password}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}
        style={submitStyle}/>

      <input
        id="seeJoggingTimes"
        type={showOptionsForExistingUser && sessionStorage.getItem("role") === "ROLE_ADMIN" ? 'submit' : 'hidden'}
        disabled={showingJoggingTimes}
        value={showingJoggingTimes ? 'Getting jogging times...' : 'See Jogging Times'}
        className="btn btn-info"
        onClick={onShowJoggingTimes}
        style={actionsStyle}/>

      <input
        id="changePassword"
        type={!isManagerUpdatingManagerOrAdmin && showOptionsForExistingUser ? 'submit' : 'hidden'}
        disabled={showingJoggingTimes}
        value="Change Password"
        className="btn btn-warning"
        onClick={onShowingChangePassword}
        style={actionsStyle}/>

      <input
        id="delete"
        type={showOptionsForExistingUser ? 'submit' : 'hidden'}
        disabled={deleting}
        value={deleting ? 'Deleting...' : 'Delete'}
        className="btn btn-danger"
        onClick={onDelete}
        style={actionsStyle}/>

      <input
        id="cancel"
        type="submit"
        value="Cancel"
        className="btn btn-default"
        onClick={onCancel}
        style={actionsStyle}/>
    </form>
  );
};


UserForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onShowJoggingTimes: React.PropTypes.func.isRequired,
  onShowingChangePassword: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  deleting: React.PropTypes.bool,
  showingJoggingTimes: React.PropTypes.bool,
  showOptionsForExistingUser: React.PropTypes.bool,
  errors: React.PropTypes.object,
  isManagerUpdatingManagerOrAdmin: React.PropTypes.bool
};

export default UserForm;
