import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import '../../setupTests';
import EducationForm from '../education/EducationForm';
import EducationFormElement from '../education/EducationFormElement';

describe('educationForm', () => {
  const propsForm = {
    handleSubmit: jest.fn(),
    isLoading: false,
  };
  const propsFormElement = {
    element: null,
    disabled: false,
    t: jest.fn(),
  };

  const educationForm = shallow(<EducationForm {...propsForm} />);
  const educationFormElement = shallow(
    <EducationFormElement {...propsFormElement} />,
  );

  it('snapshot Form', () => {
    expect(toJson(educationForm)).toMatchSnapshot();
  });

  it('should catch submit', () => {
    educationForm.find('form').simulate('submit');
    expect(propsForm.handleSubmit.mock.calls.length).toBe(1);
  });

  it('snapshot FormElement', () => {
    expect(toJson(educationFormElement)).toMatchSnapshot();
  });
});
