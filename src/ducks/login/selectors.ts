import { TypedMap } from '../../types/commonTypes';

export interface LoginSelector {
  loginForm: TypedMap<any>;
  token: string;
  isLogining: boolean;
}

export function loginSelector(state): LoginSelector {
  return {
    loginForm: state.getIn(['form', 'login']),
    token: state.getIn(['login', 'token']),
    isLogining: state.getIn(['login', 'isLogining']),
  };
}

export function userIdSelector(state): number {
  return state.getIn(['login', 'user', 'id']);
}
