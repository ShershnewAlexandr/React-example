import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import '../../setupTests';
import ContactsForm from '../contacts/ContactsForm';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: str => str,
  }),
}));

describe('contactsForm', () => {
  const props = {
    onloadAvatarAction: jest.fn(),
    prerenderAvatarURL: jest.fn(),
    handleSubmit: jest.fn(),
    isLoading: false,
  };

  const contactsForm = shallow(<ContactsForm {...props} />);

  it('snapshot', () => {
    expect(toJson(contactsForm)).toMatchSnapshot();
  });

  it('should catch submit', () => {
    contactsForm.find('form').simulate('submit');
    expect(props.handleSubmit.mock.calls.length).toBe(1);
  });
});
