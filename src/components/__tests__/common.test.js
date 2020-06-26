import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import '../../setupTests';
import Loader from '../loaders/Loader';
import App from '../App';

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

describe('common', () => {
  const app = shallow(<App />);
  const loader = shallow(<Loader />);

  it('App snapshot', () => {
    expect(toJson(app)).toMatchSnapshot();
  });

  it('Loader snapshot', () => {
    expect(toJson(loader)).toMatchSnapshot();
  });
});
