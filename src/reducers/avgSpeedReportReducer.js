/*eslint-disable no-case-declarations*/
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function avgSpeedReportReducer(state = initialState.avgSpeedPerWeek, action) {
  switch (action.type) {
    case types.LOAD_AVG_SPEED_REPORT_SUCCESS:
      return action.avgSpeedPerWeek;
    default:
      return state;
  }
}
