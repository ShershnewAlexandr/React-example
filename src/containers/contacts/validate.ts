import { Map } from 'immutable';

interface Error {
  firstName?: string;
  lastName?: string;
  dateOfBirthday?: string;
}

let validate;
validate = (values: Map<string, any>) => {
  const errors: Error = {};
  if (!values.get('firstName')) {
    errors.firstName = 'errors.required';
  } else if (typeof values.get('firstName') !== 'string') {
    errors.firstName = 'errors.notString';
  }

  if (!values.get('lastName')) {
    errors.lastName = 'errors.required';
  } else if (typeof values.get('lastName') !== 'string') {
    errors.lastName = 'errors.notString';
  }

  if (!values.get('dateOfBirthday')) {
    errors.dateOfBirthday = 'errors.required';
  } else {
    const yearBirthday = new Date(values.get('dateOfBirthday')).getFullYear();
    const nowYear = new Date().getFullYear();
    if (nowYear - yearBirthday < 3) {
      errors.dateOfBirthday = 'errors.tooLate';
    }
  }

  return errors;
};

export default validate;
