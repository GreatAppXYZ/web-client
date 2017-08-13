import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authenticationReducer(state = initialState.authInfo, action) {
  switch (action.type) {
    case types.AUTHENTICATED_USER_SUCCESS:
      return  Object.assign({}, action.authInfo);
    default:
      return state;
  }
}
