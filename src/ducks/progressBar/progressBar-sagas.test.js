import { expectSaga } from 'redux-saga-test-plan';
import { Map, List } from 'immutable';
import { steps } from '../../utils/constants';
import * as matchers from 'redux-saga-test-plan/matchers';
import * as actions from './actions';
import * as sagas from './sagas';
import { SaveLanguagesRequest } from './sagas';
import { saveAvatarRequest } from './sagas';

jest.mock('i18next', () => ({
  use: () => {
    return { use: () => 5 };
  },
  init: () => {},
}));

it('withLoader', () => {
  const fn = () => {};

  return expectSaga(sagas.withLoader(fn), 'action')
    .put(actions.startLoader())
    .call(fn, 'action')
    .put(actions.endLoader())
    .run();
});

it('saveLanguages', () => {
  const action = {
    languages: List([{ lang1: 1 }]),
  };

  return expectSaga(sagas.saveLanguages, action)
    .provide([[matchers.call.fn(sagas.SaveLanguagesRequest), []]])
    .call(SaveLanguagesRequest, action, [[0, { lang1: 1 }]])
    .put(actions.nextStep(steps.CARDLIST))
    .run();
});

it('saveAvatar', () => {
  const action = {
    avatar: Map({ base64: 'dsf' }),
  };

  return expectSaga(sagas.saveAvatar, action)
    .provide([
      [matchers.call.fn(sagas.saveAvatarRequest), { data: { success: false } }],
    ])
    .call(saveAvatarRequest, action)
    .run();
});

it('saveExperience', () => {
  const action = { experience: Map({ a: 0 }) };

  return expectSaga(sagas.saveExperience, action)
    .provide([
      [matchers.call.fn(sagas.allSaveForSaveExperience), []],
      [matchers.call.fn(sagas.allPutForSaveExperience)],
    ])
    .call(sagas.allSaveForSaveExperience, action)
    .call(sagas.allPutForSaveExperience, [])
    .put(actions.nextStep(steps.LANGUAGES))
    .run();
});

it('saveEducation', () => {
  const action = { education: Map({ a: 0 }) };

  return expectSaga(sagas.saveEducation, action)
    .provide([
      [matchers.call.fn(sagas.allSaveForSaveEducation), []],
      [matchers.call.fn(sagas.allPutForSaveEducation)],
    ])
    .call(sagas.allSaveForSaveEducation, action)
    .call(sagas.allPutForSaveEducation, [])
    .put(actions.nextStep(steps.EXPERIENCE))
    .run();
});

it('saveContacts', () => {
  const action = {};

  return expectSaga(sagas.saveContacts, action)
    .provide([
      [
        matchers.call.fn(sagas.saveContactsRequest),
        { data: { success: true } },
      ],
    ])
    .call(sagas.saveContactsRequest, action)
    .put(actions.nextStep(steps.EDUCATION))
    .run();
});
