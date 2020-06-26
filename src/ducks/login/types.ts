import { Language, LoginFormData } from '../../types/formDataTypes';
import { TypedMap } from '../../types/commonTypes';

export const LOGIN = '@@login/LOGIN';
export type LOGIN = typeof LOGIN;

export const REGISTER = '@@login/REGISTER';
export type REGISTER = typeof REGISTER;

export const AUTO_LOGIN = '@@login/AUTO_LOGIN';
export type AUTO_LOGIN = typeof AUTO_LOGIN;

export const SAVE_TOKEN = '@@login/SAVE_TOKEN';
export type SAVE_TOKEN = typeof SAVE_TOKEN;

export const SAVE_CURRENT_USER = '@@login/SAVE_CURRENT_USER';
export type SAVE_CURRENT_USER = typeof SAVE_CURRENT_USER;

export const SAVE_LANGUAGES_LIST = '@@login/SAVE_LANGUAGES_LIST';
export type SAVE_LANGUAGES_LIST = typeof SAVE_LANGUAGES_LIST;

export const START_LOGIN = '@@login/START_LOGIN';
export type START_LOGIN = typeof START_LOGIN;

export const END_LOGIN = '@@login/END_LOGIN';
export type END_LOGIN = typeof END_LOGIN;

export const SaveActiveI18n = '@@login/SaveActiveI18n';
export type SaveActiveI18n = typeof SaveActiveI18n;

export interface SaveActiveI18nAction {
  type: SaveActiveI18n;
  lang: string;
}

export interface LoginAction extends LoginFormData {
  type: LOGIN;
  rememberMe: boolean;
  resolve: any;
  reject: any;
}

export interface AutoLoginAction {
  type: AUTO_LOGIN;
}

export interface SaveTokenAction {
  type: SAVE_TOKEN;
  token: string;
}

export interface SaveCurrentUserAction {
  type: SAVE_CURRENT_USER;
  user: any;
}

export interface SaveLanguagesListAction {
  type: SAVE_LANGUAGES_LIST;
  languagesList: Array<Language>;
}

export interface StartLoginAction {
  type: START_LOGIN;
}

export interface EndLoginAction {
  type: END_LOGIN;
}

export interface RegisterAction {
  type: REGISTER;
  resolve: any;
  reject: any;
  values: TypedMap<any>;
}

export type LoginActionTypes =
  | LoginAction
  | AutoLoginAction
  | SaveTokenAction
  | SaveCurrentUserAction
  | SaveLanguagesListAction
  | StartLoginAction
  | EndLoginAction
  | SaveActiveI18nAction
  | RegisterAction;
