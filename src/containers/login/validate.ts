import { Map } from 'immutable';

interface Error {
  login?: string;
  password?: string;
}

let validate;
validate = (values: Map<string, any>) => {
  const errors: Error = {};
  if (!values.get('login')) {
    errors.login = 'errors.required';
  } else if (typeof values.get('login') !== 'string') {
    errors.login = 'errors.notString';
  }

  if (!values.get('password')) {
    errors.password = 'errors.required';
  } else if (typeof values.get('password') !== 'string') {
    errors.password = 'errors.notString';
  }

  return errors;
};

export default validate;
