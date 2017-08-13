import React from "react";

const LogoutForm = ({onLogoutClick}) => {
  return (
    <button onClick={onLogoutClick}  className="btn btn-default btn-sm">
    <span className="glyphicon glyphicon-log-out"/> Log out
  </button>
  );
};


LogoutForm.propTypes = {
  onLogoutClick: React.PropTypes.func.isRequired
};

export default LogoutForm;
