// import expect from 'expect';
// import React from 'react';
// import {mount, shallow} from 'enzyme';
// import {ManageMyJoggingTimePage} from './ManageMyJoggingTimePage';
//
// describe('Manage MyJoggingTime Page', () => {
//   it('sets error message when trying to save non positive distance', () => {
//     const props = {
//       authors: [],
//       joggingTime: {id: '', distance: -1, time: 10222},
//       actions: {saveJoggingTime: () => {return Promise.resolve();}}
//     };
//     const wrapper = mount(<ManageMyJoggingTimePage {...props}/>);
//     const saveButton = wrapper.find('#save');
//     expect(saveButton.prop('type')).toBe('submit');
//
//     saveButton.simulate('click');
//     expect(wrapper.state().errors.distance).toBe('Distance should be a positive number.');
//   });
// });
