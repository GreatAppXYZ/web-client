import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function registrationReducer(state = initialState.registrationResult, action) {
  switch (action.type) {
    case types.REGISTER_USER_SUCCESS:
      return action.serviceResult;
    default:
      return state;
  }
}
