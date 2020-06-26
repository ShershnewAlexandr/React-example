import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { cardsSelectors } from '../../ducks/cards';
import CardForm from '../../components/cards/cardForm/CardForm';
import validate from './validate';

function EditCardFormContainer(props) {
  return <CardForm {...props} />;
}

export default connect(cardsSelectors.initialEditFormSelector)(
  reduxForm({
    form: 'editPost',
    onSubmit: () => {},
    validate,
  })(EditCardFormContainer),
);
