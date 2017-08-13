/*eslint-disable import/no-duplicates*/
import * as types from './actionTypes';
import joggingTimeApi from '../api/joggingTimeApi';
import {beginAjaxCall} from './ajaxStatusActions';
import {ajaxCallError} from './ajaxStatusActions';

export function getJoggingTimeByUserSuccess(joggingTimesByUser) {
  return {type: types.GET_JOGGING_TIMES_BY_USER_SUCCESS, joggingTimesByUser};
}
export function getJoggingTimeByUserError() {
  return {type: types.GET_JOGGING_TIMES_BY_USER_ERROR};
}
export function createJoggingTimeByUserSuccess(joggingTimesByUser) {
  return {type: types.CREATE_JOGGING_TIME_BY_USER_SUCCESS, joggingTimesByUser};
}
export function updateJoggingTimeByUserSuccess(joggingTimesByUser) {
  return {type: types.UPDATE_JOGGING_TIME_BY_USER_SUCCESS, joggingTimesByUser};
}
export function deleteJoggingTimeByUserSuccess(joggingTimesByUser) {
  return {type: types.DELETE_JOGGING_TIME_BY_USER_SUCCESS, joggingTimesByUser};
}

export function getJoggingTimesByUser(user, dateRangeFilter) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return joggingTimeApi.getJoggingTimesByUser(user, dateRangeFilter).then(serviceResult => {
      dispatch(getJoggingTimeByUserSuccess(JSON.parse(serviceResult.object)));
    }).catch(error => {
      dispatch(ajaxCallError());
      dispatch(getJoggingTimeByUserError());
      throw(error);
    });
  };
}

export function createJoggingTimeForUser(joggingTime, user) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return new Promise((resolve, reject) => {
      return joggingTimeApi.createJoggingTimeForUser(joggingTime, user).then(serviceResult => {
        if (serviceResult.success) {
          joggingTime.jogging_times_id = serviceResult.object;
          dispatch(createJoggingTimeByUserSuccess(joggingTime));
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

export function updateJoggingTimeForUser(joggingTime, user) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return new Promise((resolve, reject) => {
      return joggingTimeApi.updateJoggingTimeForUser(joggingTime, user).then(serviceResult => {
        if (serviceResult.success) {
          dispatch(updateJoggingTimeByUserSuccess(joggingTime));
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

export function deleteJoggingTimeForUser(joggingTime, user) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return joggingTimeApi.deleteJoggingTimeForUser(joggingTime, user).then(() => {
      dispatch(deleteJoggingTimeByUserSuccess(joggingTime));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}
