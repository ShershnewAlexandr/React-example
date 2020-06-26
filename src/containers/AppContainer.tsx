import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { history } from '../store';
import App from '../components/App';
import { loginActions } from '../ducks/login';
import { routes } from '../utils/constants';
import { AppActions } from '../types/commonTypes';
import { cardsActions } from '../ducks/cards';

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) =>
  bindActionCreators(
    {
      autoLoginAction: loginActions.autoLogin,
      loadEditPostAction: cardsActions.loadEditPost,
    },
    dispatch,
  );

interface SelectorProps {
  token: string;
}

type ActionProps = ReturnType<typeof mapDispatchToProps>;

export type AppContainerProps = ActionProps & SelectorProps;

function AppContainer(props: AppContainerProps) {
  const { token } = props;

  if (token === 'no-token') {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      props.autoLoginAction();
    } else if (history.location.pathname !== routes.REGISTER) {
      history.push(routes.SIGNIN);
    }
  }
  return <App />;
}

export default connect<SelectorProps, ActionProps>(
  (state: any) => ({ token: state.getIn(['login', 'token']) }),
  mapDispatchToProps,
)(AppContainer);
