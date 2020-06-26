import ReactFileReader from 'react-file-reader';
import {
  Avatar,
  Educations,
  Experiences,
  Languages,
} from '../../types/formDataTypes';

export const NEXT_STEP = '@@progressBar/NEXT_STEP';
export type NEXT_STEP = typeof NEXT_STEP;

export const BACK_STEP = '@@progressBar/BACK_STEP';
export type BACK_STEP = typeof BACK_STEP;

export const OPEN_AVATAR = '@@progressBar/OPEN_AVATAR';
export type OPEN_AVATAR = typeof OPEN_AVATAR;

export const SAVE_CONTACTS = '@@progressBar/SAVE_CONTACTS';
export type SAVE_CONTACTS = typeof SAVE_CONTACTS;

export const SAVE_EDUCATION = '@@progressBar/SAVE_EDUCATION';
export type SAVE_EDUCATION = typeof SAVE_EDUCATION;

export const SAVE_EXPERIENCE = '@@progressBar/SAVE_EXPERIENCE';
export type SAVE_EXPERIENCE = typeof SAVE_EXPERIENCE;

export const SAVE_AVATAR = '@@progressBar/SAVE_AVATAR';
export type SAVE_AVATAR = typeof SAVE_AVATAR;

export const SAVE_LANGUAGES = '@@progressBar/SAVE_LANGUAGES';
export type SAVE_LANGUAGES = typeof SAVE_LANGUAGES;

export const START_LOADER = '@@progressBar/START_LOADER';
export type START_LOADER = typeof START_LOADER;

export const END_LOADER = '@@progressBar/END_LOADER';
export type END_LOADER = typeof END_LOADER;

export interface NextStepAction {
  type: NEXT_STEP;
  step: number;
}

export interface BackStepAction {
  type: BACK_STEP;
  step: number;
}

export interface AvatarAction {
  type: OPEN_AVATAR;
  files: ReactFileReader;
  avatarURL: string;
}

export interface SaveContactsAction {
  type: SAVE_CONTACTS;
  id: number;
  name: string;
  lastName: string;
  birthdate: string;
  avatar: Avatar;
}

export interface SaveEducationAction {
  type: SAVE_EDUCATION;
  id: number;
  education: Educations;
}

export interface SaveExperienceAction {
  type: SAVE_EXPERIENCE;
  id: number;
  experience: Experiences;
}

export interface SaveLanguagesAction {
  type: SAVE_LANGUAGES;
  id: number;
  languages: Languages;
}

export interface StartLoaderAction {
  type: START_LOADER;
}

export interface EndLoaderAction {
  type: END_LOADER;
}

export type ProgressBarActionTypes =
  | NextStepAction
  | BackStepAction
  | AvatarAction
  | SaveContactsAction
  | SaveEducationAction
  | SaveExperienceAction
  | SaveLanguagesAction
  | StartLoaderAction
  | EndLoaderAction;
