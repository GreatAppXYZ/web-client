/*eslint-disable no-case-declarations*/
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function joggingTimeReducer(state = initialState.joggingTimes, action) {
  switch (action.type) {
    case types.LOAD_JOGGING_TIMES_SUCCESS:
      return action.joggingTimes;
    case types.CLEAR_JOGGING_TIMES_SUCCESS:
      return [];
    case types.CREATE_JOGGING_TIME_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.joggingTime)
      ];
    case types.UPDATE_JOGGING_TIME_SUCCESS:
      return [
        ...state.filter(joggingTime => joggingTime.jogging_times_id !== action.joggingTime.jogging_times_id),
        Object.assign({}, action.joggingTime)
      ];
    case types.DELETE_JOGGING_TIME_SUCCESS:
      const indexToDelete = state.findIndex(joggingTime => {
        return joggingTime.jogging_times_id === action.joggingTime.jogging_times_id;
      });
      return [
        ...state.slice(0, indexToDelete),
        ...state.slice(indexToDelete + 1)
      ];
    default:
      return state;
  }
}
