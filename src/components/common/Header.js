import React, {PropTypes} from "react";
import {IndexLink, Link} from "react-router";
import LoadingDots from "./LoadingDots";
import LogoutForm from "../logout/LogoutForm";
import CountDown from "../../components/common/CountDownTimer";

const Header = ({loading, authenticated, onLogout, isManagerOrAdmin}) => {

  let usersHeader = "";
  if (isManagerOrAdmin()) {
    usersHeader = <Link to="/users" activeClassName="active">Users</Link>;
  }
  let roleMap = {};
  roleMap['ROLE_USER'] = "User";
  roleMap['ROLE_MANAGER'] = "Manager";
  roleMap['ROLE_ADMIN'] = "Admin";
  let role = roleMap[sessionStorage.getItem("role")];
  let name = sessionStorage.getItem("name");
  let user = "  " + name + " (" + role + ")";

  let headerStyle = {
    marginBottom: 30
  };

  let dotsStyle = {
    display: 'inline-block',
    width: 15
  };

  let userNameStyle = {
    marginLeft: 25,
    marginRight: 10,
    display: 'inline',
    fontWeight: 'bold'
  };
  return (
    <div style={headerStyle}>
      {
        authenticated &&
        <nav>
          <IndexLink to="/" activeClassName="active">Home</IndexLink>
          {" | "}
          <Link to="/myJoggingTimes" activeClassName="active">My Jogging Times</Link>
          {" | "}
          <Link to="/myAvgSpeedPerWeek" activeClassName="active">Avg Speed Per Week</Link>
          {isManagerOrAdmin() &&
          " | "
          }
          {usersHeader}
          {" | "}
          <Link to="/myAccount" activeClassName="active">My Account</Link>
          <span style={dotsStyle}>{loading && <LoadingDots interval={100} dots={8}/>}</span>
          <div style={userNameStyle}>{user}</div>
          <LogoutForm onLogoutClick={onLogout}/>
          <CountDown />
        </nav>
      }
    </div>
  );

};

Header.propTypes = {
  onLogout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  isManagerOrAdmin: PropTypes.func.isRequired
};

export default Header;
