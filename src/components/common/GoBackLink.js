import React from "react";

const GoBackLink = ({onClick, value}) => {
  return (
    <a href="#" onClick={onClick}> {value} </a>
  );
};


GoBackLink.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired
};

export default GoBackLink;
