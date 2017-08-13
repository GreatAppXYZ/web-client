/*eslint-disable import/no-duplicates*/
import * as types from './actionTypes';
import userApi from '../api/userApi';
import {beginAjaxCall} from './ajaxStatusActions';
import {ajaxCallError} from './ajaxStatusActions';

export function loadUsersSuccess(users) {
  return {type: types.LOAD_USERS_SUCCESS, users};
}
export function loadUsersError() {
  return {type: types.LOAD_USERS_ERROR};
}
export function createUserSuccess(user) {
  return {type: types.CREATE_USER_SUCCESS, user};
}
export function updateUserSuccess(user) {
  return {type: types.UPDATE_USER_SUCCESS, user};
}
export function deleteUserSuccess(user) {
  return {type: types.DELETE_USER_SUCCESS, user};
}

export function loadUsers() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return userApi.getAllUsers().then(serviceResult => {
      if (serviceResult.success) {
        dispatch(loadUsersSuccess(JSON.parse(serviceResult.object)));
      } else {
        throw(serviceResult.message);
      }
    }).catch(error => {
      dispatch(ajaxCallError());
      dispatch(loadUsersError());
      throw(error);
    });
  };
}

export function createUser(user) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return new Promise((resolve, reject) => {
      return userApi.createUser(user).then(serviceResult => {
        if (serviceResult.success) {
          user.user_id = serviceResult.object;
          dispatch(createUserSuccess(user));
          resolve();
        } else {
          dispatch(ajaxCallError());
          reject(serviceResult.message);
        }
      }).catch(error => {
        dispatch(ajaxCallError());
        reject(error);
      });
    });
  };
}

export function updateUser(user) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return new Promise((resolve, reject) => {
      return userApi.updateUser(user).then(serviceResult => {
        if (serviceResult.success) {
          dispatch(updateUserSuccess(user));
          resolve();
        } else {
          dispatch(ajaxCallError());
          reject(serviceResult.message);
        }
      }).catch(error => {
        dispatch(ajaxCallError());
        reject(error);
      });
    });
  };
}

export function deleteUser(user) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return new Promise((resolve, reject) => {
      return userApi.deleteUser(user).then(serviceResult => {
        if (serviceResult.success) {
          dispatch(deleteUserSuccess(user));
          resolve();
        } else {
          dispatch(ajaxCallError());
          reject(serviceResult.message);
        }
      }).catch(error => {
        dispatch(ajaxCallError());
        reject(error);
      });
    });
  };
}
