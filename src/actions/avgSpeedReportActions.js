/*eslint-disable import/no-duplicates*/
import * as types from './actionTypes';
import joggingTimeApi from '../api/joggingTimeApi';
import {beginAjaxCall} from './ajaxStatusActions';
import {ajaxCallError} from './ajaxStatusActions';

export function loadAvgSpeedReportSuccess(avgSpeedPerWeek) {
  return {type: types.LOAD_AVG_SPEED_REPORT_SUCCESS, avgSpeedPerWeek};
}

export function loadAvgSpeedReport() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return joggingTimeApi.loadAvgSpeedReport().then(serviceResult => {
      dispatch(loadAvgSpeedReportSuccess(JSON.parse(serviceResult.object)));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}
