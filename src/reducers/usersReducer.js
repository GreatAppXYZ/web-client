/*eslint-disable no-case-declarations*/
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function usersReducer(state = initialState.users, action) {
  switch (action.type) {
    case types.LOAD_USERS_SUCCESS:
      return action.users;
    case types.LOAD_USERS_ERROR:
      return [];
    case types.CREATE_USER_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.user)
      ];
    case types.UPDATE_USER_SUCCESS:
      return [
        ...state.filter(user => user.user_id !== action.user.user_id),
        Object.assign({}, action.user)
      ];
    case types.DELETE_USER_SUCCESS:
      const indexToDelete = state.findIndex(user => {
        return user.user_id === action.user.user_id;
      });
      return [
        ...state.slice(0, indexToDelete),
        ...state.slice(indexToDelete + 1)
      ];
    default:
      return state;
  }
}
