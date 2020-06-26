import { createSelector } from 'reselect';
import { TypedMap } from '../../types/commonTypes';

function contactsFormErrorsSelector(state) {
  return state.getIn(['form', 'contact', 'syncErrors']);
}

function educationFormErrorsSelector(state) {
  return state.getIn(['form', 'education', 'syncErrors']);
}

function experienceFormErrorsSelector(state) {
  return state.getIn(['form', 'experience', 'syncErrors']);
}

function languagesFormErrorsSelector(state) {
  return state.getIn(['form', 'languages', 'syncErrors']);
}

function stepSelector(state) {
  return state.getIn(['progressBar', 'step']);
}

function idSelector(state) {
  return state.getIn(['login', 'user', 'id']);
}

function avatarSelector(state) {
  return state.getIn(['progressBar', 'avatar']);
}

function contactsSelector(state) {
  const contacts = state.getIn(['form', 'contact', 'values']);
  if (contacts) {
    return {
      name: contacts.get('firstName'),
      lastName: contacts.get('lastName'),
      birthdate: contacts.get('dateOfBirthday'),
    };
  }
  return {};
}

function educationSelector(state) {
  const education = state.getIn(['form', 'education', 'values', 'education']);
  if (education) {
    return education;
  }
  return {};
}

function languagesSelector(state) {
  const languages = state.getIn(['form', 'languages', 'values']);
  if (languages) {
    return languages;
  }
  return {};
}

function experienceSelector(state) {
  const experience = state.getIn([
    'form',
    'experience',
    'values',
    'experience',
  ]);
  if (experience) {
    return experience;
  }
  return {};
}

const progressBarSelector = createSelector(
  stepSelector,
  idSelector,
  (step, id) => ({
    step,
    id,
  }),
);

const helperProgressBarSelector = createSelector(
  progressBarSelector,
  contactsFormErrorsSelector,
  educationFormErrorsSelector,
  experienceFormErrorsSelector,
  languagesFormErrorsSelector,
  contactsSelector,
  educationSelector,
  experienceSelector,
  languagesSelector,
  avatarSelector,
  (
    { step, id },
    contactsFormErrors,
    educationFormErrors,
    experienceFormErrors,
    languagesFormErrors,
    { name, lastName, birthdate },
    education,
    experience,
    languages,
    avatar,
  ) => ({
    step,
    id,
    contactsFormErrors,
    educationFormErrors,
    experienceFormErrors,
    languagesFormErrors,
    languages,
    name,
    lastName,
    birthdate,
    education,
    experience,
    avatar,
  }),
);

export type ContactsFormSelector = {
  initialValues: any;
  prerenderAvatarURL: string;
  isLoading: boolean;
};
function contactsFormSelector(state): ContactsFormSelector {
  return {
    initialValues: state.getIn(['form', 'contact', 'values']),
    prerenderAvatarURL: state.getIn(['progressBar', 'avatar', 'preURL']),
    isLoading: state.getIn(['progressBar', 'isLoading']),
  };
}

export type EducationFormSelector = {
  initialValues: any;
  isLoading: boolean;
};
function educationFormSelector(state): EducationFormSelector {
  return {
    initialValues: state.getIn(['form', 'education', 'values']),
    isLoading: state.getIn(['progressBar', 'isLoading']),
  };
}

export type ExperienceFormSelector = {
  initialValues: any;
  isLoading: boolean;
};
function experienceFormSelector(state): ExperienceFormSelector {
  return {
    initialValues: state.getIn(['form', 'experience', 'values']),
    isLoading: state.getIn(['progressBar', 'isLoading']),
  };
}

export type LanguagesFormSelector = {
  initialValues: any;
  languagesList: TypedMap<any>;
  isLoading: boolean;
};
function languagesFormSelector(state): LanguagesFormSelector {
  return {
    initialValues: state.getIn(['form', 'languages', 'values']),
    languagesList: state.getIn(['login', 'languagesList']),
    isLoading: state.getIn(['progressBar', 'isLoading']),
  };
}

export type ProgressBarLoadingSelector = {
  isLoading: boolean;
};
function progressBarLoadingSelector(state): ProgressBarLoadingSelector {
  return {
    isLoading: state.getIn(['progressBar', 'isLoading']),
  };
}

export default {
  progressBarLoadingSelector,
  helperProgressBarSelector,
  contactsFormSelector,
  educationFormSelector,
  experienceFormSelector,
  languagesFormSelector,
};
