import expect from 'expect';
import joggingTimeReducer from './joggingTimeReducer';
import * as actions from '../actions/joggingTimeActions';

describe('Jogging Time Reducer', () => {
  it('should add jogging time when passed CREATE_JOGGING_TIME_SUCCESS', () => {
     //given
    const initialState = [
      {distance: 100},
      {distance: 200}
    ];
    const newJoggingTime = {distance: 300};
    const action = actions.createJoggingTimeSuccess(newJoggingTime);

    //when
    const newState = joggingTimeReducer(initialState, action);

    //then
    expect(newState.length).toEqual(3);
    expect(newState[0].distance).toEqual(100);
    expect(newState[1].distance).toEqual(200);
    expect(newState[2].distance).toEqual(300);
  });

  it('should update joggingTime when passed UPDATE_JOGGING_TIME_SUCCESS', () => {
    //given
    const initialState = [
      {jogging_times_id: 'abc', distance: 100},
      {jogging_times_id: 'def', distance: 200},
      {jogging_times_id: 'xyz', distance: 300}
    ];
    const joggingTime = {jogging_times_id: 'abc', distance: 500};
    const action = actions.updateJoggingTimeSuccess(joggingTime);

    //when
    const newState = joggingTimeReducer(initialState, action);

    //then
    const updatedJoggingTime = newState.find(a => a.jogging_times_id === joggingTime.jogging_times_id);
    const untouchedJoggingTime = newState.find(a => a.jogging_times_id === 'def');
    expect(updatedJoggingTime.distance).toEqual(500);
    expect(untouchedJoggingTime.distance).toEqual(200);
    expect(newState.length).toEqual(3);
  });

});
