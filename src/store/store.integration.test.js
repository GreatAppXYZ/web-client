import expect from 'expect';
import {createStore} from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as joggingTimeActions from '../actions/joggingTimeActions';

describe('Store', function () {
 it('Should handle creating jogging times', function() {
   //given
   const store = createStore(rootReducer, initialState);
   const joggingTime = {
     distance: 100
   };

   //when
   const action = joggingTimeActions.createJoggingTimeSuccess(joggingTime);
   store.dispatch(action);

   //then
   const actual = store.getState().joggingTimes[0];
   const expected = {
     distance: 100
   };
   expect(expected, actual);
 });
});
