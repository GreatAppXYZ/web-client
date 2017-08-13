/*eslint-disable import/no-named-as-default*/
import React from "react";
import {IndexRoute, Route} from "react-router";
import App from "./components/App";
import HomePage from "./components/home/HomePage";
import AccountPage from "./components/account/AccountPage";
import MyJoggingTimesPage from "./components/joggingTime/pages/MyJoggingTimesPage";
import UserJoggingTimesPage from "./components/joggingTime/pages/UserJoggingTimesPage";
import ManageMyJoggingTimePage from "./components/joggingTime/pages/ManageMyJoggingTimePage";
import ManageUserJoggingTimePage from "./components/joggingTime/pages/ManageUserJoggingTimePage";
import ManageRegistrationPage from "./components/registration/ManageRegistrationPage";
import ManageLoginPage from "./components/login/ManageLoginPage";
import ManageUserPage from "./components/user/pages/ManageUserPage";
import UsersPage from "./components/user/pages/UsersPage";
import MyAvgSpeedPerWeekPage from "./components/report/pages/MyAvgSpeedPerWeekPage";
import ChangePasswordPage from "./components/user/pages/ChangePasswordPage";

const Authorization = (allowedRoles) =>
  (WrappedComponent) => {
    return class WithAuthorization extends React.Component {
      render() {
        const role = sessionStorage.getItem('role');
        if (allowedRoles.includes(role)) {
          return <WrappedComponent {...this.props} />;
        } else {
          return <HomePage />;
        }
      }
    };
  };

const MANAGER_ADMIN = Authorization(['ROLE_MANAGER', 'ROLE_ADMIN']);
const ADMIN = Authorization(['ROLE_ADMIN']);

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="login" component={ManageLoginPage}/>
    <Route path="register" component={ManageRegistrationPage}/>
    <Route path="myJoggingTimes" component={MyJoggingTimesPage} onEnter={requireAuth}/>
    <Route path="myJoggingTimes?from=:from&to=:to" component={MyJoggingTimesPage} onEnter={requireAuth}/>
    <Route path="user/:id/joggingTimes" component={ADMIN(UserJoggingTimesPage)} onEnter={requireAuth}/>
    <Route path="user/:id/joggingTimes?from=:from&to=:to" component={ADMIN(UserJoggingTimesPage)} onEnter={requireAuth}/>
    <Route path="myJoggingTime" component={ManageMyJoggingTimePage} onEnter={requireAuth}/>
    <Route path="myJoggingTime/:id" component={ManageMyJoggingTimePage} onEnter={requireAuth}/>
    <Route path="myJoggingTime/:id?from=:from&to=:to" component={ManageMyJoggingTimePage} onEnter={requireAuth}/>
    <Route path="user/:user_id/joggingTime/:jogging_times_id" component={ADMIN(ManageUserJoggingTimePage)} onEnter={requireAuth}/>
    <Route path="user/:user_id/joggingTime" component={ADMIN(ManageUserJoggingTimePage)} onEnter={requireAuth}/>
    <Route path="users" component={MANAGER_ADMIN(UsersPage)} onEnter={requireAuth}/>
    <Route path="user" component={MANAGER_ADMIN(ManageUserPage)} onEnter={requireAuth}/>
    <Route path="user/:id" component={MANAGER_ADMIN(ManageUserPage)} onEnter={requireAuth}/>
    <Route path="myAvgSpeedPerWeek" component={MyAvgSpeedPerWeekPage} onEnter={requireAuth}/>
    <Route path="myAccount" component={AccountPage} onEnter={requireAuth}/>
    <Route path="user/:id/changePassword" component={MANAGER_ADMIN(ChangePasswordPage)} onEnter={requireAuth}/>
    <Route path="*" component={HomePage} />
  </Route>
);

function requireAuth(nextState, replace) {
  if (!sessionStorage.getItem('access_token')) {
    replace({
      pathname: '/'
    });
  }
}
