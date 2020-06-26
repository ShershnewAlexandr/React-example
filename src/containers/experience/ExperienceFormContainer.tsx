import React from 'react';
import { connect } from 'react-redux';
import { InjectedFormProps } from 'redux-form';
import { reduxForm } from 'redux-form/lib/immutable';
import ExperienceForm from '../../components/experience/ExperienceForm';
import { progressBarSelectors } from '../../ducks/progressBar';
import { ExperienceFormSelector } from '../../ducks/progressBar/selectors';
import validate from './validate';

type SelectorProps = ExperienceFormSelector;

export type ExperienceFormContainerProps = InjectedFormProps<
  {},
  SelectorProps
> &
  SelectorProps;

function ExperienceFormContainer(props: ExperienceFormContainerProps) {
  return <ExperienceForm {...props} />;
}

export default connect<SelectorProps>(
  progressBarSelectors.experienceFormSelector,
)(
  reduxForm<{}, SelectorProps>({
    form: 'experience',
    onSubmit: () => {},
    validate,
    destroyOnUnmount: false,
  })(ExperienceFormContainer),
);
