/*eslint-disable import/no-duplicates*/
import * as types from './actionTypes';
import authorizationApi from '../api/authorizationApi';
import {beginAjaxCall} from './ajaxStatusActions';
import {ajaxCallError} from './ajaxStatusActions';

export function changePasswordSuccess(serviceResult) {
  return {type: types.CHANGE_PASSWORD_SUCCESS, serviceResult};
}

export function changePasswordByUserSuccess(serviceResult) {
  return {type: types.CHANGE_PASSWORD_BY_USER_SUCCESS, serviceResult};
}

export function changePassword(passwordChanging) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return authorizationApi.changePassword(passwordChanging).then(serviceResult => {
      dispatch(changePasswordSuccess(serviceResult));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}

export function changePasswordByUser(passwordChanging, userId) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return authorizationApi.changePasswordByUser(passwordChanging, userId).then(serviceResult => {
      dispatch(changePasswordByUserSuccess(serviceResult));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}
