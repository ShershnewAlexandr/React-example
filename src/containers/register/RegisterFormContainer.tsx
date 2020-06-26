import React from 'react';
import { Dispatch } from 'redux';
import { reduxForm, SubmissionError } from 'redux-form/immutable';
import RegisterForm from '../../components/register/RegisterForm';
import { loginActions } from '../../ducks/login';
import { AppActions } from '../../types/commonTypes';
import validate from './validate';

function onRegister(values, dispatch: Dispatch<AppActions>) {
  return new Promise((resolve, reject) => {
    dispatch(loginActions.register(resolve, reject, values));
  }).catch(error => {
    throw new SubmissionError(error);
  });
}

function RegisterFormContainer(props) {
  return <RegisterForm {...props} />;
}

export default reduxForm({
  form: 'register',
  onSubmit: onRegister,
  validate,
})(RegisterFormContainer);
