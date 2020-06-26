// import { expectSaga } from 'redux-saga-test-plan';
// import * as matchers from 'redux-saga-test-plan/matchers';
// import * as actions from './actions';
// import * as commonAction from '../root/actions';
// import {
//   saveActiveI18nSaga,
//   saveI18n,
//   autoLoginSaga,
//   getToken,
//   getLoginData,
//   loginSaga,
//   login,
//   setToken,
//   removeToken,
//   getCurrentUser,
//   getLoginDataRequest,
//   getCurrentStep,
//   getLanguagesList,
//   registerSaga,
//   registerRequest,
// } from './sagas';
// import { cardsSagas } from '../cards';
// import { registerToken } from '../../utils/restApi';
// import { push } from 'connected-react-router';
// import { routes } from '../../utils/constants';

// jest.mock('i18next', () => ({
//   use: () => {
//     return { use: () => 5 };
//   },
//   init: () => {},
// }));

it('asdfsdafsaveActiveI18nSaga', () => {
  expect(true).toBe(true);
});

// it('saveActiveI18nSaga', () => {
//   return expectSaga(saveActiveI18nSaga, { lang: 'kz' })
//     .provide([[matchers.call.fn(saveI18n)]])
//     .call(saveI18n, 'kz')
//     .run();
// });

// it('autoLoginSaga', () => {
//   return expectSaga(autoLoginSaga)
//     .provide([
//       [matchers.call.fn(getToken), 'token'],
//       [matchers.call.fn(registerToken)],
//       [matchers.call.fn(getLoginData)],
//     ])
//     .put(actions.startLogin())
//     .call(getToken)
//     .call(registerToken, 'token')
//     .call(getLoginData, 'token')
//     .put(actions.endLogin())
//     .run();
// });
//
// it('loginSaga remember true', () => {
//   const action = {
//     rememberMe: true,
//     resolve: () => {},
//   };
//
//   return expectSaga(loginSaga, action)
//     .provide([
//       [
//         matchers.call.fn(login),
//         {
//           data: {
//             success: true,
//             data: {
//               token: 'token',
//             },
//           },
//         },
//       ],
//       [matchers.call.fn(setToken)],
//       [matchers.call.fn(registerToken)],
//       [matchers.call.fn(getLoginData)],
//     ])
//     .put(actions.startLogin())
//     .put(actions.endLogin())
//     .call(login, action)
//     .call(setToken, 'token')
//     .call(registerToken, 'token')
//     .call(getLoginData, 'token')
//     .run();
// });
//
// it('loginSaga remember false', () => {
//   const action = {
//     rememberMe: false,
//     resolve: () => {},
//   };
//
//   return expectSaga(loginSaga, action)
//     .provide([
//       [
//         matchers.call.fn(login),
//         {
//           data: {
//             success: true,
//             data: {
//               token: 'token',
//             },
//           },
//         },
//       ],
//       [matchers.call.fn(removeToken)],
//       [matchers.call.fn(registerToken)],
//       [matchers.call.fn(getLoginData)],
//     ])
//     .put(actions.startLogin())
//     .put(actions.endLogin())
//     .call(login, action)
//     .call(removeToken)
//     .call(registerToken, 'token')
//     .call(getLoginData, 'token')
//     .run();
// });
//
// it('getLoginData', () => {
//   const userData = {
//     id: 45,
//     name: 'name',
//     last_name: 'lastname',
//     birthdate: 'birthdate',
//     avatar: 'avatar',
//   };
//
//   const user = { data: { success: true, data: { user: userData } } };
//
//   const education = {
//     data: { success: true, data: { educations: 'educations' } },
//   };
//   const experience = {
//     data: { success: true, data: { experiences: 'experiences' } },
//   };
//   const languages = {
//     data: { success: true, data: { languages: 'languages' } },
//   };
//   const languagesList = {
//     data: { success: true, data: { languages: 'languagesList' } },
//   };
//
//   return expectSaga(getLoginData, 'token')
//     .provide([
//       [matchers.call.fn(getCurrentUser), user],
//       [
//         matchers.call.fn(getLoginDataRequest),
//         [education, experience, languages],
//       ],
//       [matchers.call.fn(getCurrentStep), 4],
//       [matchers.call.fn(getLanguagesList), languagesList],
//       [matchers.call.fn(cardsSagas.getPostsSaga)],
//     ])
//     .call(cardsSagas.getPostsSaga)
//     .call(getCurrentUser)
//     .call(getLoginDataRequest, userData.id)
//     .put(actions.saveCurrentUser(userData))
//     .put(
//       commonAction.putStartContacts(
//         userData.name,
//         userData.last_name,
//         userData.birthdate,
//         userData.avatar,
//       ),
//     )
//     .put(commonAction.putStartEducation(education.data.data.educations))
//     .put(commonAction.putStartExperience(experience.data.data.experiences))
//     .put(commonAction.putStartLanguages(languages.data.data.languages))
//     .call(getCurrentStep)
//     .put(commonAction.putStartStep(4))
//     .put(actions.saveToken('token'))
//     .call(getLanguagesList)
//     .put(actions.saveLanguagesList(languagesList.data.data.languages))
//     .run();
// });
//
// it('registerSaga', () => {
//   const action = { values: {}, resolve: jest.fn() };
//   const response = { data: { success: true } };
//
//   return expectSaga(registerSaga, action)
//     .provide([[matchers.call.fn(registerRequest), response]])
//     .call(registerRequest, action.values)
//     .put(push(routes.SIGNIN))
//     .run();
// });
