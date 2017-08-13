import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.loginResult, action) {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return Object.assign({}, action.serviceResult);
    case types.GET_USER_ROLE_SUCCESS:
      return Object.assign({}, action.serviceResult);
    default:
      return state;
  }
}
