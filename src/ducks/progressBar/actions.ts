import ReactFileReader from 'react-file-reader';
import * as types from './types';
import { AppActions } from '../../types/commonTypes';
import {
  Avatar,
  Educations,
  Experiences,
  Languages,
} from '../../types/formDataTypes';

export function nextStep(step: number): AppActions {
  return {
    type: types.NEXT_STEP,
    step,
  };
}

export function backStep(step: number): AppActions {
  return {
    type: types.BACK_STEP,
    step,
  };
}

export function avatarAction(
  files: ReactFileReader,
  avatarURL: string,
): AppActions {
  return {
    type: types.OPEN_AVATAR,
    files,
    avatarURL,
  };
}

export function saveContacts(
  id: number,
  name: string,
  lastName: string,
  birthdate: string,
  avatar: Avatar,
): AppActions {
  return {
    type: types.SAVE_CONTACTS,
    id,
    name,
    lastName,
    birthdate,
    avatar,
  };
}

export function saveEducation(id: number, education: Educations): AppActions {
  return {
    type: types.SAVE_EDUCATION,
    id,
    education,
  };
}

export function saveExperience(
  id: number,
  experience: Experiences,
): AppActions {
  return {
    type: types.SAVE_EXPERIENCE,
    id,
    experience,
  };
}

export function saveLanguages(id: number, languages: Languages): AppActions {
  return {
    type: types.SAVE_LANGUAGES,
    id,
    languages,
  };
}

export function startLoader(): AppActions {
  return {
    type: types.START_LOADER,
  };
}

export function endLoader(): AppActions {
  return {
    type: types.END_LOADER,
  };
}
