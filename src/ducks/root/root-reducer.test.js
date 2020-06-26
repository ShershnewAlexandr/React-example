import { fromJS } from 'immutable';
import { reducer } from '../../store';
import * as types from './types';
import { rest } from '../../utils/constants';

describe('root-reducer', () => {
  it('put education id', () => {
    const initialState = fromJS({
      form: { education: { values: { education: { '5': { id: 89 } } } } },
    });
    const action = {
      type: types.PUT_EDUCATION_ID,
      id: 890,
      index: '5',
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        form: { education: { values: { education: { '5': { id: 890 } } } } },
      }),
    );
  });

  it('put experience id', () => {
    const initialState = fromJS({
      form: { experience: { values: { experience: { '5': { id: 89 } } } } },
    });
    const action = {
      type: types.PUT_EXPERIENCE_ID,
      id: 8390,
      index: '5',
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        form: { experience: { values: { experience: { '5': { id: 8390 } } } } },
      }),
    );
  });

  it('put start contacts', () => {
    const initialState = fromJS({
      progressBar: { avatar: { preURL: '' } },
      form: {
        contact: {
          values: { firstName: null, lastName: null, dateOfBirthday: null },
        },
      },
    });
    const action = {
      type: types.PUT_START_CONTACTS,
      firstName: 'ivan',
      lastName: 'ivanov',
      birthday: '12-12-12',
      prerenderAvatarURL: '/ava',
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        progressBar: {
          avatar: { preURL: `${rest.storageURL}${action.prerenderAvatarURL}` },
        },
        form: {
          contact: {
            values: {
              firstName: action.firstName,
              lastName: action.lastName,
              dateOfBirthday: action.birthday,
            },
          },
        },
      }),
    );
  });

  it('put start education', () => {
    const initialState = fromJS({
      form: { education: { values: { education: null } } },
    });
    const action = {
      type: types.PUT_START_EDUCATION,
      educations: [
        {
          institution: 'superSchool',
          enrolled_on: '12-12-12',
          graduated_on: '12-32-12',
          id: 645,
        },
      ],
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        form: {
          education: {
            values: {
              education: [
                {
                  schoolName: 'superSchool',
                  startYear: '12-12-12',
                  endYear: '12-32-12',
                  id: 645,
                },
              ],
            },
          },
        },
      }),
    );
  });

  it('put start experience', () => {
    const initialState = fromJS({
      form: { experience: { values: { experience: null } } },
    });
    const action = {
      type: types.PUT_START_EXPERIENCE,
      experiences: [
        {
          company_name: 'sber',
          position: 'farmer',
          hired_on: '123-321-12',
          quit_on: '32-231-2',
          id: 654,
        },
      ],
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        form: {
          experience: {
            values: {
              experience: [
                {
                  companyName: 'sber',
                  profile: 'farmer',
                  startYear: '123-321-12',
                  endYear: '32-231-2',
                  id: 654,
                },
              ],
            },
          },
        },
      }),
    );
  });

  it('put start languages', () => {
    const initialState = fromJS({
      form: { languages: { values: {} } },
    });
    const action = {
      type: types.PUT_START_LANGUAGES,
      languages: [
        {
          code: 'ru',
          level: 5,
        },
      ],
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        form: {
          languages: {
            values: {
              ru: 5,
            },
          },
        },
      }),
    );
  });

  it('put start step', () => {
    const initialState = fromJS({
      progressBar: { step: null },
    });
    const action = {
      type: types.PUT_START_STEP,
      step: 890,
    };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        progressBar: { step: 890 },
      }),
    );
  });
});
