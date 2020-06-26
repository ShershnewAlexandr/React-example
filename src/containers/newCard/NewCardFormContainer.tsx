import React from 'react';
import { reduxForm } from 'redux-form/immutable';
import CardForm from '../../components/cards/cardForm/CardForm';
import validate from '../editCard/validate';

function NewCardFormContainer(props) {
  return <CardForm {...props} />;
}

export default reduxForm({
  form: 'addPost',
  onSubmit: () => {},
  validate,
})(NewCardFormContainer);
