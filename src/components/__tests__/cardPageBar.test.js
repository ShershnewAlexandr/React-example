import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import '../../setupTests';
import CardPageBar from '../cardPageBar/CardPageBar';

jest.mock('../../store/index');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: str => str,
  }),
}));

describe('cardPageBar', () => {
  const props = {
    current_page: 1,
    total: 4,
    backPageAction: jest.fn(),
    nextPageAction: jest.fn(),
  };
  const cardPageBar = shallow(<CardPageBar {...props} />);

  it('snapshot', () => {
    expect(toJson(cardPageBar)).toMatchSnapshot();
  });
});
