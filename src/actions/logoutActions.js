/*eslint-disable import/no-duplicates*/
import * as types from "./actionTypes";

export function authenticatedUserSuccess(authInfo) {
  return {type: types.AUTHENTICATED_USER_SUCCESS, authInfo};
}

let authInfo = {
  authenticated: false,
  expires_in: 0
};
export function logoutUser() {
  return function (dispatch) {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("expires_in");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("expires_in");
    dispatch(authenticatedUserSuccess(authInfo));
  };
}
