import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import '../../setupTests';
import ExperienceForm from '../experience/ExperienceForm';
import ExperienceFormElement from '../experience/ExperienceFormElement';

describe('experienceForm', () => {
  const propsForm = {
    handleSubmit: jest.fn(),
    isLoading: false,
  };
  const propsFormElement = {
    element: null,
    disabled: false,
    t: jest.fn(),
  };

  const experienceForm = shallow(<ExperienceForm {...propsForm} />);
  const experienceFormElement = shallow(
    <ExperienceFormElement {...propsFormElement} />,
  );

  it('snapshot Form', () => {
    expect(toJson(experienceForm)).toMatchSnapshot();
  });

  it('should catch submit', () => {
    experienceForm.find('form').simulate('submit');
    expect(propsForm.handleSubmit.mock.calls.length).toBe(1);
  });

  it('snapshot FormElement', () => {
    expect(toJson(experienceFormElement)).toMatchSnapshot();
  });
});
