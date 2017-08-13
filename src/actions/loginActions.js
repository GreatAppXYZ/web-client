/*eslint-disable import/no-duplicates*/
import * as types from './actionTypes';
import authorizationApi from '../api/authorizationApi';
import {beginAjaxCall} from './ajaxStatusActions';
import {ajaxCallError} from './ajaxStatusActions';

export function loginUserSuccess(serviceResult) {
  return {type: types.LOGIN_USER_SUCCESS, serviceResult};
}

export function authenticatedUserSuccess(authInfo) {
  return {type: types.AUTHENTICATED_USER_SUCCESS, authInfo};
}

export function getUserRoleSuccess(serviceResult) {
  return {type: types.GET_USER_ROLE_SUCCESS, serviceResult};
}

export function clearJoggingTimesSuccess() {
  return {type: types.CLEAR_JOGGING_TIMES_SUCCESS};
}

let loginResult = {
  success: true,
  message: '',
  object: {}
};

function refresh(dispatch, token) {
  return authorizationApi.refreshToken(token).then(response => {
    sessionStorage.setItem('access_token', response.access_token);
    sessionStorage.setItem('expires_in', response.expires_in);
    sessionStorage.setItem('refresh_token', response.refresh_token);
    dispatch(authenticatedUserSuccess({authenticated: true, expires_in: parseInt(response.expires_in)}));
    dispatch(loginUserSuccess(loginResult));
  }).catch(error => {
    dispatch(ajaxCallError());
    throw(error);
  });
}

export function loginUser(user) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return authorizationApi.getAccessToken(user).then(response => {
      return refresh(dispatch, response.refresh_token);
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}

export function refreshToken() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return refresh(dispatch, sessionStorage.getItem('refresh_token'));
  };
}

let userRoleResult = {
  success: true,
  message: '',
  object: {}
};

export function getUserRole(user) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return authorizationApi.getUserRole().then(response => {
      sessionStorage.setItem('role', response.authorities[0].authority);
      sessionStorage.setItem('name', response.name);
      dispatch(getUserRoleSuccess(userRoleResult));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}

export function clearJoggingTimes() {
  return function (dispatch) {
    dispatch(clearJoggingTimesSuccess());
  };
}
