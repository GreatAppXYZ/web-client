import expect from 'expect';
import {createStore} from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Store', function () {
 it('Should handle creating courses', function() {
   //given
   const store = createStore(rootReducer, initialState);
   const course = {
     title: "Clean Code"
   };

   //when
   const action = courseActions.createCourseSuccess(course);
   store.dispatch(action);

   //then
   const actual = store.getState().courses[0];
   const expected = {
     title: 'Clean Code'
   };
   expect(expected, actual);
 });
});
