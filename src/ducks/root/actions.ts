import * as types from './types';
import { AppActions } from '../../types/commonTypes';
import {
  Languages,
  StartEducations,
  StartExperiences,
} from '../../types/formDataTypes';

export function putEducationId(id: number, index: number): AppActions {
  return {
    type: types.PUT_EDUCATION_ID,
    id,
    index,
  };
}

export function putExperienceId(id: number, index: number): AppActions {
  return {
    type: types.PUT_EXPERIENCE_ID,
    id,
    index,
  };
}

export function putStartContacts(
  firstName: string,
  lastName: string,
  birthday: string,
  prerenderAvatarURL: string,
): AppActions {
  return {
    type: types.PUT_START_CONTACTS,
    firstName,
    lastName,
    birthday,
    prerenderAvatarURL,
  };
}

export function putStartEducation(educations: StartEducations): AppActions {
  return {
    type: types.PUT_START_EDUCATION,
    educations,
  };
}

export function putStartExperience(experiences: StartExperiences): AppActions {
  return {
    type: types.PUT_START_EXPERIENCE,
    experiences,
  };
}

export function putStartLanguages(languages: Languages): AppActions {
  return {
    type: types.PUT_START_LANGUAGES,
    languages,
  };
}

export function putStartStep(step: number): AppActions {
  return {
    type: types.PUT_START_STEP,
    step,
  };
}
