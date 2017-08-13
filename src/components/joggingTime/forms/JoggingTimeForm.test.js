import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import JoggingTimeForm from './JoggingTimeForm';

function setup(saving) {
  const props = {
    joggingTime: {},
    saving: saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  return shallow(<JoggingTimeForm {...props}/>);
}

describe('JoggingTimeForm via Enzyme', () => {

  it('save button is labeled "Save" when not saving', () => {
    const wrapper = setup(false);
    expect(wrapper.find('#save').props().value).toBe('Save');
  });

  it('save button is labeled "Saving..." when saving', () => {
    const wrapper = setup(true);
    expect(wrapper.find('#save').props().value).toBe('Saving...');
  });
});
