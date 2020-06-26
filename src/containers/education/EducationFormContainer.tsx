import React from 'react';
import { connect } from 'react-redux';
import { InjectedFormProps } from 'redux-form';
import { reduxForm } from 'redux-form/lib/immutable';
import EducationForm from '../../components/education/EducationForm';
import { progressBarSelectors } from '../../ducks/progressBar';
import { EducationFormSelector } from '../../ducks/progressBar/selectors';
import validate from './validate';

type SelectorProps = EducationFormSelector;

export type EducationFormContainerProps = InjectedFormProps<{}, SelectorProps> &
  SelectorProps;

function EducationFormContainer(props: EducationFormContainerProps) {
  return <EducationForm {...props} />;
}

export default connect<SelectorProps>(
  progressBarSelectors.educationFormSelector,
)(
  reduxForm<{}, SelectorProps>({
    form: 'education',
    onSubmit: () => {},
    validate,
    destroyOnUnmount: false,
  })(EducationFormContainer),
);
