import { Map } from 'immutable';
import store, { AppState } from '../../store';

interface Error {
  schoolName?: string;
  startYear?: string;
  endYear?: string;
}

const validate = (values: Map<string, any>) => {
  const state: AppState = store.getState();
  const errors: { education?: Error[] } = {};
  if (values.get('education')) {
    const educationArrayErrors: Error[] = [];
    values
      .get('education')
      .forEach((education: Map<string, any>, educationIndex: number) => {
        const educationErrors: Error = {};

        if (!education || !education.get('schoolName')) {
          educationErrors.schoolName = 'errors.required';
        } else if (typeof education.get('schoolName') !== 'string') {
          educationErrors.schoolName = 'errors.notString';
        }

        if (!education || !education.get('startYear')) {
          educationErrors.startYear = 'errors.required';
        }

        if (!education || !education.get('endYear')) {
          educationErrors.endYear = 'errors.required';
        }

        if (
          education &&
          education.get('endYear') &&
          education.get('startYear')
        ) {
          const start = new Date(education.get('startYear'));
          const end = new Date(education.get('endYear'));
          const now = new Date();
          const birthDate = new Date(
            state.getIn(['form', 'contact', 'values', 'dateOfBirthday']),
          );

          if (start < birthDate) {
            educationErrors.startYear = 'errors.tooEarly';
          }

          if (start > now) {
            educationErrors.startYear = 'errors.tooLate';
          }

          if (end <= start) {
            educationErrors.endYear = 'errors.endBeforeStart';
          }

          if (educationIndex > 0) {
            if (
              values
                .get('education')
                .get(educationIndex - 1)
                .get('endYear')
            ) {
              const prevEnd = new Date(
                values
                  .get('education')
                  .get(educationIndex - 1)
                  .get('endYear'),
              );
              if (start < prevEnd) {
                educationErrors.startYear = 'errors.intersection';
              }
            }
          }
        }

        if (Object.keys(educationErrors).length !== 0) {
          educationArrayErrors[educationIndex] = educationErrors;
        }
      });

    if (educationArrayErrors.length) {
      errors.education = educationArrayErrors;
    }
  }
  return errors;
};

export default validate;
