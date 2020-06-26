import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { bindActionCreators, Dispatch } from 'redux';
import { InjectedFormProps } from 'redux-form';
import ContactsForm from '../../components/contacts/ContactsForm';
import {
  progressBarActions,
  progressBarSelectors,
} from '../../ducks/progressBar';

import { AppActions } from '../../types/commonTypes';
import { ContactsFormSelector } from '../../ducks/progressBar/selectors';
import validate from './validate';

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) =>
  bindActionCreators(
    {
      onloadAvatarAction: progressBarActions.avatarAction,
    },
    dispatch,
  );

type SelectorProps = ContactsFormSelector;

type ActionProps = ReturnType<typeof mapDispatchToProps>;

export type ContactsFormContainerProps = InjectedFormProps<
  {},
  ActionProps & SelectorProps
> &
  ActionProps &
  SelectorProps;

function ContactsFormContainer(props: ContactsFormContainerProps) {
  return <ContactsForm {...props} />;
}

export default connect<SelectorProps, ActionProps>(
  progressBarSelectors.contactsFormSelector,
  mapDispatchToProps,
)(
  reduxForm<{}, ActionProps & SelectorProps>({
    form: 'contact',
    onSubmit: () => {},
    validate,
    destroyOnUnmount: false,
  })(ContactsFormContainer),
);
