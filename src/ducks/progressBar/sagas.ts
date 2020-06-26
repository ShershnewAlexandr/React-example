import {
  call,
  all,
  takeLatest,
  takeEvery,
  put,
  select,
} from 'redux-saga/effects';
import * as types from './types';
import { rest, steps } from '../../utils/constants';
import { restApi } from '../../utils/restApi';
import { userIdSelector } from '../login/selectors';
import * as actions from './actions';
import * as rootActions from '../root/actions';
import { SaveContactsAction } from './types';
import { Education, Experience } from '../../types/formDataTypes';

export function saveContactsRequest(action: types.SaveContactsAction) {
  return restApi.put(rest.contacts(action.id), {
    name: action.name,
    last_name: action.lastName,
    birthdate: action.birthdate,
  });
}

export function* saveContacts(action: SaveContactsAction) {
  try {
    let saveResponse;
    if (action.avatar) {
      [saveResponse] = yield all([
        call(saveContactsRequest, action),
        call(saveAvatar, action),
      ]);
    } else {
      saveResponse = yield call(saveContactsRequest, action);
    }

    if (saveResponse.data.success) {
      yield put(actions.nextStep(steps.EDUCATION));
      console.log('contacts saved');
    }
  } catch (e) {
    console.error(e);
  }
}

export function saveEducationRequest({
  action,
  value,
}: {
  action: types.SaveEducationAction;
  value: Education;
}) {
  return restApi.request({
    url: value.id
      ? rest.educationUp(action.id, value.id)
      : rest.education(action.id),
    method: value.id ? 'put' : 'post',
    data: {
      institution: value.schoolName,
      enrolled_on: value.startYear,
      graduated_on: value.endYear,
    },
  });
}

export function* allSaveForSaveEducation(action: types.SaveEducationAction) {
  return yield all(
    action.education
      .map(education =>
        call(saveEducationRequest, {
          action,
          value: education.toJS(),
        }),
      )
      .toJS(),
  );
}

export function* allPutForSaveEducation(responses) {
  return yield all(
    responses.map((response, index) =>
      put(rootActions.putEducationId(response.data.data.education.id, index)),
    ),
  );
}

export function* saveEducation(action: types.SaveEducationAction) {
  try {
    if (action.education.size > 0) {
      const responses = yield call(allSaveForSaveEducation, action);
      yield call(allPutForSaveEducation, responses);
      responses.forEach(response => {
        if (response.config.method === 'put')
          console.log(`education ${response.data.data.education.id} updated`);
        else if (response.config.method === 'post')
          console.log('education saved');
      });
    }
    yield put(actions.nextStep(steps.EXPERIENCE));
  } catch (e) {
    console.error(e);
  }
}

export function saveExperienceRequest({
  action,
  value,
}: {
  action: types.SaveExperienceAction;
  value: Experience;
}) {
  return restApi.request({
    url: value.id
      ? rest.experienceUp(action.id, value.id)
      : rest.experience(action.id),
    method: value.id ? 'put' : 'post',
    data: {
      company_name: value.companyName,
      position: value.profile,
      hired_on: value.startYear,
      quit_on: value.endYear,
    },
  });
}

export function* allSaveForSaveExperience(action: types.SaveExperienceAction) {
  return yield all(
    action.experience
      .map(experience =>
        call(saveExperienceRequest, {
          action,
          value: experience.toJS(),
        }),
      )
      .toJS(),
  );
}

export function* allPutForSaveExperience(responses) {
  return yield all(
    responses.map((response, index) =>
      put(rootActions.putExperienceId(response.data.data.experience.id, index)),
    ),
  );
}

export function* saveExperience(action: types.SaveExperienceAction) {
  try {
    if (action.experience.size > 0) {
      const responses = yield call(allSaveForSaveExperience, action);
      yield call(allPutForSaveExperience, responses);
      responses.forEach(response => {
        if (response.config.method === 'put')
          console.log(`experience ${response.data.data.experience.id} updated`);
        else if (response.config.method === 'post')
          console.log('experience saved');
      });
    }
    yield put(actions.nextStep(steps.LANGUAGES));
  } catch (e) {
    console.error(e);
  }
}

export function saveAvatarRequest(action: types.SaveContactsAction) {
  return restApi.post(rest.avatar(action.id), action.avatar.get('base64'), {
    headers: {
      'Content-Type': action.avatar.getIn(['fileInfo', 'type']),
    },
  });
}

export function* saveAvatar(action: types.SaveContactsAction) {
  if (action.avatar.get('base64')) {
    try {
      const saveResponse = yield call(saveAvatarRequest, action);
      if (saveResponse.data.success) {
        console.log('avatar saved');
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export function saveLanguagesRequest({ action, lang }) {
  return restApi.post(rest.languages(action.id), {
    code: lang[0],
    level: Number(lang[1]),
  });
}

export function* SaveLanguagesRequest(
  action: types.SaveLanguagesAction,
  arrLengs,
) {
  return yield all(
    arrLengs.map(language =>
      call(saveLanguagesRequest, {
        action,
        lang: language,
      }),
    ),
  );
}

export function* saveLanguages(action: types.SaveLanguagesAction) {
  try {
    if (action.languages && action.languages.size > 0) {
      const arrLengs: any[] = [];
      // @ts-ignore
      for (const current of action.languages.entries()) {
        arrLengs.push(current);
      }
      const response = yield call(SaveLanguagesRequest, action, arrLengs);
      response.forEach(response => {
        if (response.data.success) {
          console.log('language saved');
        }
      });
    }
    yield put(actions.nextStep(steps.CARDLIST));
  } catch (e) {
    console.error(e);
  }
}

export function withLoader(func) {
  return function*(action: types.ProgressBarActionTypes) {
    yield put(actions.startLoader());
    yield call(func, action);
    yield put(actions.endLoader());
  };
}

export function* setStep(action: types.NextStepAction | types.BackStepAction) {
  const userId = yield select(userIdSelector);
  localStorage.setItem(`step${userId}`, String(action.step));
}

export default function*() {
  yield all([
    takeLatest(types.SAVE_CONTACTS, withLoader(saveContacts)),
    takeLatest(types.SAVE_EDUCATION, withLoader(saveEducation)),
    takeLatest(types.SAVE_EXPERIENCE, withLoader(saveExperience)),
    takeLatest(types.SAVE_LANGUAGES, withLoader(saveLanguages)),
    takeEvery(types.NEXT_STEP, setStep),
    takeEvery(types.BACK_STEP, setStep),
  ]);
}
