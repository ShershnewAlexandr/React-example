import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import '../../setupTests';
import ProgressBar from '../progressBar/ProgressBar';
import StepBar from '../progressBar/StepBar';

jest.mock('../../store/index');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: str => str,
  }),
}));

describe('progressBar', () => {
  const progressBarProps = {
    step: 3,
    nextStepAction: jest.fn(),
    backStepAction: jest.fn(),
    progressBarURL: '/',
    location: { pathname: '/' },
  };

  const stepBarProps = {
    text: 'text',
    icon: 'icon',
    isActive: false,
  };

  const progressBar = shallow(
    <ProgressBar {...progressBarProps} isLoading={false} />,
  );
  const progressBarLoading = shallow(
    <ProgressBar {...progressBarProps} isLoading={true} />,
  );
  const stepBar = shallow(<StepBar {...stepBarProps} />);

  it('ProgressBar snapshot', () => {
    expect(toJson(progressBar)).toMatchSnapshot();
  });

  it('ProgressBarLoading snapshot', () => {
    expect(toJson(progressBarLoading)).toMatchSnapshot();
  });

  it('LoginPage snapshot', () => {
    expect(toJson(stepBar)).toMatchSnapshot();
  });
});
