import {
  Languages,
  StartEducations,
  StartExperiences,
} from '../../types/formDataTypes';

export const PUT_EDUCATION_ID = '@@progressBar/PUT_EDUCATION_ID';
export type PUT_EDUCATION_ID = typeof PUT_EDUCATION_ID;

export const PUT_EXPERIENCE_ID = '@@progressBar/PUT_EXPERIENCE_ID';
export type PUT_EXPERIENCE_ID = typeof PUT_EXPERIENCE_ID;

export const PUT_START_CONTACTS = '@@login/PUT_START_CONTACTS';
export type PUT_START_CONTACTS = typeof PUT_START_CONTACTS;

export const PUT_START_EDUCATION = '@@login/PUT_START_EDUCATION';
export type PUT_START_EDUCATION = typeof PUT_START_EDUCATION;

export const PUT_START_EXPERIENCE = '@@login/PUT_START_EXPERIENCE';
export type PUT_START_EXPERIENCE = typeof PUT_START_EXPERIENCE;

export const PUT_START_LANGUAGES = '@@login/PUT_START_LANGUAGES';
export type PUT_START_LANGUAGES = typeof PUT_START_LANGUAGES;

export const PUT_START_STEP = '@@login/PUT_START_STEP';
export type PUT_START_STEP = typeof PUT_START_STEP;

export interface PutEducationIdAction {
  type: PUT_EDUCATION_ID;
  id: number;
  index: number;
}

export interface PutExperienceIdAction {
  type: PUT_EXPERIENCE_ID;
  id: number;
  index: number;
}

export interface PutStartContactsAction {
  type: PUT_START_CONTACTS;
  firstName: string;
  lastName: string;
  birthday: string;
  prerenderAvatarURL: string;
}

export interface PutStartEducationAction {
  type: PUT_START_EDUCATION;
  educations: StartEducations;
}

export interface PutStartExperienceAction {
  type: PUT_START_EXPERIENCE;
  experiences: StartExperiences;
}

export interface PutStartLanguagesAction {
  type: PUT_START_LANGUAGES;
  languages: Languages;
}

export interface PutStartStepAction {
  type: PUT_START_STEP;
  step: number;
}

export type MainActionTypes =
  | PutStartStepAction
  | PutStartLanguagesAction
  | PutStartExperienceAction
  | PutStartEducationAction
  | PutStartContactsAction
  | PutExperienceIdAction
  | PutEducationIdAction;
