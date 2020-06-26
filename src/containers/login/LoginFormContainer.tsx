import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { InjectedFormProps, SubmissionError } from 'redux-form';
import { loginActions, loginSelectors } from '../../ducks/login';
import LoginForm from '../../components/login/LoginForm';
import { AppActions } from '../../types/commonTypes';
import { LoginSelector } from '../../ducks/login/selectors';
import validate from './validate';
import '../../components/login/LoginFormStyles.css';

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) =>
  bindActionCreators(
    {
      loginAction: loginActions.login,
    },
    dispatch,
  );

type SelectorProps = LoginSelector;

type ActionProps = ReturnType<typeof mapDispatchToProps>;

export type LoginFormContainerProps = InjectedFormProps<
  {},
  ActionProps & SelectorProps
> &
  ActionProps &
  SelectorProps;

function onLogin(values: any, dispatch: Dispatch<AppActions>) {
  const login = values.get('login');
  const password = values.get('password');
  const rememberMe = values.get('rememberMe');
  return new Promise((resolve, reject) => {
    dispatch(loginActions.login(login, password, rememberMe, resolve, reject));
  }).catch(error => {
    throw new SubmissionError(error);
  });
}

function LoginFormContainer(props: LoginFormContainerProps) {
  const { submitting, isLogining } = props;
  return (
    <>
      <LoginForm {...props} submitting={submitting || isLogining} />
    </>
  );
}

export default connect<SelectorProps, ActionProps>(
  loginSelectors.loginSelector,
  mapDispatchToProps,
)(
  reduxForm<{}, ActionProps & SelectorProps>({
    form: 'login',
    onSubmit: onLogin,
    validate,
  })(LoginFormContainer),
);
