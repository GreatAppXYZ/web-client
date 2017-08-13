import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function passwordChangingByUserReducer(state = initialState.passwordChangingByUserResult, action) {
  switch (action.type) {
    case types.CHANGE_PASSWORD_BY_USER_SUCCESS:
      return Object.assign({}, action.serviceResult);
    default:
      return state;
  }
}
