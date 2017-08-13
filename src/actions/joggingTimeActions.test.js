import expect from 'expect';
import * as joggingTimeActions from './joggingTimeActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

// Test a sync action
describe('Jogging Time Actions', () => {
  describe('createJoggingTimeSuccess', () => {
    //given
    const joggingTime = {id: 'clean-code', title: 'Clean Code'};
    const expectedAction = {
      type: types.CREATE_JOGGING_TIME_SUCCESS,
      joggingTime: joggingTime
    };

    //when
    const action = joggingTimeActions.createJoggingTimeSuccess(joggingTime);

    //then
    expect(action).toEqual(expectedAction);
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  //
  // it('should create BEGIN_AJAX_CALL and LOAD_JOGGING_TIMES_SUCCESS when loading joggingTimes', (done) => {
  //   nock('http://localhost:9090/')
  //     .get('joggingTime/getAll')
  //     .reply(200, {
  //       body: {
  //         joggingTime: [{
  //           jogging_times_id: 1,
  //           day: 2,
  //           month: 3,
  //           year: 2017,
  //           distance: 300,
  //           time: 300
  //         }]
  //       }
  //     });
  //
  //   const expectedActions = [
  //     {type: types.BEGIN_AJAX_CALL},
  //     {type: types.LOAD_JOGGING_TIMES_SUCCESS, body: {joggingTime: [{
  //       jogging_times_id: 1,
  //       day: 2,
  //       month: 3,
  //       year: 2017,
  //       distance: 300,
  //       time: 300
  //     }]}}
  //   ];
  //   const store = mockStore({joggingTimes: []}, expectedActions);
  //
  //   store.dispatch(joggingTimeActions.loadJoggingTimes()).then(() => {
  //     const actions = store.getActions();
  //     expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
  //     expect(actions[1].type).toEqual(types.LOAD_JOGGING_TIMES_SUCCESS);
  //     done();
  //   }).catch((error) => {
  //     console.log(error);
  //     done();
  //   });
  // });
});
