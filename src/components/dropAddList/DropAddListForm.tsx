import React from 'react';
import { WrappedFieldArrayProps } from 'redux-form';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import './DropAddListFormStyles.css';

interface DropAddListFormProps {
  maxElements: number;
  formRender: React.FC<any>;
  disabled: boolean;
}

export function DropAddListForm({
  maxElements,
  formRender,
  fields,
  disabled,
}: DropAddListFormProps & WrappedFieldArrayProps<undefined>) {
  const { t } = useTranslation();
  const addClick = () => {
    if (fields.length < maxElements) fields.push(undefined);
  };

  const elementsForm = fields.map((element: string, index: number) => (
    <React.Fragment key={index}>
      <Grid container direction="row" justify="flex-end">
        <button
          type="button"
          className={disabled ? 'drop-button disabled' : 'drop-button'}
          onClick={() => fields.remove(index)}
          disabled={disabled}
        >
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <i className="material-icons drop-icon">clear</i>
            </Grid>
            <Grid item>{t('dropAddList.drop')}</Grid>
          </Grid>
        </button>
      </Grid>
      {formRender({ element, disabled, t })}
      {index !== fields.length - 1 && <hr className="drop-add-list-hr" />}
    </React.Fragment>
  ));

  return (
    <>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-end"
      >
        {elementsForm}
      </Grid>
      <Grid container justify="flex-start">
        <Grid item>
          <button
            className={disabled ? 'add-button disabled' : 'add-button'}
            type="button"
            onClick={addClick}
            disabled={disabled}
          >
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <i className="material-icons md-24 plus-icon">add</i>
              </Grid>
              <Grid item>{t('dropAddList.add')}</Grid>
            </Grid>
          </button>
        </Grid>
      </Grid>
    </>
  );
}

export default DropAddListForm;
