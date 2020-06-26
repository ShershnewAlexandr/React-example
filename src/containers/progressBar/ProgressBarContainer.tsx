import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ProgressBar from '../../components/progressBar/ProgressBar';
import { progressBarSelectors } from '../../ducks/progressBar';
import { ProgressBarLoadingSelector } from '../../ducks/progressBar/selectors';

interface ProgressBarContainerOwnProps {
  nextStepAction: () => void;
  backStepAction: () => void;
  step: number;
  progressBarURL: string;
}

const defaultProps = {
  step: 1,
  nextStepAction: () => {},
  backStepAction: () => {},
  progressBarURL: '/',
  isLoading: false,
};

type SelectorProps = ProgressBarLoadingSelector;

export type ProgressBarContainerProps = RouteComponentProps &
  ProgressBarContainerOwnProps &
  SelectorProps;

function ProgressBarContainer(props: ProgressBarContainerProps) {
  return <ProgressBar {...props} />;
}

ProgressBarContainer.defaultProps = defaultProps;

export default withRouter(
  connect<SelectorProps, {}, ProgressBarContainerOwnProps>(
    progressBarSelectors.progressBarLoadingSelector,
  )(ProgressBarContainer),
);
