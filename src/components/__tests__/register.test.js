import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import '../../setupTests';
import RegisterPage from '../pages/registerPage/RegisterPage';
import RegisterForm from '../register/RegisterForm';

jest.mock('../../store/index');
jest.mock('i18next', () => ({
  use: function() {
    return this;
  },
  init: jest.fn(),
}));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: str => str,
  }),
}));

describe('registerPage', () => {
  const registerPage = shallow(<RegisterPage />);

  it('snapshot', () => {
    expect(toJson(registerPage)).toMatchSnapshot();
  });
});

describe('registerForm', () => {
  const props = {
    handleSubmit: jest.fn(),
  };

  const registerForm = shallow(<RegisterForm {...props} />);

  it('snapshot', () => {
    expect(toJson(registerForm)).toMatchSnapshot();
  });

  it('should catch submit', () => {
    registerForm.find('form').simulate('submit');
    expect(props.handleSubmit.mock.calls.length).toBe(1);
  });
});
