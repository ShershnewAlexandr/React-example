import React from 'react';
import { FieldArray } from 'redux-form/lib/immutable';
import EducationFormElement from './EducationFormElement';
import DropAddListForm from '../dropAddList/DropAddListForm';
import { EducationFormContainerProps } from '../../containers/education/EducationFormContainer';

function EducationForm({
  handleSubmit,
  isLoading,
}: EducationFormContainerProps) {
  return (
    <form onSubmit={handleSubmit} data-testid="educationForm">
      <FieldArray
        name="education"
        component={DropAddListForm}
        formRender={EducationFormElement}
        maxElements={5}
        disabled={isLoading}
      />
    </form>
  );
}

export default EducationForm;
