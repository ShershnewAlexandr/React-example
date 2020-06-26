import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import StepBar from './StepBar';
import Loader from '../loaders/Loader';
import { progressBarSteps } from '../../utils/constants';
import { ProgressBarContainerProps } from '../../containers/progressBar/ProgressBarContainer';

function ProgressBar(props: ProgressBarContainerProps) {
  const { t } = useTranslation();
  const {
    step,
    nextStepAction,
    backStepAction,
    progressBarURL,
    location,
    isLoading,
  } = props;
  return (
    <>
      {location.pathname !== progressBarURL && progressBarURL !== '/' && (
        <Redirect to={progressBarURL} />
      )}
      <div className="progress-container">
        <Grid container direction="row" justify="space-around">
          {progressBarSteps.map((current, index) => (
            <StepBar
              key={index}
              icon={current.icon}
              text={t(current.translationKey)}
              isActive={step >= index + 1}
            />
          ))}
          <div className="progress-line-back" />
          <div className={`progress-line progress-line-step${step}`} />
        </Grid>
      </div>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <button
          type="button"
          className={isLoading ? 'button disabled' : 'button'}
          onClick={backStepAction}
          disabled={isLoading}
        >
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <i className="material-icons back-icon">arrow_back</i>
            </Grid>
            <Grid item>
              <div className="back-but-txt">{t('progressBar.backStep')}</div>
            </Grid>
          </Grid>
        </button>
        <button
          type="button"
          className={
            isLoading ? 'button button-next disabled' : 'button button-next'
          }
          onClick={nextStepAction}
          disabled={isLoading}
        >
          <Grid container justify="space-around" alignItems="center">
            <Grid item>
              <div className="forward-but-txt">{t('progressBar.nextStep')}</div>
            </Grid>
            <Grid item>
              <i className="material-icons forward-icon">arrow_forward</i>
            </Grid>
          </Grid>
        </button>
      </Grid>
      {isLoading && <Loader />}
    </>
  );
}

export default ProgressBar;
