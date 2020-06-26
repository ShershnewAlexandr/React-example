import React from 'react';
import ReactFileReader from 'react-file-reader';
import { Grid } from '@material-ui/core';
import './InputsStyles.css';
import './PhotoInputStyles.css';

interface PhotoInputProps {
  label: string;
  prerenderPhotoURL: string;
  disabled: boolean;
  onClickAction: (files: ReactFileReader, url: string) => void;
}

function PhotoInput(props: PhotoInputProps) {
  function onChangeFile(files: ReactFileReader) {
    const url = URL.createObjectURL(files.fileList[0]);
    props.onClickAction(files, url);
  }

  const { label, prerenderPhotoURL, disabled } = props;

  return (
    <Grid container direction="column">
      <Grid item>
        <label>{label}</label>
      </Grid>
      <Grid item>
        <div
          className="photoButton"
          style={{ backgroundImage: `url(${prerenderPhotoURL})` }}
        >
          {!disabled && (
            <ReactFileReader handleFiles={onChangeFile} base64>
              <div
                className={
                  prerenderPhotoURL
                    ? 'photoButtonPlus photoButtonPlusWithPhoto'
                    : 'photoButtonPlus'
                }
              >
                +
              </div>
            </ReactFileReader>
          )}
        </div>
      </Grid>
    </Grid>
  );
}

export default PhotoInput;
