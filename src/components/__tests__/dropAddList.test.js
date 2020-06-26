import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import '../../setupTests';
import { DropAddListForm } from '../dropAddList/DropAddListForm';

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

describe('dropAddListForm', () => {
  const props = {
    maxElements: 5,
    formRender: jest.fn(),
    fields: [1, 2, 3],
    disabled: false,
    t: jest.fn(),
  };

  const dropAllListForm = shallow(<DropAddListForm {...props} />);

  it('snapshot', () => {
    expect(toJson(dropAllListForm)).toMatchSnapshot();
  });

  it('fields number', () => {
    expect(dropAllListForm.find('.drop-icon')).toHaveLength(3);
  });
});
