import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';

export function loadCourseSuccess(courses) {
  return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function loadCourses(course) {
  return function (dispatch) {
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCourseSuccess(courses));
    }).catch(error => {
      throw(error);
    });
  };
}
