import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import '../../setupTests';
import LoginForm from '../login/LoginForm';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: str => str,
  }),
}));

describe('login', () => {
  const props = {
    handleSubmit: jest.fn(),
  };

  const loginForm = shallow(<LoginForm {...props} />);

  it('snapshot', () => {
    expect(toJson(loginForm)).toMatchSnapshot();
  });

  it('should catch submit', () => {
    loginForm.find('form').simulate('submit');
    expect(props.handleSubmit.mock.calls.length).toBe(1);
  });
});
