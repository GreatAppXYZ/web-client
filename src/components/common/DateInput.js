import React from 'react';

const DateInput = ({name, label, onChange, onKeyPress, value, error}) => {
  let wrapperClass = 'form-group';
  if(error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
        type="date"
        name={name}
        className="form-control"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}/>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

DateInput.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onKeyPress: React.PropTypes.func,
  value: React.PropTypes.string,
  error: React.PropTypes.string
};

export default DateInput;
