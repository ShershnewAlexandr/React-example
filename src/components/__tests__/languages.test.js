import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import '../../setupTests';
import LanguageForm from '../languages/LanguageForm';

describe('languagesForm', () => {
  const props = {
    languagesList: [
      { native_name: 'name', code: 'ru' },
      { native_name: 'name', code: 'ru' },
    ],
    handleSubmit: jest.fn(),
    isLoading: false,
  };

  const languageForm = shallow(<LanguageForm {...props} />);

  it('snapshot', () => {
    expect(toJson(languageForm)).toMatchSnapshot();
  });

  it('should catch submit', () => {
    languageForm.find('form').simulate('submit');
    expect(props.handleSubmit.mock.calls.length).toBe(1);
  });

  it('have 2 field', () => {
    expect(languageForm.find('Field')).toHaveLength(2);
  });

  it('have default languagesList = []', () => {
    const languageForm = shallow(<LanguageForm />);
    expect(languageForm.find('Field')).toHaveLength(0);
  });
});
