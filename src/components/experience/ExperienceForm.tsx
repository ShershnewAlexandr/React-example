import React from 'react';
import { FieldArray } from 'redux-form/lib/immutable';
import ExperienceFormElement from './ExperienceFormElement';
import DropAddListForm from '../dropAddList/DropAddListForm';
import { ExperienceFormContainerProps } from '../../containers/experience/ExperienceFormContainer';

function ExperienceForm({
  handleSubmit,
  isLoading,
}: ExperienceFormContainerProps) {
  return (
    <form onSubmit={handleSubmit} data-testid="experienceForm">
      <FieldArray
        name="experience"
        component={DropAddListForm}
        formRender={ExperienceFormElement}
        maxElements={10}
        disabled={isLoading}
      />
    </form>
  );
}

export default ExperienceForm;
