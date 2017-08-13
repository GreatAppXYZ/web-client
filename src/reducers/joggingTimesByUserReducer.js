/*eslint-disable no-case-declarations*/
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function joggingTimeReducer(state = initialState.joggingTimesByUser, action) {
  switch (action.type) {
    case types.GET_JOGGING_TIMES_BY_USER_SUCCESS:
      return action.joggingTimesByUser;
    case types.GET_JOGGING_TIMES_BY_USER_ERROR:
      return [];
    case types.CREATE_JOGGING_TIME_BY_USER_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.joggingTimesByUser)
      ];
    case types.UPDATE_JOGGING_TIME_BY_USER_SUCCESS:
      return [
        ...state.filter(joggingTime => joggingTime.jogging_times_id !== action.joggingTimesByUser.jogging_times_id),
        Object.assign({}, action.joggingTimesByUser)
      ];
    case types.DELETE_JOGGING_TIME_BY_USER_SUCCESS:
      const indexToDelete = state.findIndex(joggingTime => {
        return joggingTime.jogging_times_id === action.joggingTimesByUser.jogging_times_id;
      });
      return [
        ...state.slice(0, indexToDelete),
        ...state.slice(indexToDelete + 1)
      ];
    default:
      return state;
  }
}
