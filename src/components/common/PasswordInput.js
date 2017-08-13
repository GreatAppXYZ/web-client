import React from 'react';

const PasswordInput = ({name, label, onChange, placeholder, value, error, hidden = false}) => {
  let wrapperClass = 'form-group';
  if(error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }
  let display = hidden ? "none" : "block";
  let divStyle = {
    display: display
  };
  return (
    <div className={wrapperClass} style={divStyle}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
        type="password"
        name={name}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange} />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

PasswordInput.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  error: React.PropTypes.string,
  hidden: React.PropTypes.bool
};

export default PasswordInput;
