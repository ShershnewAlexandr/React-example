import * as types from './types';
import {
  AppActions,
  createTypedMap,
  LoginState,
  TypedMap,
} from '../../types/commonTypes';

const initialState: TypedMap<LoginState> = createTypedMap({
  token: 'no-token',
  isLogining: false,
});

export default function(
  state: TypedMap<LoginState> = initialState,
  action: AppActions,
): TypedMap<LoginState> {
  switch (action.type) {
    case types.SAVE_TOKEN:
      return state.set('token', action.token);

    case types.SAVE_CURRENT_USER:
      return state.set('user', action.user);

    case types.SAVE_LANGUAGES_LIST:
      return state.set('languagesList', action.languagesList);

    case types.START_LOGIN:
      return state.set('isLogining', true);

    case types.END_LOGIN:
      return state.set('isLogining', false);

    default:
      return state;
  }
}
