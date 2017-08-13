/*eslint-disable import/no-duplicates*/
import * as types from './actionTypes';
import joggingTimeApi from '../api/joggingTimeApi';
import {beginAjaxCall} from './ajaxStatusActions';
import {ajaxCallError} from './ajaxStatusActions';

export function loadJoggingTimeSuccess(joggingTimes) {
  return {type: types.LOAD_JOGGING_TIMES_SUCCESS, joggingTimes};
}
export function createJoggingTimeSuccess(joggingTime) {
  return {type: types.CREATE_JOGGING_TIME_SUCCESS, joggingTime};
}
export function updateJoggingTimeSuccess(joggingTime) {
  return {type: types.UPDATE_JOGGING_TIME_SUCCESS, joggingTime};
}
export function deleteJoggingTimeSuccess(joggingTime) {
  return {type: types.DELETE_JOGGING_TIME_SUCCESS, joggingTime};
}

export function loadJoggingTimes(filter) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return joggingTimeApi.getAllJoggingTimes(filter).then(serviceResult => {
      dispatch(loadJoggingTimeSuccess(JSON.parse(serviceResult.object)));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}

export function createJoggingTime(joggingTime) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return new Promise((resolve, reject) => {
      return joggingTimeApi.createJoggingTime(joggingTime).then(serviceResult => {
        if (serviceResult.success) {
          joggingTime.jogging_times_id = serviceResult.object;
          dispatch(createJoggingTimeSuccess(joggingTime));
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

export function createJoggingTimeForUser(joggingTime, user) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return new Promise((resolve, reject) => {
      return joggingTimeApi.createJoggingTimeForUser(joggingTime, user).then(serviceResult => {
        if (serviceResult.success) {
          joggingTime.jogging_times_id = serviceResult.object;
          dispatch(createJoggingTimeSuccess(joggingTime));
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

export function updateJoggingTime(joggingTime) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return new Promise((resolve, reject) => {
      return joggingTimeApi.updateJoggingTime(joggingTime).then(serviceResult => {
        if (serviceResult.success) {
          dispatch(updateJoggingTimeSuccess(joggingTime));
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

export function deleteJoggingTime(joggingTime) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return joggingTimeApi.deleteJoggingTime(joggingTime).then(() => {
        dispatch(deleteJoggingTimeSuccess(joggingTime));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}
