import React from "react";
import PasswordInput from "../../common/PasswordInput";

const ChangePasswordByUserForm = ({passwordChanging, onSave, onChange, onCancel, saving, errors, user}) => {
  let username = user.name ? user.name + " - " + user.email :  user.email;
  let newPasswordLabel = "Enter new password for " + username;
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
      <PasswordInput
        name="verificationPassword"
        label="Enter your own password for verification"
        placeholder="Enter your own password for verification"
        value={passwordChanging.verificationPassword}
        onChange={onChange}
        error={errors.verificationPassword}/>

      <PasswordInput
        name="newPasswordForUser"
        label={newPasswordLabel}
        placeholder={newPasswordLabel}
        value={passwordChanging.newPasswordForUser}
        onChange={onChange}
        error={errors.newPasswordForUser}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}
        style={submitStyle}/>

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

ChangePasswordByUserForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  passwordChanging: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default ChangePasswordByUserForm;
