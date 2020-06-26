import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { reducer as form } from 'redux-form/immutable';
import { progressBarReducer } from '../progressBar';
import { loginReducer } from '../login';
import { cardsReducer } from '../cards';
import { rest } from '../../utils/constants';
import * as types from './types';
import { AppActions } from '../../types/commonTypes';
import { AppState } from '../../store';
import { Language } from '../../types/formDataTypes';

const combinedReducer: any = combineReducers({
  progressBar: progressBarReducer,
  login: loginReducer,
  cards: cardsReducer,
  form,
});

type Reducer = (AppState, AppActions) => AppState;

export default (history: History): Reducer => (
  state: AppState,
  action: AppActions,
): AppState => {
  switch (action.type) {
    case types.PUT_EDUCATION_ID:
      return state.setIn(
        ['form', 'education', 'values', 'education', action.index, 'id'],
        action.id,
      );

    case types.PUT_EXPERIENCE_ID:
      return state.setIn(
        ['form', 'experience', 'values', 'experience', action.index, 'id'],
        action.id,
      );

    case types.PUT_START_CONTACTS:
      state = state
        .setIn(['form', 'contact', 'values', 'firstName'], action.firstName)
        .setIn(['form', 'contact', 'values', 'lastName'], action.lastName)
        .setIn(
          ['form', 'contact', 'values', 'dateOfBirthday'],
          action.birthday,
        );

      if (action.prerenderAvatarURL !== null) {
        state = state.setIn(
          ['progressBar', 'avatar', 'preURL'],
          `${rest.storageURL}${action.prerenderAvatarURL}`,
        );
      }
      return state;

    case types.PUT_START_EDUCATION:
      const educations = action.educations.map(education => ({
        schoolName: education.institution,
        startYear: education.enrolled_on,
        endYear: education.graduated_on,
        id: education.id,
      }));
      return state.setIn(
        ['form', 'education', 'values', 'education'],
        fromJS(educations),
      );

    case types.PUT_START_EXPERIENCE:
      const experiences = action.experiences.map(experience => ({
        companyName: experience.company_name,
        profile: experience.position,
        startYear: experience.hired_on,
        endYear: experience.quit_on,
        id: experience.id,
      }));
      return state.setIn(
        ['form', 'experience', 'values', 'experience'],
        fromJS(experiences),
      );

    case types.PUT_START_LANGUAGES:
      action.languages.forEach((language: Language) => {
        state = state.setIn(
          ['form', 'languages', 'values', language.code],
          language.level,
        );
      });
      return state;

    case types.PUT_START_STEP:
      return state.setIn(['progressBar', 'step'], action.step);

    default:
      return combinedReducer(state, action);
  }
};
