import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import '../../setupTests';
import LoginPage from '../pages/loginPage/LoginPage';
import InformationPage from '../pages/informationPage/InformationPage';

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

describe('pages', () => {
  const loginPage = shallow(<LoginPage />);
  const informationPageLoading = shallow(<InformationPage isLoading={true} />);
  const informationPage = shallow(<InformationPage isLoading={false} />);

  it('LoginPage snapshot', () => {
    expect(toJson(loginPage)).toMatchSnapshot();
  });

  it('InformationPageLoading snapshot', () => {
    expect(toJson(informationPageLoading)).toMatchSnapshot();
  });

  it('InformationPage snapshot', () => {
    expect(toJson(informationPage)).toMatchSnapshot();
  });
});
