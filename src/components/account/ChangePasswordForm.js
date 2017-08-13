import React from "react";
import PasswordInput from "../common/PasswordInput";

const ChangePasswordForm = ({passwordChanging, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <PasswordInput
        name="currentPassword"
        label="Current Password"
        placeholder="Current Password"
        value={passwordChanging.currentPassword}
        onChange={onChange}
        error={errors.currentPassword}/>

      <PasswordInput
        name="newPassword"
        label="New Password"
        placeholder="New Password"
        value={passwordChanging.newPassword}
        onChange={onChange}
        error={errors.newPassword}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

ChangePasswordForm.propTypes = {
  passwordChanging: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default ChangePasswordForm;
