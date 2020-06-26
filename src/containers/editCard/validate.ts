import { Map } from 'immutable';

interface Error {
  title?: string;
  content?: string;
}

let validate;
validate = (values: Map<string, any>) => {
  const errors: Error = {};
  if (!values.get('title')) {
    errors.title = 'errors.required';
  } else if (typeof values.get('title') !== 'string') {
    errors.title = 'errors.notString';
  } else if (values.get('title').length > 18) {
    errors.title = 'errors.18max';
  }

  if (!values.get('content')) {
    errors.content = 'errors.required';
  } else if (typeof values.get('content') !== 'string') {
    errors.content = 'errors.notString';
  } else if (values.get('content').length > 80) {
    errors.content = 'errors.80max';
  }
  return errors;
};

export default validate;
