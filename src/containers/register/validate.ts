import { Map } from 'immutable';

interface Error {
  email?: string;
  password?: string;
  name?: string;
}

let validate;
validate = (values: Map<string, any>) => {
  const errors: Error = {};
  if (!values.get('email')) {
    errors.email = 'errors.required';
  }

  if (!values.get('password')) {
    errors.password = 'errors.required';
  }

  if (!values.get('name')) {
    errors.name = 'errors.required';
  }
  return errors;
};

export default validate;
