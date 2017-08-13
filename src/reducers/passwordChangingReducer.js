import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function passwordChangingReducer(state = initialState.passwordChangingResult, action) {
  switch (action.type) {
    case types.CHANGE_PASSWORD_SUCCESS:
      return Object.assign({}, action.serviceResult);
    default:
      return state;
  }
}
