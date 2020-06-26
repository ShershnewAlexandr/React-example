import * as types from './types';
import { AppActions } from '../../types/commonTypes';

export function login(
  login: string,
  password: string,
  rememberMe: boolean,
  resolve: any,
  reject: any,
): AppActions {
  return {
    type: types.LOGIN,
    login,
    password,
    rememberMe,
    resolve,
    reject,
  };
}

export function autoLogin(): AppActions {
  return {
    type: types.AUTO_LOGIN,
  };
}

export function saveToken(token: string): AppActions {
  return {
    type: types.SAVE_TOKEN,
    token,
  };
}

export function saveCurrentUser(user): AppActions {
  return {
    type: types.SAVE_CURRENT_USER,
    user,
  };
}

export function saveLanguagesList(languagesList): AppActions {
  return {
    type: types.SAVE_LANGUAGES_LIST,
    languagesList,
  };
}

export function startLogin(): AppActions {
  return {
    type: types.START_LOGIN,
  };
}

export function endLogin(): AppActions {
  return {
    type: types.END_LOGIN,
  };
}

export function saveActiveI18n(lang: string): AppActions {
  return {
    type: types.SaveActiveI18n,
    lang,
  };
}

export function register(resolve, reject, values): AppActions {
  return {
    type: types.REGISTER,
    resolve,
    reject,
    values,
  };
}
