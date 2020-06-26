import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import '../../setupTests';
import CheckboxInput from '../inputs/CheckboxInput';
import DateInput from '../inputs/DateInput';
import EndDateInput from '../inputs/EndDateInput';
import NumberInput from '../inputs/NumberInput';
import PhotoInput from '../inputs/PhotoInput';
import TextInput from '../inputs/TextInput';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: str => str,
  }),
}));

describe('inputs', () => {
  const CheckboxInputProps = {
    onChange: jest.fn(),
    label: 'label',
    disabled: false,
  };

  const DateInputProps = {
    meta: { invalid: false, touched: false, error: null },
    label: 'label',
    disabled: false,
  };

  const EndDateInputProps = {
    disabled: false,
    checked: false,
    checkboxChange: jest.fn(),
    label: 'label',
  };

  const NumberInputProps = {
    meta: { invalid: false, touched: false, error: null },
    label: 'label',
    min: 0,
    max: 5,
    step: 1,
    disabled: false,
  };

  const PhotoInputProps = {
    label: 'label',
    prerenderPhotoURL: 'url',
    disabled: 'false',
    onClickAction: jest.fn(),
  };

  const TextInputProps = {
    meta: { invalid: false, touched: false, error: null },
    label: 'label',
    placeholder: 'placeholder',
    disabled: false,
    isPassword: false,
  };

  const checkboxInput = shallow(<CheckboxInput {...CheckboxInputProps} />);
  const dateInput = shallow(<DateInput {...DateInputProps} />);
  const endDateInput = shallow(<EndDateInput {...EndDateInputProps} />);
  const numberInput = shallow(<NumberInput {...NumberInputProps} />);
  const photoInput = shallow(<PhotoInput {...PhotoInputProps} />);
  const textInput = shallow(<TextInput {...TextInputProps} />);

  it('CheckboxInput snapshot', () => {
    expect(toJson(checkboxInput)).toMatchSnapshot();
  });

  it('DateInput snapshot', () => {
    expect(toJson(dateInput)).toMatchSnapshot();
  });

  it('EndDateInput snapshot', () => {
    expect(toJson(endDateInput)).toMatchSnapshot();
  });

  it('NumberInput snapshot', () => {
    expect(toJson(numberInput)).toMatchSnapshot();
  });

  it('PhotoInput snapshot', () => {
    expect(toJson(photoInput)).toMatchSnapshot();
  });

  it('TextInput snapshot', () => {
    expect(toJson(textInput)).toMatchSnapshot();
  });

  it('CheckboxInput should call onchange', () => {
    checkboxInput
      .find('input')
      .simulate('change')
      .simulate('change');
    expect(CheckboxInputProps.onChange.mock.calls.length).toBe(2);
  });
});
