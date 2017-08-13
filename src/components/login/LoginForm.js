import React from 'react';
import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';

const LoginForm = ({user, onSave, onChange, onCancel, saving, errors}) => {
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
        name="email"
        label="Email"
        placeholder="Email"
        value={user.email}
        onChange={onChange}
        error={errors.email}/>

      <PasswordInput
        name="password"
        label="Password"
        placeholder="Password"
        value={user.password}
        onChange={onChange}
        error={errors.password}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Login...' : 'Login'}
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


LoginForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default LoginForm;
