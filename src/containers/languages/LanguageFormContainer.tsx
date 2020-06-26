import React from 'react';
import { connect } from 'react-redux';
import { InjectedFormProps } from 'redux-form';
import { reduxForm } from 'redux-form/lib/immutable';
import LanguageForm from '../../components/languages/LanguageForm';
import { progressBarSelectors } from '../../ducks/progressBar';
import { LanguagesFormSelector } from '../../ducks/progressBar/selectors';
import validate from './validate';

type SelectorProps = LanguagesFormSelector;

export type LanguageFormContainerProps = InjectedFormProps<{}, SelectorProps> &
  SelectorProps;

function LanguageFormContainer(props: LanguageFormContainerProps) {
  return <LanguageForm {...props} />;
}

export default connect<SelectorProps>(
  progressBarSelectors.languagesFormSelector,
)(
  reduxForm<{}, SelectorProps>({
    form: 'languages',
    onSubmit: () => {},
    validate,
    destroyOnUnmount: false,
  })(LanguageFormContainer),
);
