/*eslint-disable import/no-duplicates*/
import * as types from './actionTypes';

export function beginAjaxCall() {
  return {type: types.BEGIN_AJAX_CALL};
}

export function ajaxCallError() {
  return {type: types.BEGIN_AJAX_ERROR};
}
