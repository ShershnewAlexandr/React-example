import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import '../../setupTests';
import I18nHeader from '../i18nHeader/I18nHeader';

describe('i18nHeader', () => {
  const props = {
    changeLang: jest.fn(),
  };

  const i18nHeader = shallow(<I18nHeader {...props} />);

  it('snapshot', () => {
    expect(toJson(i18nHeader)).toMatchSnapshot();
  });

  it('should init 3 lang', () => {
    expect(props.changeLang).toBeCalledTimes(3);
  });
});
