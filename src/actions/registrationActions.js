/*eslint-disable import/no-duplicates*/
import * as types from './actionTypes';
import authorizationApi from '../api/authorizationApi';
import {beginAjaxCall} from './ajaxStatusActions';
import {ajaxCallError} from './ajaxStatusActions';

export function createUserSuccess(serviceResult) {
  return {type: types.REGISTER_USER_SUCCESS, serviceResult};
}

export function createUser(user) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return authorizationApi.registerUser(user).then(serviceResult => {

        dispatch(createUserSuccess(serviceResult));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}
