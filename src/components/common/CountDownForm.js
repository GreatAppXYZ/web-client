import React from "react";

const CountDownForm = ({onClick, secondsRemaining}) => {
  return (
    <div>
      Session ending in {secondsRemaining}
      {" "}
      <button onClick={onClick} className="btn btn-link">Refresh</button>
    </div>
  );
};


CountDownForm.propTypes = {
  onClick: React.PropTypes.func.isRequired,
    secondsRemaining: React.PropTypes.number.isRequired
};

export default CountDownForm;
