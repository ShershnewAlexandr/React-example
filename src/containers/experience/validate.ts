import { Map } from 'immutable';
import store, { AppState } from '../../store';

interface Error {
  companyName?: string;
  profile?: string;
  startYear?: string;
  endYear?: string;
}

const validate = (values: Map<string, any>) => {
  const state: AppState = store.getState();
  const errors: { experience?: Error[] } = {};
  if (values.get('experience')) {
    const experienceArrayErrors: Error[] = [];
    values
      .get('experience')
      .forEach((experience: Map<string, any>, experienceIndex: number) => {
        const experienceErrors: Error = {};

        if (!experience || !experience.get('companyName')) {
          experienceErrors.companyName = 'errors.required';
        } else if (typeof experience.get('companyName') !== 'string') {
          experienceErrors.companyName = 'errors.notString';
        }

        if (!experience || !experience.get('profile')) {
          experienceErrors.profile = 'errors.required';
        } else if (typeof experience.get('profile') !== 'string') {
          experienceErrors.profile = 'errors.notString';
        }

        if (!experience || !experience.get('startYear')) {
          experienceErrors.startYear = 'errors.required';
        }

        if (!experience || !experience.get('endYear')) {
          experienceErrors.endYear = 'errors.required';
        }

        if (
          experience &&
          experience.get('endYear') &&
          experience.get('startYear')
        ) {
          const start = new Date(experience.get('startYear'));
          const end = new Date(experience.get('endYear'));
          const now = new Date();
          const birthDate = new Date(
            state.getIn(['form', 'contact', 'values', 'dateOfBirthday']),
          );

          if (start < birthDate) {
            experienceErrors.startYear = 'errors.tooEarly';
          }

          if (start > now) {
            experienceErrors.startYear = 'errors.tooLate';
          }

          if (end <= start) {
            experienceErrors.endYear = 'errors.endBeforeStart';
          }

          if (experienceIndex > 1) {
            const prevEnds: Date[] = [];

            for (let i = 0; i < experienceIndex; i++) {
              if (
                values
                  .get('experience')
                  .get(i)
                  .get('endYear')
              ) {
                prevEnds.push(
                  new Date(
                    values
                      .get('experience')
                      .get(i)
                      .get('endYear'),
                  ),
                );
              }
            }

            if (
              prevEnds.reduce((accum, date) => {
                if (start < date) return accum + 1;
                return accum;
              }, 0) > 1
            ) {
              experienceErrors.startYear = 'errors.3rdCompany';
            }
          }
        }

        if (Object.keys(experienceErrors).length !== 0) {
          experienceArrayErrors[experienceIndex] = experienceErrors;
        }
      });

    if (experienceArrayErrors.length) {
      errors.experience = experienceArrayErrors;
    }
  }
  return errors;
};

export default validate;
